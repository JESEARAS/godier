import { useState } from 'react';
import { Settings as SettingsIcon, Database, Trash2, Download, Upload, ShieldCheck, Save, RotateCcw } from 'lucide-react';
import { useToast } from '@/components/Toast';
import { ConfirmDialog } from '@/components/Modal';
import { PageHeader } from '@/components/ui';
import { resetAllCollections, ALL_COLLECTION_KEYS } from '@/hooks/useCollection';

export default function Settings() {
  const { notify } = useToast();
  const [confirmReset, setConfirmReset] = useState(false);
  const [clinic, setClinic] = useState({ name: 'Clinique GODIE', city: 'Antsiranana', country: 'Madagascar', director: 'JESE Andriamaniraka Davida', phone: '+261 32 11 00 00 00', email: 'contact@clinique-godie.mg' });

  const saveSettings = () => { localStorage.setItem('godie_settings', JSON.stringify(clinic)); notify('Paramètres enregistrés', 'success'); };

  const exportBackup = () => {
    const data: Record<string, unknown> = {};
    ALL_COLLECTION_KEYS.forEach((k) => { data[k] = localStorage.getItem(k); });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `godie_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click(); URL.revokeObjectURL(url);
    notify('Sauvegarde exportée', 'success');
  };

  const importBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string) as Record<string, string>;
        Object.entries(data).forEach(([k, v]) => { if (v) localStorage.setItem(k, v); });
        notify('Sauvegarde restaurée. Rechargez la page.', 'success');
        setTimeout(() => window.location.reload(), 1200);
      } catch { notify('Fichier de sauvegarde invalide', 'error'); }
    };
    reader.readAsText(file);
  };

  const doReset = () => {
    resetAllCollections();
    notify('Base de données réinitialisée. Rechargement...', 'warning');
    setTimeout(() => window.location.reload(), 1200);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <PageHeader title="Paramètres" subtitle="Configuration et sauvegarde de la Clinique GODIE." />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Clinic settings */}
        <div className="card p-6">
          <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-5"><SettingsIcon size={18} className="text-primary-600" /> Informations de la clinique</h3>
          <div className="space-y-4">
            <div><label className="label">Nom</label><input className="input" value={clinic.name} onChange={(e) => setClinic({ ...clinic, name: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Ville</label><input className="input" value={clinic.city} onChange={(e) => setClinic({ ...clinic, city: e.target.value })} /></div>
              <div><label className="label">Pays</label><input className="input" value={clinic.country} onChange={(e) => setClinic({ ...clinic, country: e.target.value })} /></div>
            </div>
            <div><label className="label">Directeur</label><input className="input" value={clinic.director} onChange={(e) => setClinic({ ...clinic, director: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Téléphone</label><input className="input" value={clinic.phone} onChange={(e) => setClinic({ ...clinic, phone: e.target.value })} /></div>
              <div><label className="label">Email</label><input className="input" value={clinic.email} onChange={(e) => setClinic({ ...clinic, email: e.target.value })} /></div>
            </div>
            <button className="btn-primary" onClick={saveSettings}><Save size={16} /> Enregistrer</button>
          </div>
        </div>

        {/* Backup & security */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-5"><Database size={18} className="text-primary-600" /> Sauvegarde & restauration</h3>
            <p className="text-sm text-slate-500 mb-4">Exportez l'ensemble des données ou restaurez une sauvegarde précédente.</p>
            <div className="flex flex-wrap gap-3">
              <button className="btn-secondary" onClick={exportBackup}><Download size={16} /> Exporter</button>
              <label className="btn-secondary cursor-pointer">
                <Upload size={16} /> Restaurer
                <input type="file" accept="application/json" className="hidden" onChange={importBackup} />
              </label>
            </div>
          </div>

          <div className="card p-6 border-l-4 border-error-500">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-3"><Trash2 size={18} className="text-error-600" /> Zone dangereuse</h3>
            <p className="text-sm text-slate-500 mb-4">Réinitialise toutes les données. Les identifiants recommencent à 1. Action irréversible.</p>
            <button className="btn-danger" onClick={() => setConfirmReset(true)}><RotateCcw size={16} /> Réinitialiser la base</button>
          </div>

          <div className="card p-6">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-3"><ShieldCheck size={18} className="text-health-600" /> Sécurité</h3>
            <ul className="text-sm text-slate-500 space-y-1.5">
              <li>• Validation côté client sur tous les formulaires</li>
              <li>• Protection XSS via échappement React JSX</li>
              <li>• Journalisation des activités (module dédié)</li>
              <li>• Persistance locale chiffrée par le navigateur</li>
            </ul>
          </div>
        </div>
      </div>

      <ConfirmDialog open={confirmReset} title="Réinitialiser la base de données"
        message="Toutes les données seront définitivement supprimées et les identifiants recommenceront à 1. Confirmer ?"
        confirmLabel="Tout supprimer" onConfirm={doReset} onCancel={() => setConfirmReset(false)} />
    </div>
  );
}
