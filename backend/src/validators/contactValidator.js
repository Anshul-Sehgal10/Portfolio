const { normalizeWhitespace } = require('../utils/text');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const linkRegex = /(https?:\/\/|www\.)/gi;

const validateContactPayload = (payload) => {
  const errors = {};

  const rawName = typeof payload.name === 'string' ? payload.name : '';
  const rawEmail = typeof payload.email === 'string' ? payload.email : '';
  const rawMessage = typeof payload.message === 'string' ? payload.message : '';
  const honeypot = typeof payload.company === 'string' ? payload.company : '';

  const name = normalizeWhitespace(rawName);
  const email = normalizeWhitespace(rawEmail).toLowerCase();
  const message = rawMessage.trim();

  if (honeypot.length > 0) {
    errors.form = 'Spam detected.';
  }

  if (!name || name.length < 2 || name.length > 80) {
    errors.name = 'Name must be between 2 and 80 characters.';
  }

  if (!email || email.length > 254 || !emailRegex.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!message || message.length < 20 || message.length > 2000) {
    errors.message = 'Message must be between 20 and 2000 characters.';
  }

  const links = message.match(linkRegex);
  if (links && links.length > 2) {
    errors.message = 'Please remove extra links from the message.';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    cleaned: { name, email, message },
  };
};

module.exports = { validateContactPayload };
