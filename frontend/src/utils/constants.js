export const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:8000/api';

export const STORAGE_KEYS = {
  tokens: 'plansync.tokens',
  theme: 'plansync.theme',
};

export const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];
