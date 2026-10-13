import { useMemo, useState } from 'react';
import {
  CalendarPlus, ChevronLeft, ChevronRight, Clock, X, CheckCircle2,
  XCircle, CalendarDays, Inbox, Filter,
} from 'lucide-react';
import { useCollection } from '@/hooks/useCollection';
import { useRefStore } from '@/hooks/useRefStore';
import { useToast } from '@/components/Toast';
import { Modal, ConfirmDialog } from '@/components/Modal';
import { PageHeader, EmptyState } from '@/components/ui';
import { formatDate } from '@/utils/format';

const times = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30'];
const statusStyle = {
  confirmed: 'bg-health-100 text-health-700 dark:bg-health-600/15 dark:text-health-400',
  pending: 'bg-warning-100 text-warning-700 dark:bg-warning-600/15 dark:text-warning-400',
  cancelled: 'bg-error-100 text-error-700 dark:bg-error-600/15 dark:text-error-400',
};
const statusLabel = { confirmed: 'Confirmé', pending: 'En attente', cancelled: 'Annulé' };
const iso = (d: Date) => d.toISOString().slice(0, 10);

interface Appt { id: number; patientId: number; doctorId: number; date: string; time: string; reason: string; status: 'confirmed'|'pending'|'cancelled'; createdAt: string; }

type ApptRow = Appt & Record<string, unknown>;

