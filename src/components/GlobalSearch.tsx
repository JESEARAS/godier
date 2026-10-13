import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { RESOURCES } from '@/services/resources';

interface SearchResult {
  resourceKey: string;
  resourceLabel: string;
  itemId: number;
  label: string;
  sublabel: string;
}

function readCollection<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const results = useMemo<SearchResult[]>(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    const out: SearchResult[] = [];
    for (const r of RESOURCES) {
      const items = readCollection<Record<string, unknown>>(r.key);
      for (const item of items) {
        const matched = r.searchFields.some((f) =>
          String(item[f] ?? '').toLowerCase().includes(q),
        );
        if (matched) {
          const label = r.searchFields.map((f) => String(item[f] ?? '')).join(' ');
          out.push({
            resourceKey: r.key,
            resourceLabel: r.label,
            itemId: Number(item.id),
            label: label.slice(0, 60),
            sublabel: r.singular,
          });
        }
      }
    }
    return out.slice(0, 30);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] no-print">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-auto mt-20 max-w-2xl px-4">
        <div className="card shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800">
            <Search className="text-slate-400" size={20} />
            <input
              ref={inputRef}
              className="flex-1 bg-transparent text-lg text-slate-800 dark:text-white outline-none placeholder:text-slate-400"
              placeholder="Rechercher dans tous les modules..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
              <X size={18} />
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {query.trim().length < 2 ? (
              <div className="px-5 py-8 text-center text-sm text-slate-400">
                Tapez au moins 2 caractères pour rechercher dans tous les modules.
              </div>
            ) : results.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-slate-400">
                Aucun résultat pour « {query} ».
              </div>
            ) : (
              <div className="py-2">
                {results.map((r) => (
                  <button
                    key={`${r.resourceKey}-${r.itemId}`}
                    onClick={() => { navigate(`/m/${r.resourceKey}`); onClose(); }}
                    className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{r.label}</p>
                      <p className="text-xs text-slate-400">{r.resourceLabel} • {r.sublabel} #{r.itemId}</p>
                    </div>
                    <ArrowRight size={15} className="text-slate-300" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
