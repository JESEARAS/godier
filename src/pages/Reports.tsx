import { useState, useMemo } from 'react';
import {
  FileBarChart, FileDown, FileSpreadsheet, Printer, Users, CalendarDays,
  Activity, Pill, BedDouble, Receipt, Stethoscope, UserCog, HeartPulse,
  DoorOpen, FlaskConical, TestTube, Truck, Boxes, CreditCard, ShieldCheck,
  Briefcase, Ambulance, Siren, UserCircle, Shield, ScrollText, ClipboardCheck,
  Skull, Tag, FileText, ClipboardList, Globe,
} from 'lucide-react';
import { useCollection } from '@/hooks/useCollection';
import { useRefStore, resolveRef } from '@/hooks/useRefStore';
import { PageHeader } from '@/components/ui';
import { useToast } from '@/components/Toast';
import { formatDate, formatDateShort, money, downloadCSV } from '@/utils/format';
import { RESOURCES } from '@/services/resources';

type ReportType = 'global' | 'patients' | 'consultations' | 'rendez-vous' | 'medicaments' | 'hospitalisations' | 'factures' | 'medecins' | 'personnel' | 'infirmiers' | 'morgue' | 'suivi' | 'prix' | 'laboratoires' | 'analyses' | 'urgences' | 'utilisateurs';

const reports: { key: ReportType; title: string; desc: string; icon: typeof Users }[] = [
  { key: 'global', title: 'Rapport global', desc: 'Synthèse de toute la clinique', icon: Globe },
  { key: 'patients', title: 'Rapport des patients', desc: 'Liste complète des patients', icon: Users },
  { key: 'consultations', title: 'Rapport des consultations', desc: 'Historique des consultations', icon: Activity },
  { key: 'rendez-vous', title: 'Rapport des rendez-vous', desc: 'Tous les rendez-vous planifiés', icon: CalendarDays },
  { key: 'medicaments', title: 'Rapport des médicaments', desc: 'État du stock pharmaceutique', icon: Pill },
  { key: 'hospitalisations', title: 'Rapport des hospitalisations', desc: 'Séjours hospitaliers', icon: BedDouble },
  { key: 'factures', title: 'Rapport des factures', desc: 'Facturation et paiements', icon: Receipt },
  { key: 'medecins', title: 'Rapport des médecins', desc: 'Personnel médical', icon: Stethoscope },
  { key: 'personnel', title: 'Rapport du personnel', desc: 'Membres du personnel', icon: UserCog },
  { key: 'infirmiers', title: 'Rapport des infirmiers', desc: 'Équipe infirmière', icon: HeartPulse },
  { key: 'morgue', title: 'Rapport de la morgue', desc: 'Registre de la morgue', icon: Skull },
  { key: 'suivi', title: 'Rapport de suivi', desc: 'Suivi des patients', icon: ClipboardCheck },
  { key: 'prix', title: 'Rapport des prix', desc: 'Tarification des services', icon: Tag },
  { key: 'laboratoires', title: 'Rapport des laboratoires', desc: 'Laboratoires d\'analyse', icon: FlaskConical },
  { key: 'analyses', title: 'Rapport des analyses', desc: 'Analyses effectuées', icon: TestTube },
  { key: 'urgences', title: 'Rapport des urgences', desc: 'Cas urgents', icon: Siren },
  { key: 'utilisateurs', title: 'Rapport des utilisateurs', desc: 'Comptes et rôles', icon: UserCircle },
];