export default function Appointments() {
  const { items: appts, add, update, remove } = useCollection<ApptRow>('godie_appointments');
  const { notify } = useToast();
  const refMaps = useRefStore(['godie_patients', 'godie_doctors']);
  const patients = refMaps['godie_patients'] ?? [];
  const doctors = refMaps['godie_doctors'] ?? [];

  const [cursor, setCursor] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [doctorFilter, setDoctorFilter] = useState<number | 'all'>('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Appt | null>(null);
  const [del, setDel] = useState<Appt | null>(null);
  const [form, setForm] = useState({ patientId: 0 as number, doctorId: 0 as number, date: iso(new Date()), time: '09:00', reason: '', status: 'pending' as Appt['status'] });

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = cursor.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  const apptsByDate = useMemo(() => {
    const map: Record<string, Appt[]> = {};
    appts.forEach((a) => {
      if (doctorFilter !== 'all' && a.doctorId !== doctorFilter) return;
      (map[a.date] ??= []).push(a);
    });
    return map;
  }, [appts, doctorFilter]);

  const dayAppts = selectedDate ? apptsByDate[selectedDate] ?? [] : [];
  const patientName = (id: number) => { const p = patients.find((x) => x.id === id); return p ? `${p.firstName} ${p.lastName}` : '—'; };
  const doctorName = (id: number) => { const d = doctors.find((x) => x.id === id); return d ? `Dr. ${d.firstName} ${d.lastName}` : '—'; };

  const openAdd = (date?: string) => {
    setEditing(null);
    setForm({ patientId: Number(patients[0]?.id ?? 0), doctorId: Number(doctors[0]?.id ?? 0), date: date ?? iso(new Date()), time: '09:00', reason: '', status: 'pending' });
    setFormOpen(true);
  };
  const openEdit = (a: Appt) => { setEditing(a); setForm({ patientId: a.patientId, doctorId: a.doctorId, date: a.date, time: a.time, reason: a.reason, status: a.status }); setFormOpen(true); };

  const submit = () => {
    if (!form.patientId || !form.doctorId || !form.date) { notify('Veuillez remplir tous les champs obligatoires', 'error'); return; }
    if (editing) { update(editing.id, form); notify('Rendez-vous modifié', 'success'); }
    else { add(form); notify('Rendez-vous créé', 'success'); }
    setFormOpen(false);
  };
  const setStatus = (a: Appt, status: Appt['status']) => { update(a.id, { status }); notify(`Statut: ${statusLabel[status]}`, 'info'); };
  const confirmDelete = () => { if (del) { remove(del.id); notify('Rendez-vous supprimé', 'warning'); setDel(null); } };

  const cells: (number | null)[] = [...Array(startWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const weekdays = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
  const todayIso = iso(new Date());

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <PageHeader title="Rendez-vous" subtitle="Calendrier de gestion des rendez-vous de la Clinique GODIE."
        action={<button className="btn-primary" onClick={() => openAdd()}><CalendarPlus size={18} /> Nouveau RDV</button>} />

      {patients.length === 0 && (
        <div className="card p-5 mb-6 border-l-4 border-warning-500 bg-warning-50/40 flex items-center gap-3">
          <Inbox className="text-warning-600" size={20} />
          <p className="text-sm text-slate-700 dark:text-slate-200">Aucun patient enregistré. Ajoutez d'abord un patient pour pouvoir créer un rendez-vous.</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white capitalize">{monthName}</h2>
            <div className="flex items-center gap-2">
              {doctors.length > 0 && (
                <div className="relative">
                  <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                  <select className="input !py-1.5 !pl-8 !pr-7 text-xs" value={String(doctorFilter)} onChange={(e) => setDoctorFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}>
                    <option value="all">Tous les médecins</option>
                    {doctors.map((d) => <option key={d.id as number} value={d.id as number}>Dr. {String(d.firstName)} {String(d.lastName)}</option>)}
                  </select>
                </div>
              )}
              <button className="btn-ghost !p-2" onClick={() => setCursor(new Date(year, month - 1, 1))}><ChevronLeft size={18} /></button>
              <button className="btn-secondary !py-1.5 !px-3 text-xs" onClick={() => { setCursor(new Date()); setSelectedDate(todayIso); }}>Aujourd'hui</button>
              <button className="btn-ghost !p-2" onClick={() => setCursor(new Date(year, month + 1, 1))}><ChevronRight size={18} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {weekdays.map((w) => <div key={w} className="text-center text-xs font-semibold text-slate-400 py-2">{w}</div>)}
            {cells.map((day, i) => {
              if (day === null) return <div key={i} />;
              const dateStr = iso(new Date(year, month, day));
              const count = apptsByDate[dateStr]?.length ?? 0;
              const isToday = dateStr === todayIso;
              const isSel = dateStr === selectedDate;
              return (
                <button key={i} onClick={() => setSelectedDate(dateStr)}
                  className={`aspect-square rounded-xl p-1.5 flex flex-col items-center justify-center text-sm transition
                    ${isSel ? 'bg-primary-600 text-white' : isToday ? 'bg-primary-50 text-primary-700 dark:bg-primary-600/15' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'}`}>
                  <span className="font-semibold">{day}</span>
                  {count > 0 && <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isSel ? 'bg-white' : 'bg-health-500'}`} />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800 dark:text-white">{selectedDate ? formatDate(selectedDate) : 'Sélectionnez une date'}</h2>
            {selectedDate && <button className="btn-health !py-1.5 !px-3 text-xs" onClick={() => openAdd(selectedDate)}><CalendarPlus size={14} /> Ajouter</button>}
          </div>
          {dayAppts.length === 0 ? (
            <EmptyState icon={CalendarDays} title="Aucun rendez-vous" message="Aucun RDV prévu ce jour." />
          ) : (
            <div className="space-y-3">
              {dayAppts.map((a) => (
                <div key={a.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2"><Clock size={16} className="text-primary-500" /><span className="font-semibold text-slate-800 dark:text-white">{a.time}</span></div>
                    <span className={`badge ${statusStyle[a.status]}`}>{statusLabel[a.status]}</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">{patientName(a.patientId)}</p>
                  <p className="text-xs text-slate-500">{doctorName(a.doctorId)}</p>
                  {a.reason && <p className="mt-1 text-xs text-slate-500">{a.reason}</p>}
                  <div className="mt-3 flex gap-1.5">
                    {a.status !== 'confirmed' && <button className="btn-ghost !p-1.5 text-health-600" onClick={() => setStatus(a, 'confirmed')} title="Confirmer"><CheckCircle2 size={15} /></button>}
                    {a.status !== 'cancelled' && <button className="btn-ghost !p-1.5 text-error-600" onClick={() => setStatus(a, 'cancelled')} title="Annuler"><XCircle size={15} /></button>}
                    <button className="btn-ghost !p-1.5" onClick={() => openEdit(a)} title="Modifier"><CalendarPlus size={15} /></button>
                    <button className="btn-ghost !p-1.5 text-error-600" onClick={() => setDel(a)} title="Supprimer"><X size={15} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'} size="md"
        footer={<><button className="btn-secondary" onClick={() => setFormOpen(false)}><X size={16} /> Annuler</button><button className="btn-primary" onClick={submit}>{editing ? 'Enregistrer' : 'Confirmer'}</button></>}>
        <div className="space-y-4">
          <div>
            <label className="label">Patient</label>
            <select className="input" value={form.patientId} onChange={(e) => setForm({ ...form, patientId: Number(e.target.value) })}>
              <option value="">— Sélectionner —</option>
              {patients.map((p) => <option key={p.id as number} value={p.id as number}>{String(p.firstName)} {String(p.lastName)}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Médecin</label>
            <select className="input" value={form.doctorId} onChange={(e) => setForm({ ...form, doctorId: Number(e.target.value) })}>
              <option value="">— Sélectionner —</option>
              {doctors.map((d) => <option key={d.id as number} value={d.id as number}>Dr. {String(d.firstName)} {String(d.lastName)}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Date</label><input type="date" className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
            <div><label className="label">Heure</label><select className="input" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}>{times.map((t) => <option key={t}>{t}</option>)}</select></div>
          </div>
          <div><label className="label">Motif</label><input className="input" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} /></div>
          <div><label className="label">Statut</label><select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Appt['status'] })}>{Object.entries(statusLabel).map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
        </div>
      </Modal>

      <ConfirmDialog open={!!del} title="Supprimer le rendez-vous" message="Confirmer la suppression de ce rendez-vous ?"
        confirmLabel="Supprimer" onConfirm={confirmDelete} onCancel={() => setDel(null)} />
    </div>
  );
}
