const { validateContactPayload } = require('../validators/contactValidator');
const { getClientKey } = require('../utils/request');

const createContactController = ({ config, lockStore, emailService }) => {
  return async (req, res) => {
    if (!config.proxyToken || req.headers['x-proxy-token'] !== config.proxyToken) {
      return res.status(403).json({ error: 'Forbidden.' });
    }

    const senderKey = getClientKey(req);

    const senderSoftlockRemainingMs = lockStore.getSenderSoftlockRemainingMs(senderKey);
    if (senderSoftlockRemainingMs > 0) {
      const retryAfterHours = Math.ceil(senderSoftlockRemainingMs / (60 * 60 * 1000));
      return res.status(429).json({
        error: `This device is temporarily locked after a recent message. Please try again in ${retryAfterHours} hour(s).`,
      });
    }

    if (lockStore.isRateLimited(senderKey)) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
      });
    }

    const payload = req.body || {};

    if (typeof payload.startedAt !== 'number') {
      return res.status(400).json({ error: 'Invalid form submission.' });
    }

    const elapsed = Date.now() - payload.startedAt;
    if (elapsed < config.limits.minSubmitMs || elapsed > config.limits.maxFormAgeMs) {
      return res.status(400).json({ error: 'Invalid form timing.' });
    }

    const validation = validateContactPayload(payload);
    if (!validation.valid || !validation.cleaned) {
      return res.status(400).json({
        error: 'Please correct the highlighted fields.',
        fieldErrors: validation.errors,
      });
    }

    if (!emailService.isConfigured()) {
      return res.status(500).json({ error: 'Email service is not configured.' });
    }

    const { count: todayCount } = lockStore.getTodayCount();
    if (todayCount >= config.limits.dailyEmailLimit) {
      return res.status(429).json({
        error: 'We are experiencing high traffic right now. Please try again later.',
      });
    }

    const { name, email, message } = validation.cleaned;

    const emailCooldownRemainingMs = lockStore.getEmailCooldownRemainingMs(email);
    if (emailCooldownRemainingMs > 0) {
      const retryAfterHours = Math.ceil(emailCooldownRemainingMs / (60 * 60 * 1000));
      return res.status(429).json({
        error: `This email has already sent a message. Please try again in ${retryAfterHours} hour(s).`,
      });
    }

    try {
      await emailService.sendContactEmail({ name, email, message });
      lockStore.markSuccessfulSend({
        email,
        senderKey,
        emailCooldownMs: config.limits.emailCooldownMs,
        senderSoftlockMs: config.limits.senderSoftlockMs,
      });

      return res.json({ ok: true });
    } catch {
      return res
        .status(502)
        .json({ error: 'Unable to send message right now. Please try again later.' });
    }
  };
};

module.exports = { createContactController };
