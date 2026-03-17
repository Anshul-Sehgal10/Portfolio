const fs = require('fs');
const path = require('path');
const { getUtcDayKey } = require('../utils/request');

class LockStore {
  constructor(options) {
    this.filePath = options.filePath;
    this.windowMs = options.windowMs;
    this.maxRequestsPerWindow = options.maxRequestsPerWindow;
    this.retainDailyCountDays = options.retainDailyCountDays;

    this.rateLimitStore = new Map();
    this.emailCooldownStore = new Map();
    this.senderSoftlockStore = new Map();
    this.dailySendCountStore = new Map();
  }

  ensureLocksFile() {
    const dirPath = path.dirname(this.filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify({ emailCooldowns: {}, senderSoftlocks: {}, dailySendCounts: {} }, null, 2),
        'utf8'
      );
    }
  }

  pruneDailySendCounts() {
    const cutoff = Date.now() - this.retainDailyCountDays * 24 * 60 * 60 * 1000;
    for (const [dayKey] of this.dailySendCountStore.entries()) {
      const dayStart = Date.parse(`${dayKey}T00:00:00.000Z`);
      if (Number.isNaN(dayStart) || dayStart < cutoff) {
        this.dailySendCountStore.delete(dayKey);
      }
    }
  }

  load() {
    try {
      this.ensureLocksFile();
      const raw = fs.readFileSync(this.filePath, 'utf8');
      const parsed = JSON.parse(raw);
      const now = Date.now();

      for (const [email, until] of Object.entries(parsed?.emailCooldowns || {})) {
        if (typeof until === 'number' && until > now) {
          this.emailCooldownStore.set(email, until);
        }
      }

      for (const [senderKey, until] of Object.entries(parsed?.senderSoftlocks || {})) {
        if (typeof until === 'number' && until > now) {
          this.senderSoftlockStore.set(senderKey, until);
        }
      }

      for (const [dayKey, count] of Object.entries(parsed?.dailySendCounts || {})) {
        if (typeof count === 'number' && count > 0) {
          this.dailySendCountStore.set(dayKey, count);
        }
      }

      this.pruneDailySendCounts();
      this.persist();
    } catch (error) {
      console.warn('Failed to load lock state, starting fresh:', error.message);
    }
  }

  persist() {
    try {
      const now = Date.now();
      this.pruneDailySendCounts();

      const emailCooldowns = {};
      const senderSoftlocks = {};
      const dailySendCounts = {};

      for (const [email, until] of this.emailCooldownStore.entries()) {
        if (until > now) {
          emailCooldowns[email] = until;
        }
      }

      for (const [senderKey, until] of this.senderSoftlockStore.entries()) {
        if (until > now) {
          senderSoftlocks[senderKey] = until;
        }
      }

      for (const [dayKey, count] of this.dailySendCountStore.entries()) {
        if (typeof count === 'number' && count > 0) {
          dailySendCounts[dayKey] = count;
        }
      }

      const payload = JSON.stringify({ emailCooldowns, senderSoftlocks, dailySendCounts }, null, 2);
      const tempPath = `${this.filePath}.tmp`;
      fs.writeFileSync(tempPath, payload, 'utf8');
      fs.renameSync(tempPath, this.filePath);
    } catch (error) {
      console.warn('Failed to persist lock state:', error.message);
    }
  }

  isRateLimited(key) {
    const now = Date.now();
    const existing = this.rateLimitStore.get(key);

    if (!existing || existing.expiresAt < now) {
      this.rateLimitStore.set(key, { count: 1, expiresAt: now + this.windowMs });
      return false;
    }

    if (existing.count >= this.maxRequestsPerWindow) {
      return true;
    }

    existing.count += 1;
    this.rateLimitStore.set(key, existing);
    return false;
  }

  getEmailCooldownRemainingMs(email) {
    const cooldownUntil = this.emailCooldownStore.get(email);
    if (!cooldownUntil) {
      return 0;
    }

    const remaining = cooldownUntil - Date.now();
    if (remaining <= 0) {
      this.emailCooldownStore.delete(email);
      this.persist();
      return 0;
    }

    return remaining;
  }

  getSenderSoftlockRemainingMs(senderKey) {
    const softlockUntil = this.senderSoftlockStore.get(senderKey);
    if (!softlockUntil) {
      return 0;
    }

    const remaining = softlockUntil - Date.now();
    if (remaining <= 0) {
      this.senderSoftlockStore.delete(senderKey);
      this.persist();
      return 0;
    }

    return remaining;
  }

  getTodayCount() {
    const todayKey = getUtcDayKey();
    const rawCount = this.dailySendCountStore.get(todayKey);
    const count = Number.isFinite(rawCount) && rawCount > 0 ? rawCount : 0;

    if (rawCount !== undefined && !Number.isFinite(rawCount)) {
      this.dailySendCountStore.delete(todayKey);
      this.persist();
    }

    return { dayKey: todayKey, count };
  }

  markSuccessfulSend({ email, senderKey, emailCooldownMs, senderSoftlockMs }) {
    const { dayKey, count } = this.getTodayCount();
    this.emailCooldownStore.set(email, Date.now() + emailCooldownMs);
    this.senderSoftlockStore.set(senderKey, Date.now() + senderSoftlockMs);
    this.dailySendCountStore.set(dayKey, count + 1);
    this.persist();
  }
}

module.exports = { LockStore };
