/**
 * constants.js — App-wide Constants
 * Single source of truth for route paths, user roles, and app metadata.
 */

// ── Application Metadata ──────────────────────────────────────
export const APP_NAME = 'CodeShastra';
export const APP_TAGLINE = 'Bridging academia and real-world coding.';
export const APP_VERSION = '1.0.0';

// ── Client-side Routes ────────────────────────────────────────
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  LABS: '/labs',
  LAB_DETAIL: '/labs/:id',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/:id',
  CHALLENGES: '/challenges',
  CHALLENGE_ROOM: '/challenges/:id/room',
  MENTORS: '/mentors',
  PROFILE: '/profile',
};

// ── User Roles ────────────────────────────────────────────────
export const ROLES = {
  STUDENT: 'student',
  MENTOR: 'mentor',
  ADMIN: 'admin',
};

// ── API Base ──────────────────────────────────────────────────
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

// ── Local Storage Keys ────────────────────────────────────────
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'cs_auth_token',
  AUTH_USER: 'cs_auth_user',
  THEME: 'cs_theme',
};

// ── Pagination ────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 12;
