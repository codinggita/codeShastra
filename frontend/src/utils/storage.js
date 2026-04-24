/**
 * storage.js — Utility helpers for localStorage & sessionStorage
 *
 * Provides safe wrappers that:
 * - Handle JSON serialization/deserialization automatically
 * - Catch storage access errors (private browsing, quota exceeded)
 * - Expose a clearAuthData() helper for clean logout
 */

// ── localStorage ──────────────────────────────────────────────
export const local = {
  get(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('[storage] localStorage.set failed:', err);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.warn('[storage] localStorage.remove failed:', err);
    }
  },
};

// ── sessionStorage ────────────────────────────────────────────
export const session = {
  get(key) {
    try {
      const raw = sessionStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  set(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('[storage] sessionStorage.set failed:', err);
    }
  },

  remove(key) {
    try {
      sessionStorage.removeItem(key);
    } catch (err) {
      console.warn('[storage] sessionStorage.remove failed:', err);
    }
  },
};

// ── Auth helpers ──────────────────────────────────────────────
const AUTH_TOKEN_KEY = 'cs_auth_token';
const AUTH_USER_KEY = 'cs_auth_user';

export const getToken = () => local.get(AUTH_TOKEN_KEY);
export const setToken = token => local.set(AUTH_TOKEN_KEY, token);
export const getUser = () => local.get(AUTH_USER_KEY);
export const setUser = user => local.set(AUTH_USER_KEY, user);

/** Wipes all auth-related data from storage on logout */
export const clearAuthData = () => {
  local.remove(AUTH_TOKEN_KEY);
  local.remove(AUTH_USER_KEY);
};
