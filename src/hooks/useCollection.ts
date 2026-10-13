import { useCallback, useEffect, useState } from 'react';

/**
 * Generic localStorage-backed store with auto-increment integer IDs.
 * Every collection starts empty — the first inserted record gets id = 1.
 * The next ID counter is persisted separately so IDs never collide.
 */
export function useCollection<T extends Record<string, unknown> = Record<string, unknown>>(key: string) {
  const [items, setItems] = useState<T[]>(() => read<T[]>(key, []));
  const [nextId, setNextId] = useState<number>(() => read<number>(`${key}__seq`, 1));

  useEffect(() => { write(key, items); }, [key, items]);
  useEffect(() => { write(`${key}__seq`, nextId); }, [key, nextId]);

  const add = useCallback((data: Omit<T, 'id' | 'createdAt'>) => {
    const id = nextId;
    setNextId((n) => n + 1);
    const item = { ...data, id, createdAt: new Date().toISOString() } as unknown as T;
    setItems((prev) => [item, ...prev]);
    return item;
  }, [nextId]);

  const update = useCallback((id: number, patch: Partial<T>) => {
    setItems((prev) => prev.map((it) => (Number(it.id) === id ? { ...it, ...patch } : it)));
  }, []);

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((it) => Number(it.id) !== id));
  }, []);

  const reset = useCallback(() => {
    setItems([]);
    setNextId(1);
  }, []);

  return { items, add, update, remove, reset, nextId };
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota exceeded — ignore */
  }
}

/** Reset every known collection to empty (used by the Backup module). */
export const ALL_COLLECTION_KEYS = [
  'godie_patients', 'godie_doctors', 'godie_staff', 'godie_nurses',
  'godie_appointments', 'godie_consultations', 'godie_prescriptions',
  'godie_hospitalizations', 'godie_rooms', 'godie_beds',
  'godie_laboratories', 'godie_analyses', 'godie_results',
  'godie_medications', 'godie_suppliers', 'godie_stock',
  'godie_invoices', 'godie_payments', 'godie_insurance',
  'godie_services', 'godie_specialties',
  'godie_emergencies', 'godie_ambulances',
  'godie_users', 'godie_roles', 'godie_activity',
  'godie_followups', 'godie_morgue', 'godie_prices',
];

export function resetAllCollections() {
  ALL_COLLECTION_KEYS.forEach((k) => {
    localStorage.removeItem(k);
    localStorage.removeItem(`${k}__seq`);
  });
}
