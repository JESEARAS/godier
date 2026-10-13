import { type ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';

export function StatCard({
  icon: Icon, label, value, trend, color = 'primary',
}: { icon: LucideIcon; label: string; value: ReactNode; trend?: string; color?: 'primary' | 'health' | 'warning' | 'error' | 'accent' }) {
  const map = {
    primary: 'bg-primary-50 text-primary-600 dark:bg-primary-600/15 dark:text-primary-400',
    health: 'bg-health-50 text-health-600 dark:bg-health-600/15 dark:text-health-400',
    warning: 'bg-warning-50 text-warning-600 dark:bg-warning-600/15 dark:text-warning-400',
    error: 'bg-error-50 text-error-600 dark:bg-error-600/15 dark:text-error-400',
    accent: 'bg-accent-50 text-accent-600 dark:bg-accent-600/15 dark:text-accent-400',
  };
  return (
    <div className="card card-hover p-5 flex items-center gap-4">
      <div className={`flex items-center justify-center w-14 h-14 rounded-2xl ${map[color]}`}>
        <Icon size={26} />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{label}</p>
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
        {trend && <p className="text-xs text-health-600 font-medium mt-0.5">{trend}</p>}
      </div>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, center }: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`mb-10 ${center ? 'text-center mx-auto max-w-2xl' : ''}`}>
      {eyebrow && <span className="badge bg-primary-50 text-primary-600 dark:bg-primary-600/15 dark:text-primary-400 mb-3">{eyebrow}</span>}
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-500 dark:text-slate-400 text-lg">{subtitle}</p>}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, message }: { icon: LucideIcon; title: string; message: string }) {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mb-4">
        <Icon size={30} />
      </div>
      <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 mt-1">{message}</p>
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100">{title}</h1>
        {subtitle && <p className="text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
