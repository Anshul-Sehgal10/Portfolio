const express = require('express');
const cors = require('cors');
const { createApiRouter } = require('./routes');

const createApp = ({ config, lockStore, emailService }) => {
  const app = express();

  app.use(express.json({ limit: '10kb' }));
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || config.frontendOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(new Error('Not allowed by CORS'));
      },
      methods: ['POST', 'OPTIONS', 'GET'],
    })
  );

  app.use(createApiRouter({ config, lockStore, emailService }));

  return app;
};

module.exports = { createApp };
