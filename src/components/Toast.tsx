import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'warning' | 'error' | 'info';
interface Toast { id: string; type: ToastType; message: string; }

interface ToastCtx { notify: (message: string, type?: ToastType) => void; }

const Ctx = createContext<ToastCtx>({ notify: () => {} });
export const useToast = () => useContext(Ctx);

const styles: Record<ToastType, { icon: typeof Info; cls: string }> = {
  success: { icon: CheckCircle2, cls: 'bg-health-600' },
  warning: { icon: AlertTriangle, cls: 'bg-warning-500' },
  error: { icon: XCircle, cls: 'bg-error-600' },
  info: { icon: Info, cls: 'bg-primary-600' },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = (id: string) => setToasts((t) => t.filter((x) => x.id !== id));
  const notify = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => remove(id), 3800);
  }, []);

  return (
    <Ctx.Provider value={{ notify }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 no-print">
        {toasts.map((t) => {
          const { icon: Icon, cls } = styles[t.type];
          return (
            <div key={t.id}
              className="flex items-center gap-3 bg-white dark:bg-slate-800 shadow-card-hover rounded-xl pl-4 pr-2 py-3 min-w-[280px] max-w-sm animate-slide-up border border-slate-100 dark:border-slate-700">
              <span className={`flex items-center justify-center w-9 h-9 rounded-lg text-white ${cls}`}>
                <Icon size={18} />
              </span>
              <p className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">{t.message}</p>
              <button onClick={() => remove(t.id)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </Ctx.Provider>
  );
}
