import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar, Topbar } from '@/components/Sidebar';
import { ToastProvider } from '@/components/Toast';
import { CrudPage } from '@/components/CrudPage';
import { RESOURCES } from '@/services/resources';
import Dashboard from '@/pages/Dashboard';
import Appointments from '@/pages/Appointments';
import Reports from '@/pages/Reports';
import Settings from '@/pages/Settings';
import Listes from '@/pages/Listes';
import NotFound from '@/pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname]);
  return null;
}

function Shell() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-64">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="min-h-[calc(100vh-4rem)]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rendez-vous" element={<Appointments />} />
            <Route path="/rapports" element={<Reports />} />
            <Route path="/parametres" element={<Settings />} />
            <Route path="/listes" element={<Listes />} />
            {RESOURCES.map((r) => (
              <Route key={r.key} path={`/m/${r.key}`} element={<CrudPage resource={r} />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Shell />
      </BrowserRouter>
    </ToastProvider>
  );
}
