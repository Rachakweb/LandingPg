import React from 'react';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  const typeConfig = {
    success: {
      border: 'border-emerald-500/50 text-emerald-300',
      icon: <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
    },
    error: {
      border: 'border-rose-500/50 text-rose-300',
      icon: <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
    },
    info: {
      border: 'border-amber-500/50 text-amber-300',
      icon: <Info className="w-4 h-4 shrink-0 text-amber-400" />
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none">
      {toasts.map((toast) => {
        const config = typeConfig[toast.type] || typeConfig.info;
        return (
          <div
            key={toast.id}
            onClick={() => onDismiss && onDismiss(toast.id)}
            className={`pointer-events-auto flex items-center space-x-3 px-5 py-3.5 rounded-xl border bg-slate-900/90 backdrop-blur-xl shadow-2xl text-xs md:text-sm font-medium transition-all duration-300 animate-bounce-in cursor-pointer hover:opacity-90 ${config.border}`}
          >
            {config.icon}
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}

