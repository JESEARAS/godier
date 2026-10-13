import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Activity } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg animate-fade-in">
        <div className="relative inline-block mb-8">
          <h1 className="text-[8rem] md:text-[10rem] font-extrabold leading-none bg-gradient-to-br from-primary-500 to-primary-800 bg-clip-text text-transparent">404</h1>
          <Activity className="absolute -top-2 -right-6 text-health-500 animate-pulse-soft" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Page introuvable</h2>
        <p className="mt-3 text-slate-500 dark:text-slate-400">La page que vous recherchez n'existe pas ou a été déplacée.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="btn-primary"><Home size={18} /> Tableau de bord</Link>
          <button onClick={() => history.back()} className="btn-secondary"><ArrowLeft size={18} /> Retour</button>
        </div>
      </div>
    </div>
  );
}
