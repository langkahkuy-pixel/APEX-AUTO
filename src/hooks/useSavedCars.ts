'use client';

import { useMemo, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'apex_saved_cars';
const CHANGE_EVENT = 'apex:saved-cars';
let memorySnapshot = '[]';

function getSnapshot() {
  try { return window.localStorage.getItem(STORAGE_KEY) || memorySnapshot; }
  catch { return memorySnapshot; }
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function parseSavedCars(snapshot: string): string[] {
  try {
    const parsed: unknown = JSON.parse(snapshot);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch { return []; }
}

export function useSavedCars() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => '[]');
  const savedIds = useMemo(() => parseSavedCars(snapshot), [snapshot]);

  function toggleSaved(id: string) {
    const current = parseSavedCars(getSnapshot());
    memorySnapshot = JSON.stringify(current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
    try { window.localStorage.setItem(STORAGE_KEY, memorySnapshot); } catch { /* Keep saves for this session. */ }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return { savedIds, toggleSaved };
}
