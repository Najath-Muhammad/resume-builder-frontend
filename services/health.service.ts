/**
 * @file services/health.service.ts
 * @description Health check service — calls GET /health on the backend.
 */

import apiClient from '@/lib/axios';
import type { ApiResponse, HealthStatus } from '@/types/api.types';

const HealthService = {
  /**
   * Fetch the backend health status.
   * Returns the full health payload including MongoDB connection info.
   */
  async getHealth(): Promise<HealthStatus> {
    const { data } = await apiClient.get<ApiResponse<HealthStatus>>('/health');
    return data.data;
  },
};

export default HealthService;
