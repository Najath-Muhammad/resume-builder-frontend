/**
 * @file types/api.types.ts
 * @description Shared API response type definitions used across all services.
 */

// ---------------------------------------------------------------------------
// Standard API Response Envelope
// ---------------------------------------------------------------------------
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// ---------------------------------------------------------------------------
// Health Check
// ---------------------------------------------------------------------------
export interface HealthStatus {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  uptime: number;
  database: {
    status: 'connected' | 'disconnected';
    name: string;
  };
  environment: string;
  version: string;
}
