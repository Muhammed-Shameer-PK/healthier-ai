import { saveItem, getItem } from '../utils/storage';

const KEYS = {
  PROFILE:   'aura_profile',
  DAILY_LOG: 'aura_daily_logs',
};

// ── Profile ─────────────────────────────────
export async function saveUserProfile(data) {
  await saveItem(KEYS.PROFILE, { ...data, updatedAt: Date.now() });
}

export async function getUserProfile() {
  return await getItem(KEYS.PROFILE);
}

// ── Daily Health Logs ────────────────────────
export async function saveDailyLog(entry) {
  const logs = (await getItem(KEYS.DAILY_LOG)) || [];
  logs.push({ ...entry, date: new Date().toISOString() });
  // Keep last 90 days
  const trimmed = logs.slice(-90);
  await saveItem(KEYS.DAILY_LOG, trimmed);
  return trimmed;
}

export async function getDailyLogs() {
  return (await getItem(KEYS.DAILY_LOG)) || [];
}

export async function clearAllData() {
  await saveItem(KEYS.PROFILE,   null);
  await saveItem(KEYS.DAILY_LOG, []);
}
