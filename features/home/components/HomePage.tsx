'use client';

import { useEffect, useState } from 'react';
import HealthService from '@/services/health.service';
import type { HealthStatus } from '@/types/api.types';
import { APP_NAME } from '@/constants/app.constants';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatCard } from '@/components/ui/StatCard';

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function HomePage() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedAt, setCheckedAt] = useState<Date | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await HealthService.getHealth();
      setHealth(data);
      setCheckedAt(new Date());
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to reach backend';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      {/* Gradient background orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-400 uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Phase 1 — Project Setup
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            {APP_NAME}
          </h1>
          <p className="text-slate-400 text-sm">
            Backend connectivity check — confirms the API and MongoDB are reachable.
          </p>
        </div>

        {/* Health card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-md space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-200">
              GET&nbsp;
              <span className="font-mono text-indigo-400">
                {process.env.NEXT_PUBLIC_API_URL}/health
              </span>
            </h2>
            <button
              onClick={fetchHealth}
              disabled={loading}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Checking…' : '↺ Refresh'}
            </button>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="space-y-3 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded-xl bg-slate-800/60"
                />
              ))}
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4">
              <p className="text-sm font-semibold text-rose-400 mb-1">
                ⚠ Could not reach the backend
              </p>
              <p className="text-xs text-rose-300/70 font-mono">{error}</p>
              <p className="mt-3 text-xs text-slate-400">
                Ensure the NestJS server is running on{' '}
                <code className="text-slate-300">
                  {process.env.NEXT_PUBLIC_API_URL}
                </code>
              </p>
            </div>
          )}

          {/* Success state */}
          {!loading && health && (
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="API Status"
                badge={<StatusBadge status={health.status} />}
              />
              <StatCard
                label="Database"
                badge={<StatusBadge status={health.database.status} />}
              />
              <StatCard label="Environment" value={health.environment} />
              <StatCard label="Version" value={health.version} />
              <StatCard
                label="Uptime"
                value={`${Math.floor(health.uptime)}s`}
              />
              <StatCard label="DB Name" value={health.database.name} />
              <div className="col-span-2">
                <StatCard
                  label="Server Timestamp"
                  value={new Date(health.timestamp).toLocaleString()}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer note */}
        {checkedAt && (
          <p className="text-center text-xs text-slate-600">
            Last checked: {checkedAt.toLocaleTimeString()}
          </p>
        )}
      </div>
    </main>
  );
}
