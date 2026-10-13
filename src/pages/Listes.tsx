import { useState, useMemo } from 'react';
import { ListChecks, Search, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RESOURCES, RESOURCE_GROUPS } from '@/services/resources';
import { PageHeader } from '@/components/ui';

function readCollection<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export default function Listes() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const stats = useMemo(() => {
    return RESOURCES.map((r) => {
      const items = readCollection<Record<string, unknown>>(r.key);
      return { resource: r, count: items.length };
    });
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return stats;
    const q = query.toLowerCase();
    return stats.filter((s) => s.resource.label.toLowerCase().includes(q) || s.resource.group.toLowerCase().includes(q));
  }, [stats, query]);

  const totalRecords = stats.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <PageHeader title="Listes globales" subtitle="Vue d'ensemble de toutes les listes et enregistrements de la Clinique GODIE." />

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <div className="card p-4 text-center">
          <p className="text-3xl font-extrabold text-primary-600">{RESOURCES.length}</p>
          <p className="text-xs text-slate-500 mt-1">Modules</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-extrabold text-health-600">{totalRecords}</p>
          <p className="text-xs text-slate-500 mt-1">Enregistrements</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-extrabold text-accent-600">{RESOURCE_GROUPS.length}</p>
          <p className="text-xs text-slate-500 mt-1">Catégories</p>
        </div>
      </div>

      <div className="card p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input className="input pl-11" placeholder="Filtrer les listes par nom ou catégorie..."
            value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      {RESOURCE_GROUPS.map((group) => {
        const groupItems = filtered.filter((s) => s.resource.group === group);
        if (groupItems.length === 0) return null;
        return (
          <div key={group} className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">{group}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupItems.map(({ resource, count }) => (
                <button
                  key={resource.key}
                  onClick={() => navigate(`/m/${resource.key}`)}
                  className="card card-hover p-4 flex items-center gap-3 text-left transition"
                >
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <resource.icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 dark:text-white text-sm">{resource.label}</p>
                    <p className="text-xs text-slate-500">{count} enregistrement(s)</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
