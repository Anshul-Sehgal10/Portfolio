const normalizeWhitespace = (value) => value.replace(/\s+/g, ' ').trim();

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');

module.exports = {
  normalizeWhitespace,
  escapeHtml,
};
