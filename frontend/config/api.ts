/**
 * API configuration for Canvas 2 frontend
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  TIMEOUT: 5000,
  HEALTH_CHECK_INTERVAL: 30000,
} as const;
