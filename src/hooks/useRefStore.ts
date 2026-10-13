import { useEffect, useState } from 'react';

/** Read a collection from localStorage (no React state needed for read-only lookups). */
function readCollection<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

/**
 * Resolves referenced items from other collections for select dropdowns
 * and table cell display. Returns a map of collectionKey -> items[].
 */
export function useRefStore(refs: string[]) {
  const [maps, setMaps] = useState<Record<string, Record<string, unknown>[]>>({});

  useEffect(() => {
    const next: Record<string, Record<string, unknown>[]> = {};
    refs.forEach((k) => { next[k] = readCollection<Record<string, unknown>>(k); });
    setMaps(next);
  }, [refs.join('|')]);

  return maps;
}

/** Resolve a single ref value to a display label. */
export function resolveRef(
  maps: Record<string, Record<string, unknown>[]>,
  refKey: string,
  id: unknown,
  labelFn?: (item: Record<string, unknown>) => string,
): string {
  if (!id || id === '') return '—';
  const list = maps[refKey] ?? [];
  const item = list.find((i) => i.id === id || i.id === Number(id));
  if (!item) return `#${id}`;
  return labelFn ? labelFn(item) : String(item.id);
}
