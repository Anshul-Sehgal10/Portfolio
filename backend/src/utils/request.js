const getUtcDayKey = (timestamp = Date.now()) => new Date(timestamp).toISOString().slice(0, 10);

const getClientKey = (req) => {
  const forwardedFor = req.headers['x-forwarded-for']?.split(',')[0]?.trim();
  const realIp = req.headers['x-real-ip']?.trim();
  const userAgent = req.headers['user-agent']?.trim() || 'unknown';
  const ip = forwardedFor || realIp || req.ip || 'unknown-ip';
  return `${ip}:${userAgent}`;
};

module.exports = {
  getUtcDayKey,
  getClientKey,
};