export default function Reports() {
  const { notify } = useToast();
  const [active, setActive] = useState<ReportType>('global');
  const refMaps = useRefStore(['godie_patients', 'godie_doctors', 'godie_medications', 'godie_invoices']);

  const { items: patients } = useCollection<Record<string, unknown>>('godie_patients');
  const { items: consults } = useCollection<Record<string, unknown>>('godie_consultations');
  const { items: appts } = useCollection<Record<string, unknown>>('godie_appointments');
  const { items: meds } = useCollection<Record<string, unknown>>('godie_medications');
  const { items: hosps } = useCollection<Record<string, unknown>>('godie_hospitalizations');
  const { items: invoices } = useCollection<Record<string, unknown>>('godie_invoices');
  const { items: doctors } = useCollection<Record<string, unknown>>('godie_doctors');
  const { items: staff } = useCollection<Record<string, unknown>>('godie_staff');
  const { items: nurses } = useCollection<Record<string, unknown>>('godie_nurses');
  const { items: morgue } = useCollection<Record<string, unknown>>('godie_morgue');
  const { items: followups } = useCollection<Record<string, unknown>>('godie_followups');
  const { items: prices } = useCollection<Record<string, unknown>>('godie_prices');
  const { items: labs } = useCollection<Record<string, unknown>>('godie_laboratories');
  const { items: analyses } = useCollection<Record<string, unknown>>('godie_analyses');
  const { items: emergencies } = useCollection<Record<string, unknown>>('godie_emergencies');
  const { items: users } = useCollection<Record<string, unknown>>('godie_users');

  const globalStats = useMemo(() => {
    const totalRevenue = invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + Number(i.amount ?? 0), 0);
    const pendingRevenue = invoices.filter((i) => i.status !== 'paid').reduce((s, i) => s + Number(i.amount ?? 0), 0);
    return [
      { label: 'Patients enregistrés(s)', value: patients.length },
      { label: 'Médecins', value: doctors.length },
      { label: 'Personnel total', value: staff.length + nurses.length + doctors.length },
      { label: 'Rendez-vous', value: appts.length },
      { label: 'Consultations', value: consults.length },
      { label: 'Hospitalisations actives', value: hosps.filter((h) => h.status === 'active').length },
      { label: 'Médicaments en stock', value: meds.length },
      { label: 'Analyses en laboratoire', value: analyses.length },
      { label: 'Cas d\'urgence', value: emergencies.length },
      { label: 'Suivis patients', value: followups.length },
      { label: 'Entrées morgue', value: morgue.length },
      { label: 'Utilisateurs système', value: users.length },
      { label: 'Revenus encaissés (Ar)', value: money(totalRevenue) },
      { label: 'Revenus en attente (Ar)', value: money(pendingRevenue) },
    ];
  }, [patients, doctors, staff, nurses, appts, consults, hosps, meds, analyses, emergencies, followups, morgue, users, invoices]);

  const getRows = (): Record<string, string | number>[] => {
    if (active === 'global') return globalStats.map((s) => ({ Indicateur: s.label, Valeur: s.value }));
    if (active === 'patients') return patients.map((r) => ({
      ID: Number(r.id), Nom: String(r.lastName ?? ''), Prénom: String(r.firstName ?? ''), Sexe: r.gender === 'M' ? 'Homme' : 'Femme', Téléphone: String(r.phone ?? ''), Adresse: String(r.address ?? '—'),
    }));
    if (active === 'consultations') return consults.map((r) => ({
      ID: Number(r.id), Date: formatDateShort(String(r.date)), Patient: resolveRef(refMaps, 'godie_patients', r.patientId, (i) => `${i.lastName} ${i.firstName}`), Diagnostic: String(r.diagnosis ?? ''),
    }));
    if (active === 'rendez-vous') return appts.map((r) => ({
      ID: Number(r.id), Date: formatDateShort(String(r.date)), Heure: String(r.time ?? ''), Patient: resolveRef(refMaps, 'godie_patients', r.patientId, (i) => `${i.lastName}`), Statut: String(r.status ?? ''),
    }));
    if (active === 'medicaments') return meds.map((r) => ({
      ID: Number(r.id), Nom: String(r.name ?? ''), Catégorie: String(r.category ?? ''), Quantité: Number(r.quantity ?? 0), Prix: money(Number(r.price ?? 0)), Expiration: formatDateShort(String(r.expiryDate ?? '')),
    }));
    if (active === 'hospitalisations') return hosps.map((r) => ({
      ID: Number(r.id), Patient: resolveRef(refMaps, 'godie_patients', r.patientId, (i) => `${i.lastName}`), Admission: formatDateShort(String(r.admissionDate)), Motif: String(r.reason ?? ''), Statut: String(r.status ?? ''),
    }));
    if (active === 'factures') return invoices.map((r) => ({
      ID: Number(r.id), Patient: resolveRef(refMaps, 'godie_patients', r.patientId, (x) => `${x.lastName}`), Date: formatDateShort(String(r.date)), Montant: money(Number(r.amount ?? 0)), Statut: String(r.status ?? ''),
    }));
    if (active === 'medecins') return doctors.map((r) => ({
      ID: Number(r.id), Nom: String(r.lastName ?? ''), Prénom: String(r.firstName ?? ''), Spécialité: String(r.specialty ?? ''), Téléphone: String(r.phone ?? ''), Disponible: String(r.available ?? ''),
    }));
    if (active === 'personnel') return staff.map((r) => ({
      ID: Number(r.id), Nom: String(r.lastName ?? ''), Prénom: String(r.firstName ?? ''), Fonction: String(r.role ?? ''), Service: String(r.service ?? ''), Téléphone: String(r.phone ?? ''),
    }));
    if (active === 'infirmiers') return nurses.map((r) => ({
      ID: Number(r.id), Nom: String(r.lastName ?? ''), Prénom: String(r.firstName ?? ''), Service: String(r.service ?? ''), Quart: String(r.shift ?? ''), Téléphone: String(r.phone ?? ''),
    }));
    if (active === 'morgue') return morgue.map((r) => ({
      ID: Number(r.id), Nom: String(r.name ?? ''), Entrée: formatDateShort(String(r.date ?? '')), Référence: String(r.reference ?? ''), Statut: String(r.status ?? ''),
    }));
    if (active === 'suivi') return followups.map((r) => ({
      ID: Number(r.id), Patient: resolveRef(refMaps, 'godie_patients', r.patientId, (i) => `${i.lastName}`), Date: formatDateShort(String(r.date ?? '')), Type: String(r.type ?? ''), Statut: String(r.status ?? ''),
    }));
    if (active === 'prix') return prices.map((r) => ({
      ID: Number(r.id), Service: String(r.serviceName ?? ''), Catégorie: String(r.category ?? ''), Prix: money(Number(r.price ?? 0)),
    }));
    if (active === 'laboratoires') return labs.map((r) => ({
      ID: Number(r.id), Nom: String(r.name ?? ''), Emplacement: String(r.location ?? ''), Responsable: String(r.manager ?? ''),
    }));
    if (active === 'analyses') return analyses.map((r) => ({
      ID: Number(r.id), Nom: String(r.name ?? ''), Catégorie: String(r.category ?? ''), Prix: money(Number(r.price ?? 0)),
    }));
    if (active === 'urgences') return emergencies.map((r) => ({
      ID: Number(r.id), Patient: resolveRef(refMaps, 'godie_patients', r.patientId, (i) => `${i.lastName}`), Date: formatDateShort(String(r.date ?? '')), Gravité: String(r.severity ?? ''), Statut: String(r.status ?? ''),
    }));
    return users.map((r) => ({
      ID: Number(r.id), Identifiant: String(r.username ?? ''), Nom: String(r.fullName ?? ''), Rôle: String(r.role ?? ''), Actif: String(r.active ?? ''),
    }));
  };

  const rows = getRows();
  const headers = rows.length ? Object.keys(rows[0]) : [];

  const exportPDF = () => {
    if (!rows.length) { notify('Aucune donnée à exporter', 'warning'); return; }
    import('jspdf').then(({ default: jsPDF }) => {
      const doc = new jsPDF();
      doc.setFillColor(26, 97, 215); doc.rect(0, 0, 210, 24, 'F');
      doc.setTextColor(255); doc.setFontSize(15); doc.setFont('helvetica', 'bold');
      doc.text(`Clinique GODIE — ${reports.find((r) => r.key === active)?.title}`, 105, 15, { align: 'center' });
      doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(120);
      doc.text(`Généré le ${formatDate(new Date().toISOString())} | ${rows.length} enregistrement(s)`, 105, 30, { align: 'center' });
      let y = 42;
      doc.setFontSize(8); doc.setTextColor(60); doc.setFont('helvetica', 'bold');
      doc.text(headers.join('  |  '), 14, y); y += 5;
      doc.setDrawColor(220); doc.line(14, y, 196, y); y += 6;
      doc.setFont('helvetica', 'normal'); doc.setTextColor(40);
      rows.forEach((row) => {
        if (y > 275) { doc.addPage(); y = 20; }
        const line = doc.splitTextToSize(headers.map((h) => String(row[h] ?? '')).join('  |  '), 182);
        doc.text(line, 14, y); y += line.length * 5 + 1.5;
      });
      doc.save(`rapport_${active}.pdf`);
      notify('Rapport PDF exporté', 'success');
    });
  };

  const exportExcel = () => {
    if (!rows.length) { notify('Aucune donnée à exporter', 'warning'); return; }
    downloadCSV(`rapport_${active}.csv`, rows);
    notify('Rapport Excel exporté', 'success');
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <PageHeader title="Rapports" subtitle="Générez et exportez les rapports de la Clinique GODIE — par module ou globalement." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {reports.map((r) => (
          <button key={r.key} onClick={() => setActive(r.key)}
            className={`card card-hover p-4 text-left transition ${active === r.key ? 'ring-2 ring-primary-500 bg-primary-50/40 dark:bg-primary-600/10' : ''}`}>
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-2 ${active === r.key ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
              <r.icon size={20} />
            </div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">{r.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{r.desc}</p>
          </button>
        ))}
      </div>

      <div className="card p-4 mb-6 flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <FileBarChart size={18} className="text-primary-500" />
          <span>{rows.length} enregistrement(s) — {reports.find((r) => r.key === active)?.title}</span>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={exportPDF}><FileDown size={16} /> Export PDF</button>
          <button className="btn-secondary" onClick={exportExcel}><FileSpreadsheet size={16} /> Export Excel</button>
          <button className="btn-primary" onClick={() => window.print()}><Printer size={16} /> Imprimer</button>
        </div>
      </div>

      <div className="card overflow-hidden">
        {rows.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500">Aucune donnée à afficher pour ce rapport. Ajoutez des enregistrements pour générer un rapport.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
                <tr>{headers.map((h) => <th key={h} className="text-left px-4 py-3 font-semibold whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {rows.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    {headers.map((h) => <td key={h} className="px-4 py-2.5 text-slate-600 dark:text-slate-300 whitespace-nowrap">{String(r[h] ?? '—')}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
