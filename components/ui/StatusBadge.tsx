import React from 'react';

export function StatusBadge({ status }: { status: string }) {
  const isGood = status === 'ok' || status === 'connected';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
        isGood
          ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30'
          : 'bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/30'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full animate-pulse ${
          isGood ? 'bg-emerald-400' : 'bg-rose-400'
        }`}
      />
      {status}
    </span>
  );
}
