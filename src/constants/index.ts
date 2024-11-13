export const API_URL = import.meta.env.VITE_API_URL || '';
export const DEV = import.meta.env.DEV;
export const ID = crypto?.randomUUID() || Date.now().toString();
