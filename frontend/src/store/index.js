import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import courseReducer from './slices/courseSlice';

/**
 * CodeShastra Redux Store
 * Centralizes all application state slices.
 * Redux DevTools is enabled automatically in development.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    course: courseReducer,
  },
  devTools: import.meta.env.DEV,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in these action types
        ignoredActions: ['auth/loginSuccess'],
      },
    }),
});
