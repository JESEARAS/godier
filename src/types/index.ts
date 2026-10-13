// Domain entity types for the Clinique GODIE management platform.
// Most entities are handled generically by the CRUD framework; these
// interfaces exist for the custom pages (Dashboard, Appointments,
// Consultations, Reports) that need typed access to stored records.

export interface BaseEntity {
  id: number;
  createdAt: string;
}

export interface Patient extends BaseEntity {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: 'M' | 'F';
  phone: string;
  address: string;
  bloodGroup: string;
  email?: string;
  notes?: string;
}

export interface Doctor extends BaseEntity {
  firstName: string;
  lastName: string;
  specialty: string;
  phone: string;
  email: string;
  available: boolean;
  schedule: string;
}

export interface Staff extends BaseEntity {
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  email: string;
  service: string;
}

export interface Nurse extends BaseEntity {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service: string;
  shift: string;
}

export interface Appointment extends BaseEntity {
  patientId: number;
  doctorId: number;
  date: string;
  time: string;
  reason: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface Consultation extends BaseEntity {
  patientId: number;
  doctorId: number;
  date: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  prescription: string;
  notes: string;
}

export interface Prescription extends BaseEntity {
  patientId: number;
  doctorId: number;
  consultationId?: number;
  date: string;
  medications: string;
  notes: string;
}

export interface Hospitalization extends BaseEntity {
  patientId: number;
  bedId: number;
  doctorId: number;
  admissionDate: string;
  dischargeDate: string;
  reason: string;
  status: 'active' | 'discharged';
}

export interface Room extends BaseEntity {
  number: string;
  type: string;
  floor: string;
  capacity: number;
}

export interface Bed extends BaseEntity {
  roomId: number;
  number: string;
  status: 'available' | 'occupied' | 'maintenance';
}

export interface Laboratory extends BaseEntity {
  name: string;
  location: string;
  phone: string;
  manager: string;
}

export interface Analysis extends BaseEntity {
  name: string;
  category: string;
  price: number;
  duration: string;
  laboratoryId: number;
}

export interface Result extends BaseEntity {
  analysisId: number;
  patientId: number;
  date: string;
  value: string;
  status: 'pending' | 'completed';
  notes: string;
}

export interface Medication extends BaseEntity {
  name: string;
  category: string;
  quantity: number;
  price: number;
  expiryDate: string;
  supplierId: number;
}

export interface Supplier extends BaseEntity {
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
}

export interface Stock extends BaseEntity {
  medicationId: number;
  quantity: number;
  minThreshold: number;
  location: string;
}

export interface Invoice extends BaseEntity {
  patientId: number;
  date: string;
  amount: number;
  status: 'unpaid' | 'paid' | 'partial';
  insuranceId?: number;
}

export interface Payment extends BaseEntity {
  invoiceId: number;
  date: string;
  amount: number;
  method: string;
}

export interface Insurance extends BaseEntity {
  name: string;
  coverage: number;
  phone: string;
  email: string;
}

export interface Service extends BaseEntity {
  name: string;
  description: string;
  icon: string;
}

export interface Specialty extends BaseEntity {
  name: string;
  description: string;
}

export interface Emergency extends BaseEntity {
  patientId: number;
  date: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  status: 'open' | 'treated' | 'transferred';
}

export interface Ambulance extends BaseEntity {
  plate: string;
  driver: string;
  phone: string;
  status: 'available' | 'on-mission' | 'maintenance';
}

export interface User extends BaseEntity {
  username: string;
  fullName: string;
  email: string;
  role: string;
  active: boolean;
}

export interface Role extends BaseEntity {
  name: string;
  description: string;
  permissions: string;
}

export interface ActivityLog extends BaseEntity {
  action: string;
  module: string;
  detail: string;
  user: string;
}
