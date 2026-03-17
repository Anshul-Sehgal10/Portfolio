const path = require('path');

const HOURS = 60 * 60 * 1000;

const parseNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const config = {
  port: parseNumber(process.env.PORT, 4000),
  frontendOrigins: (process.env.FRONTEND_ORIGIN || 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  proxyToken: process.env.PROXY_SHARED_SECRET || '',
  resendApiKey: process.env.RESEND_API_KEY || '',
  contactToEmail: process.env.CONTACT_TO_EMAIL || '',
  contactFromEmail: process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
  lockFilePath: path.join(__dirname, '..', '..', 'data', 'locks.json'),
  limits: {
    windowMs: parseNumber(process.env.RATE_LIMIT_WINDOW_MS, 1 * HOURS),
    maxRequestsPerWindow: parseNumber(process.env.MAX_REQUESTS_PER_WINDOW, 5),
    emailCooldownMs: parseNumber(process.env.EMAIL_COOLDOWN_MS, 24 * HOURS),
    senderSoftlockMs: parseNumber(process.env.SENDER_SOFTLOCK_MS, 12 * HOURS),
    dailyEmailLimit: parseNumber(process.env.DAILY_EMAIL_LIMIT, 25),
    retainDailyCountDays: parseNumber(process.env.RETAIN_DAILY_COUNT_DAYS, 7),
    minSubmitMs: parseNumber(process.env.MIN_SUBMIT_MS, 4000),
    maxFormAgeMs: parseNumber(process.env.MAX_FORM_AGE_MS, 2 * HOURS),
  },
};

module.exports = { config };
