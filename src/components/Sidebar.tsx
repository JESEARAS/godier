import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Menu, X, Moon, Sun, Activity, ChevronDown, Bell, Search,
  CalendarDays, FileBarChart, Settings, ListChecks,
} from 'lucide-react';
import { RESOURCES, RESOURCE_GROUPS } from '@/services/resources';
import { GlobalSearch } from '@/components/GlobalSearch';

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const loc = useLocation();

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden no-print" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 no-print
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Brand */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-800">
          <NavLink to="/" className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-health-500 text-white">
              <Activity size={20} />
            </span>
            <div>
              <p className="font-display font-extrabold text-white leading-none">GODIE</p>
              <p className="text-[10px] text-slate-400">Clinique • Antsiranana</p>
            </div>
          </NavLink>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white"><X size={20} /></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          <div>
            <NavLink to="/" end className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition
              ${isActive ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
              <LayoutDashboard size={18} /> Tableau de bord
            </NavLink>
          </div>

          {/* Quick links */}
          <div className="space-y-0.5">
            <NavLink to="/rendez-vous" className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
              ${isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}>
              <CalendarDays size={16} /> Rendez-vous
            </NavLink>
            <NavLink to="/rapports" className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
              ${isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}>
              <FileBarChart size={16} /> Rapports
            </NavLink>
            <NavLink to="/parametres" className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
              ${isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}>
              <Settings size={16} /> Paramètres
            </NavLink>
            <NavLink to="/listes" className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
              ${isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}>
              <ListChecks size={16} /> Listes globales
            </NavLink>
          </div>

          {RESOURCE_GROUPS.map((group) => (
            <NavGroup key={group} group={group} current={loc.pathname} />
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-800 text-xs text-slate-500">
          <p className="font-semibold text-slate-400">JESE Andriamaniraka Davida</p>
          <p>Directeur — Clinique GODIE</p>
        </div>
      </aside>
    </>
  );
}

function NavGroup({ group, current }: { group: string; current: string }) {
  const resources = RESOURCES.filter((r) => r.group === group);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (resources.some((r) => current === `/m/${r.key}`)) setOpen(true);
  }, [current]);
  return (
    <div>
      <button onClick={() => setOpen((o) => !o)} className="flex items-center justify-between w-full px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-300">
        {group} <ChevronDown size={14} className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-1 space-y-0.5">
          {resources.map((r) => (
            <NavLink key={r.key} to={`/m/${r.key}`} className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
              ${isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}>
              <r.icon size={16} /> {r.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const [dark, setDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('godie-theme');
    if (saved === 'dark') { setDark(true); document.documentElement.classList.add('dark'); }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const toggleDark = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('godie-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <>
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 no-print">
        <div className="flex items-center gap-3">
          <button onClick={onMenu} className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"><Menu size={20} /></button>
          <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition w-64">
            <Search size={16} />
            <span>Rechercher dans tout le système...</span>
            <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-400">Ctrl+K</kbd>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Bell size={18} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error-500" />
          </button>
          <button onClick={toggleDark} className="p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="flex items-center gap-2 pl-2 ml-1 border-l border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-health-500 text-white text-sm font-bold">JD</div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-none">JESE A. Davida</p>
              <p className="text-xs text-slate-500">Directeur</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
