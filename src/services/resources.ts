import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Users, Stethoscope, UserCog, HeartPulse, CalendarDays, ClipboardList, FileText,
  BedDouble, DoorOpen, FlaskConical, TestTube, FileBarChart, Pill, Truck, Boxes,
  Receipt, CreditCard, ShieldCheck, Briefcase, Activity, Ambulance, Siren,
  UserCircle, Shield, ScrollText, ClipboardCheck as FollowUp, Skull, Tag, ListChecks,
} from 'lucide-react';

export type FieldType = 'text' | 'number' | 'date' | 'select' | 'textarea' | 'tel' | 'email' | 'checkbox';

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  /** Reference to another collection key for label resolution */
  ref?: string;
  refLabel?: (item: Record<string, unknown>) => string;
}

export interface ColumnDef {
  name: string;
  label: string;
  type?: 'text' | 'date' | 'number' | 'badge' | 'money' | 'ref';
  ref?: string;
  refLabel?: (item: Record<string, unknown>) => string;
  badgeOptions?: Record<string, { label: string; cls: string }>;
}

export interface ResourceDef {
  key: string;
  label: string;
  singular: string;
  icon: LucideIcon;
  group: string;
  fields: FieldDef[];
  columns: ColumnDef[];
  searchFields: string[];
  filters?: { name: string; label: string; options: string[] }[];
}

/** Resolve a referenced item's display label from a collection. */
function refLabelMaker(display: (i: Record<string, unknown>) => string) {
  return display;
}

