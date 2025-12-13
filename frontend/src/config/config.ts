export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL;

export const API_CONFIG = {
  baseURL: BACKEND_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};
