import axios from 'axios';

import { API_BASE_URL, STORAGE_KEYS } from './constants.js';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getStoredTokens = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.tokens);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('Unable to parse stored tokens', error);
    return null;
  }
};

const persistTokens = (tokens) => {
  if (!tokens) {
    localStorage.removeItem(STORAGE_KEYS.tokens);
  } else {
    localStorage.setItem(STORAGE_KEYS.tokens, JSON.stringify(tokens));
  }
};

api.interceptors.request.use((config) => {
  const tokens = getStoredTokens();
  if (tokens?.access) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest?._retry) {
      const storedTokens = getStoredTokens();
      if (storedTokens?.refresh) {
        try {
          const { data } = await axios.post(
            `${API_BASE_URL}/auth/refresh/`,
            { refresh: storedTokens.refresh },
            { headers: { 'Content-Type': 'application/json' } },
          );
          const updatedTokens = { ...storedTokens, access: data.access };
          persistTokens(updatedTokens);
          originalRequest._retry = true;
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return api(originalRequest);
        } catch (refreshError) {
          persistTokens(null);
        }
      }
    }

    return Promise.reject(error);
  },
);

export { getStoredTokens, persistTokens };
export default api;