export const RESOURCES: ResourceDef[] = [
  // ---- Patients & soins ----
  {
    key: 'godie_patients', label: 'Patients', singular: 'Patient', icon: Users, group: 'Patients & Soins',
    searchFields: ['firstName', 'lastName', 'phone'],
    fields: [
      { name: 'firstName', label: 'Prénom', type: 'text', required: true },
      { name: 'lastName', label: 'Nom', type: 'text', required: true },
      { name: 'birthDate', label: 'Date de naissance', type: 'date', required: true },
      { name: 'gender', label: 'Sexe', type: 'select', options: ['M', 'F'], required: true },
      { name: 'phone', label: 'Téléphone', type: 'tel', required: true },
      { name: 'address', label: 'Adresse', type: 'text' },
      { name: 'bloodGroup', label: 'Groupe sanguin', type: 'select', options: ['O+','O-','A+','A-','B+','B-','AB+','AB-','Inconnu'] },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'notes', label: 'Notes médicales', type: 'textarea' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'lastName', label: 'Nom' },
      { name: 'firstName', label: 'Prénom' },
      { name: 'gender', label: 'Sexe', type: 'badge', badgeOptions: { M: { label: 'Homme', cls: 'bg-primary-100 text-primary-700' }, F: { label: 'Femme', cls: 'bg-accent-100 text-accent-700' } } },
      { name: 'phone', label: 'Téléphone' },
      { name: 'bloodGroup', label: 'Groupe' },
    ],
  },
  {
    key: 'godie_doctors', label: 'Médecins', singular: 'Médecin', icon: Stethoscope, group: 'Personnel',
    searchFields: ['firstName', 'lastName', 'specialty'],
    fields: [
      { name: 'firstName', label: 'Prénom', type: 'text', required: true },
      { name: 'lastName', label: 'Nom', type: 'text', required: true },
      { name: 'specialty', label: 'Spécialité', type: 'text', required: true },
      { name: 'phone', label: 'Téléphone', type: 'tel', required: true },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'available', label: 'Disponible', type: 'checkbox' },
      { name: 'schedule', label: 'Horaires', type: 'text' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'lastName', label: 'Nom' },
      { name: 'firstName', label: 'Prénom' },
      { name: 'specialty', label: 'Spécialité' },
      { name: 'phone', label: 'Téléphone' },
      { name: 'available', label: 'Dispo', type: 'badge', badgeOptions: { true: { label: 'Oui', cls: 'bg-health-100 text-health-700' }, false: { label: 'Non', cls: 'bg-slate-200 text-slate-500' } } },
    ],
    filters: [{ name: 'available', label: 'Disponibilité', options: ['Tous','true','false'] }],
  },
  {
    key: 'godie_staff', label: 'Personnel', singular: 'Membre du personnel', icon: UserCog, group: 'Personnel',
    searchFields: ['firstName', 'lastName', 'role'],
    fields: [
      { name: 'firstName', label: 'Prénom', type: 'text', required: true },
      { name: 'lastName', label: 'Nom', type: 'text', required: true },
      { name: 'role', label: 'Fonction', type: 'text', required: true },
      { name: 'phone', label: 'Téléphone', type: 'tel', required: true },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'service', label: 'Service', type: 'text' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'lastName', label: 'Nom' },
      { name: 'firstName', label: 'Prénom' },
      { name: 'role', label: 'Fonction' },
      { name: 'service', label: 'Service' },
      { name: 'phone', label: 'Téléphone' },
    ],
  },
  {
    key: 'godie_nurses', label: 'Infirmiers', singular: 'Infirmier', icon: HeartPulse, group: 'Personnel',
    searchFields: ['firstName', 'lastName', 'service'],
    fields: [
      { name: 'firstName', label: 'Prénom', type: 'text', required: true },
      { name: 'lastName', label: 'Nom', type: 'text', required: true },
      { name: 'phone', label: 'Téléphone', type: 'tel', required: true },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'service', label: 'Service', type: 'text', required: true },
      { name: 'shift', label: 'Quart', type: 'select', options: ['Jour','Nuit','Garde'] },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'lastName', label: 'Nom' },
      { name: 'firstName', label: 'Prénom' },
      { name: 'service', label: 'Service' },
      { name: 'shift', label: 'Quart' },
      { name: 'phone', label: 'Téléphone' },
    ],
  },
  // ---- Rendez-vous & consultations (custom pages also use these) ----
  {
    key: 'godie_appointments', label: 'Rendez-vous', singular: 'Rendez-vous', icon: CalendarDays, group: 'Consultations',
    searchFields: ['reason'],
    fields: [
      { name: 'patientId', label: 'Patient', type: 'select', ref: 'godie_patients', refLabel: refLabelMaker((i) => `${i.lastName} ${i.firstName}`), required: true },
      { name: 'doctorId', label: 'Médecin', type: 'select', ref: 'godie_doctors', refLabel: refLabelMaker((i) => `Dr. ${i.lastName} ${i.firstName}`), required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'time', label: 'Heure', type: 'text', required: true, placeholder: 'HH:MM' },
      { name: 'reason', label: 'Motif', type: 'text' },
      { name: 'status', label: 'Statut', type: 'select', options: ['pending','confirmed','cancelled'] },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'patientId', label: 'Patient', type: 'ref', ref: 'godie_patients', refLabel: refLabelMaker((i) => `${i.lastName} ${i.firstName}`) },
      { name: 'doctorId', label: 'Médecin', type: 'ref', ref: 'godie_doctors', refLabel: refLabelMaker((i) => `Dr. ${i.lastName}`) },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'time', label: 'Heure' },
      { name: 'status', label: 'Statut', type: 'badge', badgeOptions: { confirmed: { label: 'Confirmé', cls: 'bg-health-100 text-health-700' }, pending: { label: 'En attente', cls: 'bg-warning-100 text-warning-700' }, cancelled: { label: 'Annulé', cls: 'bg-error-100 text-error-700' } } },
    ],
    filters: [{ name: 'status', label: 'Statut', options: ['Tous','pending','confirmed','cancelled'] }],
  },
  {
    key: 'godie_consultations', label: 'Consultations', singular: 'Consultation', icon: ClipboardList, group: 'Consultations',
    searchFields: ['diagnosis', 'symptoms'],
    fields: [
      { name: 'patientId', label: 'Patient', type: 'select', ref: 'godie_patients', refLabel: refLabelMaker((i) => `${i.lastName} ${i.firstName}`), required: true },
      { name: 'doctorId', label: 'Médecin', type: 'select', ref: 'godie_doctors', refLabel: refLabelMaker((i) => `Dr. ${i.lastName} ${i.firstName}`), required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'symptoms', label: 'Symptômes', type: 'textarea' },
      { name: 'diagnosis', label: 'Diagnostic', type: 'textarea', required: true },
      { name: 'treatment', label: 'Traitement', type: 'textarea' },
      { name: 'prescription', label: 'Ordonnance', type: 'textarea' },
      { name: 'notes', label: 'Notes', type: 'textarea' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'patientId', label: 'Patient', type: 'ref', ref: 'godie_patients', refLabel: refLabelMaker((i) => `${i.lastName} ${i.firstName}`) },
      { name: 'doctorId', label: 'Médecin', type: 'ref', ref: 'godie_doctors', refLabel: refLabelMaker((i) => `Dr. ${i.lastName}`) },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'diagnosis', label: 'Diagnostic' },
    ],
  },
  {
    key: 'godie_prescriptions', label: 'Ordonnances', singular: 'Ordonnance', icon: FileText, group: 'Consultations',
    searchFields: ['medications'],
    fields: [
      { name: 'patientId', label: 'Patient', type: 'select', ref: 'godie_patients', refLabel: refLabelMaker((i) => `${i.lastName} ${i.firstName}`), required: true },
      { name: 'doctorId', label: 'Médecin', type: 'select', ref: 'godie_doctors', refLabel: refLabelMaker((i) => `Dr. ${i.lastName} ${i.firstName}`), required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'medications', label: 'Médicaments prescrits', type: 'textarea', required: true },
      { name: 'notes', label: 'Notes', type: 'textarea' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'patientId', label: 'Patient', type: 'ref', ref: 'godie_patients', refLabel: refLabelMaker((i) => `${i.lastName} ${i.firstName}`) },
      { name: 'doctorId', label: 'Médecin', type: 'ref', ref: 'godie_doctors', refLabel: refLabelMaker((i) => `Dr. ${i.lastName}`) },
      { name: 'date', label: 'Date', type: 'date' },
    ],
  },
  // ---- Hospitalisation ----
  {
    key: 'godie_hospitalizations', label: 'Hospitalisations', singular: 'Hospitalisation', icon: BedDouble, group: 'Hospitalisation',
    searchFields: ['reason'],
    fields: [
      { name: 'patientId', label: 'Patient', type: 'select', ref: 'godie_patients', refLabel: refLabelMaker((i) => `${i.lastName} ${i.firstName}`), required: true },
      { name: 'bedId', label: 'Lit', type: 'select', ref: 'godie_beds', refLabel: refLabelMaker((i) => `Lit #${i.id}`), required: true },
      { name: 'doctorId', label: 'Médecin', type: 'select', ref: 'godie_doctors', refLabel: refLabelMaker((i) => `Dr. ${i.lastName}`), required: true },
      { name: 'admissionDate', label: 'Date d\'admission', type: 'date', required: true },
      { name: 'dischargeDate', label: 'Date de sortie', type: 'date' },
      { name: 'reason', label: 'Motif', type: 'text', required: true },
      { name: 'status', label: 'Statut', type: 'select', options: ['active','discharged'] },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'patientId', label: 'Patient', type: 'ref', ref: 'godie_patients', refLabel: refLabelMaker((i) => `${i.lastName} ${i.firstName}`) },
      { name: 'admissionDate', label: 'Admission', type: 'date' },
      { name: 'reason', label: 'Motif' },
      { name: 'status', label: 'Statut', type: 'badge', badgeOptions: { active: { label: 'En cours', cls: 'bg-primary-100 text-primary-700' }, discharged: { label: 'Sorti', cls: 'bg-slate-200 text-slate-500' } } },
    ],
  },
  {
    key: 'godie_rooms', label: 'Chambres', singular: 'Chambre', icon: DoorOpen, group: 'Hospitalisation',
    searchFields: ['number','type'],
    fields: [
      { name: 'number', label: 'Numéro', type: 'text', required: true },
      { name: 'type', label: 'Type', type: 'select', options: ['Standard','Suite','Privée','Urgence'], required: true },
      { name: 'floor', label: 'Étage', type: 'text' },
      { name: 'capacity', label: 'Capacité (lits)', type: 'number', required: true },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'number', label: 'Numéro' },
      { name: 'type', label: 'Type' },
      { name: 'floor', label: 'Étage' },
      { name: 'capacity', label: 'Capacité', type: 'number' },
    ],
  },
  {
    key: 'godie_beds', label: 'Lits', singular: 'Lit', icon: BedDouble, group: 'Hospitalisation',
    searchFields: ['number'],
    fields: [
      { name: 'roomId', label: 'Chambre', type: 'select', ref: 'godie_rooms', refLabel: refLabelMaker((i) => `Chambre ${i.number}`), required: true },
      { name: 'number', label: 'Numéro du lit', type: 'text', required: true },
      { name: 'status', label: 'Statut', type: 'select', options: ['available','occupied','maintenance'] },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'roomId', label: 'Chambre', type: 'ref', ref: 'godie_rooms', refLabel: refLabelMaker((i) => `${i.number}`) },
      { name: 'number', label: 'Lit' },
      { name: 'status', label: 'Statut', type: 'badge', badgeOptions: { available: { label: 'Libre', cls: 'bg-health-100 text-health-700' }, occupied: { label: 'Occupé', cls: 'bg-error-100 text-error-700' }, maintenance: { label: 'Maintenance', cls: 'bg-warning-100 text-warning-700' } } },
    ],
  },
  // ---- Laboratoire ----
  {
    key: 'godie_laboratories', label: 'Laboratoires', singular: 'Laboratoire', icon: FlaskConical, group: 'Laboratoire',
    searchFields: ['name','location'],
    fields: [
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'location', label: 'Emplacement', type: 'text' },
      { name: 'phone', label: 'Téléphone', type: 'tel' },
      { name: 'manager', label: 'Responsable', type: 'text' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'name', label: 'Nom' },
      { name: 'location', label: 'Emplacement' },
      { name: 'manager', label: 'Responsable' },
      { name: 'phone', label: 'Téléphone' },
    ],
  },
  {
    key: 'godie_analyses', label: 'Analyses', singular: 'Analyse', icon: TestTube, group: 'Laboratoire',
    searchFields: ['name','category'],
    fields: [
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'category', label: 'Catégorie', type: 'text', required: true },
      { name: 'price', label: 'Prix (Ar)', type: 'number', required: true },
      { name: 'duration', label: 'Délai', type: 'text' },
      { name: 'laboratoryId', label: 'Laboratoire', type: 'select', ref: 'godie_laboratories', refLabel: refLabelMaker((i) => i.name as string) },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'name', label: 'Nom' },
      { name: 'category', label: 'Catégorie' },
      { name: 'price', label: 'Prix', type: 'money' },
      { name: 'duration', label: 'Délai' },
    ],
  },
  {
    key: 'godie_results', label: 'Résultats', singular: 'Résultat', icon: FileBarChart, group: 'Laboratoire',
    searchFields: ['value','notes'],
    fields: [
      { name: 'analysisId', label: 'Analyse', type: 'select', ref: 'godie_analyses', refLabel: refLabelMaker((i) => i.name as string), required: true },
      { name: 'patientId', label: 'Patient', type: 'select', ref: 'godie_patients', refLabel: refLabelMaker((i) => `${i.lastName} ${i.firstName}`), required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'value', label: 'Résultat', type: 'text', required: true },
      { name: 'status', label: 'Statut', type: 'select', options: ['pending','completed'] },
      { name: 'notes', label: 'Notes', type: 'textarea' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'analysisId', label: 'Analyse', type: 'ref', ref: 'godie_analyses', refLabel: refLabelMaker((i) => i.name as string) },
      { name: 'patientId', label: 'Patient', type: 'ref', ref: 'godie_patients', refLabel: refLabelMaker((i) => `${i.lastName}`) },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'status', label: 'Statut', type: 'badge', badgeOptions: { pending: { label: 'En attente', cls: 'bg-warning-100 text-warning-700' }, completed: { label: 'Terminé', cls: 'bg-health-100 text-health-700' } } },
    ],
  },
  // ---- Pharmacie ----
  {
    key: 'godie_medications', label: 'Médicaments', singular: 'Médicament', icon: Pill, group: 'Pharmacie',
    searchFields: ['name','category'],
    fields: [
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'category', label: 'Catégorie', type: 'text', required: true },
      { name: 'quantity', label: 'Quantité', type: 'number', required: true },
      { name: 'price', label: 'Prix (Ar)', type: 'number', required: true },
      { name: 'expiryDate', label: 'Expiration', type: 'date', required: true },
      { name: 'supplierId', label: 'Fournisseur', type: 'select', ref: 'godie_suppliers', refLabel: refLabelMaker((i) => i.name as string) },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'name', label: 'Nom' },
      { name: 'category', label: 'Catégorie' },
      { name: 'quantity', label: 'Quantité', type: 'number' },
      { name: 'price', label: 'Prix', type: 'money' },
      { name: 'expiryDate', label: 'Expiration', type: 'date' },
    ],
  },
  {
    key: 'godie_suppliers', label: 'Fournisseurs', singular: 'Fournisseur', icon: Truck, group: 'Pharmacie',
    searchFields: ['name','contact'],
    fields: [
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'contact', label: 'Contact', type: 'text' },
      { name: 'phone', label: 'Téléphone', type: 'tel' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'address', label: 'Adresse', type: 'text' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'name', label: 'Nom' },
      { name: 'contact', label: 'Contact' },
      { name: 'phone', label: 'Téléphone' },
      { name: 'email', label: 'Email' },
    ],
  },
  {
    key: 'godie_stock', label: 'Stock', singular: 'Entrée de stock', icon: Boxes, group: 'Pharmacie',
    searchFields: ['location'],
    fields: [
      { name: 'medicationId', label: 'Médicament', type: 'select', ref: 'godie_medications', refLabel: refLabelMaker((i) => i.name as string), required: true },
      { name: 'quantity', label: 'Quantité', type: 'number', required: true },
      { name: 'minThreshold', label: 'Seuil minimum', type: 'number', required: true },
      { name: 'location', label: 'Emplacement', type: 'text' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'medicationId', label: 'Médicament', type: 'ref', ref: 'godie_medications', refLabel: refLabelMaker((i) => i.name as string) },
      { name: 'quantity', label: 'Quantité', type: 'number' },
      { name: 'minThreshold', label: 'Seuil', type: 'number' },
      { name: 'location', label: 'Emplacement' },
    ],
  },
  // ---- Facturation ----
  {
    key: 'godie_invoices', label: 'Factures', singular: 'Facture', icon: Receipt, group: 'Facturation',
    searchFields: [],
    fields: [
      { name: 'patientId', label: 'Patient', type: 'select', ref: 'godie_patients', refLabel: refLabelMaker((i) => `${i.lastName} ${i.firstName}`), required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'amount', label: 'Montant (Ar)', type: 'number', required: true },
      { name: 'status', label: 'Statut', type: 'select', options: ['unpaid','paid','partial'] },
      { name: 'insuranceId', label: 'Assurance', type: 'select', ref: 'godie_insurance', refLabel: refLabelMaker((i) => i.name as string) },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'patientId', label: 'Patient', type: 'ref', ref: 'godie_patients', refLabel: refLabelMaker((i) => `${i.lastName}`) },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'amount', label: 'Montant', type: 'money' },
      { name: 'status', label: 'Statut', type: 'badge', badgeOptions: { unpaid: { label: 'Impayé', cls: 'bg-error-100 text-error-700' }, paid: { label: 'Payé', cls: 'bg-health-100 text-health-700' }, partial: { label: 'Partiel', cls: 'bg-warning-100 text-warning-700' } } },
    ],
    filters: [{ name: 'status', label: 'Statut', options: ['Tous','unpaid','paid','partial'] }],
  },
  {
    key: 'godie_payments', label: 'Paiements', singular: 'Paiement', icon: CreditCard, group: 'Facturation',
    searchFields: ['method'],
    fields: [
      { name: 'invoiceId', label: 'Facture', type: 'select', ref: 'godie_invoices', refLabel: refLabelMaker((i) => `Facture #${i.id}`), required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'amount', label: 'Montant (Ar)', type: 'number', required: true },
      { name: 'method', label: 'Méthode', type: 'select', options: ['Espèces','Mobile Money','Virement','Chèque','Carte'] },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'invoiceId', label: 'Facture', type: 'ref', ref: 'godie_invoices', refLabel: refLabelMaker((i) => `#${i.id}`) },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'amount', label: 'Montant', type: 'money' },
      { name: 'method', label: 'Méthode' },
    ],
  },
  {
    key: 'godie_insurance', label: 'Assurances', singular: 'Assurance', icon: ShieldCheck, group: 'Facturation',
    searchFields: ['name'],
    fields: [
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'coverage', label: 'Couverture (%)', type: 'number', required: true },
      { name: 'phone', label: 'Téléphone', type: 'tel' },
      { name: 'email', label: 'Email', type: 'email' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'name', label: 'Nom' },
      { name: 'coverage', label: 'Couverture', type: 'number' },
      { name: 'phone', label: 'Téléphone' },
    ],
  },
  // ---- Services & spécialités ----
  {
    key: 'godie_services', label: 'Services', singular: 'Service', icon: Briefcase, group: 'Référentiels',
    searchFields: ['name'],
    fields: [
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'icon', label: 'Icône (nom Lucide)', type: 'text' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'name', label: 'Nom' },
      { name: 'description', label: 'Description' },
    ],
  },
  {
    key: 'godie_specialties', label: 'Spécialités', singular: 'Spécialité', icon: Stethoscope, group: 'Référentiels',
    searchFields: ['name'],
    fields: [
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'name', label: 'Nom' },
      { name: 'description', label: 'Description' },
    ],
  },
  // ---- Urgences & ambulances ----
  {
    key: 'godie_emergencies', label: 'Urgences', singular: 'Urgence', icon: Siren, group: 'Urgences',
    searchFields: ['description'],
    fields: [
      { name: 'patientId', label: 'Patient', type: 'select', ref: 'godie_patients', refLabel: refLabelMaker((i) => `${i.lastName} ${i.firstName}`), required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'severity', label: 'Gravité', type: 'select', options: ['low','medium','high','critical'] },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'status', label: 'Statut', type: 'select', options: ['open','treated','transferred'] },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'patientId', label: 'Patient', type: 'ref', ref: 'godie_patients', refLabel: refLabelMaker((i) => `${i.lastName}`) },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'severity', label: 'Gravité', type: 'badge', badgeOptions: { low: { label: 'Faible', cls: 'bg-health-100 text-health-700' }, medium: { label: 'Moyenne', cls: 'bg-warning-100 text-warning-700' }, high: { label: 'Haute', cls: 'bg-accent-100 text-accent-700' }, critical: { label: 'Critique', cls: 'bg-error-100 text-error-700' } } },
      { name: 'status', label: 'Statut', type: 'badge', badgeOptions: { open: { label: 'Ouverte', cls: 'bg-error-100 text-error-700' }, treated: { label: 'Traitée', cls: 'bg-health-100 text-health-700' }, transferred: { label: 'Transférée', cls: 'bg-primary-100 text-primary-700' } } },
    ],
  },
  {
    key: 'godie_ambulances', label: 'Ambulances', singular: 'Ambulance', icon: Ambulance, group: 'Urgences',
    searchFields: ['plate','driver'],
    fields: [
      { name: 'plate', label: 'Immatriculation', type: 'text', required: true },
      { name: 'driver', label: 'Chauffeur', type: 'text', required: true },
      { name: 'phone', label: 'Téléphone', type: 'tel' },
      { name: 'status', label: 'Statut', type: 'select', options: ['available','on-mission','maintenance'] },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'plate', label: 'Immat.' },
      { name: 'driver', label: 'Chauffeur' },
      { name: 'phone', label: 'Téléphone' },
      { name: 'status', label: 'Statut', type: 'badge', badgeOptions: { available: { label: 'Disponible', cls: 'bg-health-100 text-health-700' }, 'on-mission': { label: 'En mission', cls: 'bg-accent-100 text-accent-700' }, maintenance: { label: 'Maintenance', cls: 'bg-slate-200 text-slate-500' } } },
    ],
  },
  // ---- Utilisateurs & sécurité ----
  {
    key: 'godie_users', label: 'Utilisateurs', singular: 'Utilisateur', icon: UserCircle, group: 'Sécurité',
    searchFields: ['username','fullName','email'],
    fields: [
      { name: 'username', label: 'Identifiant', type: 'text', required: true },
      { name: 'fullName', label: 'Nom complet', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'role', label: 'Rôle', type: 'select', options: ['Administrateur','Médecin','Infirmier','Réception','Pharmacien','Laboratoire','Comptable'] },
      { name: 'active', label: 'Actif', type: 'checkbox' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'username', label: 'Identifiant' },
      { name: 'fullName', label: 'Nom complet' },
      { name: 'role', label: 'Rôle', type: 'badge', badgeOptions: { Administrateur: { label: 'Admin', cls: 'bg-primary-100 text-primary-700' }, Médecin: { label: 'Médecin', cls: 'bg-health-100 text-health-700' }, Infirmier: { label: 'Infirmier', cls: 'bg-accent-100 text-accent-700' }, Réception: { label: 'Réception', cls: 'bg-slate-200 text-slate-600' }, Pharmacien: { label: 'Pharmacien', cls: 'bg-warning-100 text-warning-700' }, Laboratoire: { label: 'Labo', cls: 'bg-primary-100 text-primary-700' }, Comptable: { label: 'Comptable', cls: 'bg-slate-200 text-slate-600' } } },
      { name: 'active', label: 'Actif', type: 'badge', badgeOptions: { true: { label: 'Oui', cls: 'bg-health-100 text-health-700' }, false: { label: 'Non', cls: 'bg-slate-200 text-slate-500' } } },
    ],
    filters: [{ name: 'role', label: 'Rôle', options: ['Tous','Administrateur','Médecin','Infirmier','Réception','Pharmacien','Laboratoire','Comptable'] }],
  },
  {
    key: 'godie_roles', label: 'Rôles', singular: 'Rôle', icon: Shield, group: 'Sécurité',
    searchFields: ['name'],
    fields: [
      { name: 'name', label: 'Nom du rôle', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'permissions', label: 'Permissions (séparées par virgule)', type: 'textarea' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'name', label: 'Rôle' },
      { name: 'description', label: 'Description' },
    ],
  },
  {
    key: 'godie_activity', label: 'Journal d\'activités', singular: 'Activité', icon: ScrollText, group: 'Sécurité',
    searchFields: ['action','module','user'],
    fields: [
      { name: 'action', label: 'Action', type: 'text', required: true },
      { name: 'module', label: 'Module', type: 'text', required: true },
      { name: 'detail', label: 'Détail', type: 'textarea' },
      { name: 'user', label: 'Utilisateur', type: 'text' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'action', label: 'Action' },
      { name: 'module', label: 'Module' },
      { name: 'user', label: 'Utilisateur' },
      { name: 'createdAt', label: 'Date', type: 'date' },
    ],
  },
  // ---- Suivi patients ----
  {
    key: 'godie_followups', label: 'Suivi patients', singular: 'Suivi', icon: FollowUp, group: 'Patients & Soins',
    searchFields: ['notes'],
    fields: [
      { name: 'patientId', label: 'Patient', type: 'select', ref: 'godie_patients', refLabel: refLabelMaker((i) => `${i.lastName} ${i.firstName}`), required: true },
      { name: 'date', label: 'Date du suivi', type: 'date', required: true },
      { name: 'type', label: 'Type de suivi', type: 'select', options: ['Post-opératoire','Post-consultation','Traitement long','Convalescence','Contrôle'], required: true },
      { name: 'status', label: 'Statut', type: 'select', options: ['En cours','Terminé','Critique'] },
      { name: 'notes', label: 'Notes', type: 'textarea', required: true },
      { name: 'nextDate', label: 'Prochaine visite', type: 'date' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'patientId', label: 'Patient', type: 'ref', ref: 'godie_patients', refLabel: refLabelMaker((i) => `${i.lastName} ${i.firstName}`) },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'type', label: 'Type' },
      { name: 'status', label: 'Statut', type: 'badge', badgeOptions: { 'En cours': { label: 'En cours', cls: 'bg-primary-100 text-primary-700' }, 'Terminé': { label: 'Terminé', cls: 'bg-health-100 text-health-700' }, 'Critique': { label: 'Critique', cls: 'bg-error-100 text-error-700' } } },
      { name: 'nextDate', label: 'Prochaine', type: 'date' },
    ],
    filters: [{ name: 'status', label: 'Statut', options: ['Tous','En cours','Terminé','Critique'] }],
  },
  // ---- Morgue ----
  {
    key: 'godie_morgue', label: 'Morgue', singular: 'Entrée morgue', icon: Skull, group: 'Hospitalisation',
    searchFields: ['name','reference'],
    fields: [
      { name: 'name', label: 'Nom du défunt', type: 'text', required: true },
      { name: 'date', label: 'Date d\'entrée', type: 'date', required: true },
      { name: 'reference', label: 'Référence', type: 'text', required: true },
      { name: 'cause', label: 'Cause', type: 'textarea' },
      { name: 'familyContact', label: 'Contact famille', type: 'text' },
      { name: 'releaseDate', label: 'Date de sortie', type: 'date' },
      { name: 'status', label: 'Statut', type: 'select', options: ['En place','Récupéré','Transféré'] },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'name', label: 'Nom' },
      { name: 'date', label: 'Entrée', type: 'date' },
      { name: 'reference', label: 'Référence' },
      { name: 'status', label: 'Statut', type: 'badge', badgeOptions: { 'En place': { label: 'En place', cls: 'bg-slate-200 text-slate-600' }, 'Récupéré': { label: 'Récupéré', cls: 'bg-health-100 text-health-700' }, 'Transféré': { label: 'Transféré', cls: 'bg-primary-100 text-primary-700' } } },
    ],
    filters: [{ name: 'status', label: 'Statut', options: ['Tous','En place','Récupéré','Transféré'] }],
  },
  // ---- Prix des services ----
  {
    key: 'godie_prices', label: 'Prix des services', singular: 'Tarif', icon: Tag, group: 'Référentiels',
    searchFields: ['serviceName'],
    fields: [
      { name: 'serviceName', label: 'Nom du service', type: 'text', required: true },
      { name: 'category', label: 'Catégorie', type: 'select', options: ['Consultation','Hospitalisation','Laboratoire','Pharmacie','Urgence','Chirurgie','Imagerie','Autre'], required: true },
      { name: 'price', label: 'Prix (Ar)', type: 'number', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'serviceName', label: 'Service' },
      { name: 'category', label: 'Catégorie' },
      { name: 'price', label: 'Prix', type: 'money' },
    ],
    filters: [{ name: 'category', label: 'Catégorie', options: ['Tous','Consultation','Hospitalisation','Laboratoire','Pharmacie','Urgence','Chirurgie','Imagerie','Autre'] }],
  },
];

export const RESOURCE_GROUPS = Array.from(new Set(RESOURCES.map((r) => r.group)));

export function getResource(key: string): ResourceDef | undefined {
  return RESOURCES.find((r) => r.key === key);
}

// Keep an icon map import alive for tree-shaking friendliness
export type IconType = ComponentType<LucideIcon>;
export { Activity };
