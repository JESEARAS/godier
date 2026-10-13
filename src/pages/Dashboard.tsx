import { useMemo } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, BarElement, Tooltip, Legend, Filler,
} from 'chart.js';
import {
  Users, Stethoscope, CalendarDays, ClipboardList, BedDouble, Pill,
  Receipt, Activity, TrendingUp, Clock, AlertTriangle, Inbox,
} from 'lucide-react';
import { useCollection } from '@/hooks/useCollection';
import { PageHeader } from '@/components/ui';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Tooltip, Legend, Filler);

export default function Dashboard() {
  const { items: patients } = useCollection<Record<string, unknown>>('godie_patients');
  const { items: doctors } = useCollection<Record<string, unknown>>('godie_doctors');
  const { items: appts } = useCollection<Record<string, unknown>>('godie_appointments');
  const { items: consults } = useCollection<Record<string, unknown>>('godie_consultations');
  const { items: hosps } = useCollection<Record<string, unknown>>('godie_hospitalizations');
  const { items: meds } = useCollection<Record<string, unknown>>('godie_medications');
  const { items: invoices } = useCollection<Record<string, unknown>>('godie_invoices');

  const today = new Date().toISOString().slice(0, 10);
  const todayAppts = appts.filter((a) => String(a.date) === today).length;

  const stats = [
    { icon: Users, label: 'Patients', value: patients.length, color: 'primary' },
    { icon: Stethoscope, label: 'Médecins', value: doctors.length, color: 'health' },
    { icon: CalendarDays, label: 'RDV du jour', value: todayAppts, color: 'accent' },
    { icon: ClipboardList, label: 'Consultations', value: consults.length, color: 'warning' },
    { icon: BedDouble, label: 'Hospitalisations', value: hosps.length, color: 'primary' },
    { icon: Pill, label: 'Médicaments', value: meds.length, color: 'health' },
    { icon: Receipt, label: 'Factures', value: invoices.length, color: 'accent' },
    { icon: Activity, label: 'RDV totaux', value: appts.length, color: 'warning' },
  ] as const;

  const monthly = useMemo(() => {
    const arr = Array(12).fill(0);
    consults.forEach((c) => { const m = new Date(String(c.date)).getMonth(); if (!Number.isNaN(m)) arr[m] += 1; });
    return arr;
  }, [consults]);

  const lineData = {
    labels: ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc'],
    datasets: [{
      label: 'Consultations', data: monthly,
      borderColor: '#1a61d7',
      backgroundColor: (ctx: { chart: ChartJS }) => {
        const { ctx: c, chartArea } = ctx.chart;
        if (!chartArea) return 'rgba(26,97,215,0.1)';
        const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        g.addColorStop(0, 'rgba(26,97,215,0.35)'); g.addColorStop(1, 'rgba(26,97,215,0.02)');
        return g;
      },
      fill: true, tension: 0.4, borderWidth: 3, pointRadius: 4, pointBackgroundColor: '#1a61d7',
    }],
  };

  const specialtyDist = useMemo(() => {
    const counts: Record<string, number> = {};
    doctors.forEach((d) => { const s = String(d.specialty); counts[s] = (counts[s] ?? 0) + 1; });
    return counts;
  }, [doctors]);

  const doughnutData = {
    labels: Object.keys(specialtyDist),
    datasets: [{
      data: Object.values(specialtyDist),
      backgroundColor: ['#1a61d7','#10b981','#f97316','#ef4444','#8b5cf6','#0ea5e9'],
      borderWidth: 0,
    }],
  };

  const genderDist = useMemo(() => {
    let m = 0, f = 0;
    patients.forEach((p) => { String(p.gender) === 'M' ? m++ : f++; });
    return { m, f };
  }, [patients]);

  const barData = {
    labels: ['Hommes', 'Femmes'],
    datasets: [{ label: 'Patients', data: [genderDist.m, genderDist.f], backgroundColor: ['#1a61d7','#10b981'], borderRadius: 8, barThickness: 48 }],
  };

  const baseOpts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };
  const isEmpty = patients.length === 0 && doctors.length === 0 && consults.length === 0;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <PageHeader title="Tableau de bord" subtitle="Vue d'ensemble de l'activité de la Clinique GODIE — Antsiranana." />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="card p-5 flex items-center gap-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-2xl
              ${s.color === 'primary' ? 'bg-primary-50 text-primary-600 dark:bg-primary-600/15 dark:text-primary-400' : ''}
              ${s.color === 'health' ? 'bg-health-50 text-health-600 dark:bg-health-600/15 dark:text-health-400' : ''}
              ${s.color === 'accent' ? 'bg-accent-50 text-accent-600 dark:bg-accent-600/15 dark:text-accent-400' : ''}
              ${s.color === 'warning' ? 'bg-warning-50 text-warning-600 dark:bg-warning-600/15 dark:text-warning-400' : ''}`}>
              <s.icon size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {isEmpty ? (
        <div className="card p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mb-4">
            <Inbox size={30} />
          </div>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Aucune donnée enregistrée</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            L'application vient d'être installée. Ajoutez des patients, médecins et consultations
            pour voir les statistiques et graphiques se mettre à jour en temps réel.
          </p>
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 card p-6">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-1"><TrendingUp size={18} className="text-primary-600" /> Évolution des consultations</h3>
              <p className="text-xs text-slate-500 mb-5">Consultations mensuelles sur l'année</p>
              <div className="h-72"><Line data={lineData} options={{ ...baseOpts, scales: { y: { beginAtZero: true, grid: { color: 'rgba(148,163,184,0.15)' } }, x: { grid: { display: false } } } }} /></div>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-slate-800 dark:text-white mb-1">Répartition par spécialité</h3>
              <p className="text-xs text-slate-500 mb-5">Distribution des médecins</p>
              <div className="h-72"><Doughnut data={doughnutData} options={{ ...baseOpts, cutout: '62%', plugins: { legend: { display: true, position: 'bottom' as const, labels: { padding: 12, usePointStyle: true, font: { size: 11 } } } } }} /></div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="card p-6">
              <h3 className="font-bold text-slate-800 dark:text-white mb-1">Patients par sexe</h3>
              <p className="text-xs text-slate-500 mb-5">Répartition</p>
              <div className="h-56"><Bar data={barData} options={{ ...baseOpts, scales: { y: { beginAtZero: true, grid: { color: 'rgba(148,163,184,0.15)' } }, x: { grid: { display: false } } } }} /></div>
            </div>
            <div className="lg:col-span-2 card p-6">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4"><Clock size={18} className="text-primary-600" /> Rendez-vous récents</h3>
              {appts.length === 0 ? <p className="text-slate-500 text-sm">Aucun rendez-vous enregistré.</p> : (
                <div className="space-y-2.5">
                  {appts.slice(0, 5).map((a) => {
                    const ap = a as { id: number; date: string; time: string; patientId: number; doctorId: number };
                    const p = patients.find((x) => Number(x.id) === ap.patientId);
                    const d = doctors.find((x) => Number(x.id) === ap.doctorId);
                    return (
                      <div key={ap.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-600/15"><CalendarDays size={18} /></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{p ? `${p.firstName} ${p.lastName}` : '—'}</p>
                          <p className="text-xs text-slate-500">{d ? `Dr. ${d.firstName} ${d.lastName}` : '—'} • {ap.time}</p>
                        </div>
                        <span className="text-xs text-slate-500 whitespace-nowrap">{ap.date}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Alerts */}
      <div className="mt-6 card p-5 border-l-4 border-warning-500 bg-warning-50/40 dark:bg-warning-600/10 flex items-center gap-3">
        <AlertTriangle className="text-warning-600" size={20} />
        <p className="text-sm text-slate-700 dark:text-slate-200">
          {meds.filter((m) => Number(m.quantity) <= 20).length} médicament(s) en stock faible.
          {meds.length === 0 && ' Aucun médicament enregistré pour le moment.'}
        </p>
      </div>
    </div>
  );
}
