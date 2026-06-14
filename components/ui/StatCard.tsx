import React from 'react';

export function StatCard({
  label,
  value,
  badge,
}: {
  label: string;
  value?: string;
  badge?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
      <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">
        {label}
      </p>
      {badge ?? (
        <p className="text-sm font-mono text-slate-200 break-all">{value ?? '—'}</p>
      )}
    </div>
  );
}
