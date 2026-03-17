const dotenv = require('dotenv');
const { createApp } = require('./app');
const { LockStore } = require('./services/lockStore');
const { EmailService } = require('./services/emailService');

dotenv.config();

const { config } = require('./config');

const lockStore = new LockStore({
  filePath: config.lockFilePath,
  windowMs: config.limits.windowMs,
  maxRequestsPerWindow: config.limits.maxRequestsPerWindow,
  retainDailyCountDays: config.limits.retainDailyCountDays,
});
lockStore.load();

const emailService = new EmailService({
  resendApiKey: config.resendApiKey,
  contactToEmail: config.contactToEmail,
  contactFromEmail: config.contactFromEmail,
});

const app = createApp({ config, lockStore, emailService });

app.listen(config.port, () => {
  console.log(`Backend server running on http://localhost:${config.port}`);
});
