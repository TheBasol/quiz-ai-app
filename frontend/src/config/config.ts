/**
 * Frontend API Configuration
 * Points to the ASP.NET Core backend
 */

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5284';

export const API_CONFIG = {
  baseURL: BACKEND_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Keep for backward compatibility if needed, but we now use the backend
export const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;