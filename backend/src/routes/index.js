const express = require('express');
const { createContactController } = require('../controllers/contactController');

const createApiRouter = ({ config, lockStore, emailService }) => {
  const router = express.Router();

  router.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  router.post('/api/contact', createContactController({ config, lockStore, emailService }));

  return router;
};

module.exports = { createApiRouter };
