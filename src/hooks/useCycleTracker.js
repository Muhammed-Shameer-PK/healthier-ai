import { useState, useEffect, useCallback } from 'react';
import { getDailyLogs, saveDailyLog } from '../services/storageService';

const AVG_CYCLE = 28;

export function useCycleTracker() {
  const [logs, setLogs]         = useState([]);
  const [prediction, setPred]   = useState(null);
  const [isLoading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getDailyLogs();
    setLogs(data);
    setPred(predictNext(data));
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, []);

  const addLog = async (entry) => {
    const updated = await saveDailyLog(entry);
    setLogs(updated);
    setPred(predictNext(updated));
  };

  return { logs, prediction, isLoading, addLog, refresh: load };
}

function predictNext(logs) {
  const periods = logs.filter(l => l.isPeriod).map(l => new Date(l.date));
  if (periods.length < 1) return null;
  const last = periods[periods.length - 1];
  const next = new Date(last.getTime() + AVG_CYCLE * 24 * 60 * 60 * 1000);
  return {
    lastPeriod: last.toLocaleDateString(),
    nextPeriod: next.toLocaleDateString(),
    daysUntil:  Math.max(0, Math.round((next - Date.now()) / 86400000)),
  };
}
