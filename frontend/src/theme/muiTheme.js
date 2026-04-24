import { createTheme } from '@mui/material/styles';

/**
 * CodeShastra MUI Theme
 * Maps CSS design tokens to MUI's theme system.
 * Call createMuiTheme('light') or createMuiTheme('dark') based on Redux ui.theme.
 */
export const createMuiTheme = (mode = 'light') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#4f46e5',
        light: '#818cf8',
        dark: '#3730a3',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#0ea5e9',
        contrastText: '#ffffff',
      },
      error: { main: '#ef4444' },
      warning: { main: '#f59e0b' },
      success: { main: '#22c55e' },
      info: { main: '#3b82f6' },
      background: {
        default: isDark ? '#0f172a' : '#f8fafc',
        paper: isDark ? '#1e293b' : '#ffffff',
      },
      text: {
        primary: isDark ? '#f1f5f9' : '#0f172a',
        secondary: isDark ? '#94a3b8' : '#475569',
        disabled: isDark ? '#475569' : '#94a3b8',
      },
      divider: isDark ? '#334155' : '#e2e8f0',
    },

    typography: {
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      h1: { fontWeight: 800, letterSpacing: '-0.025em' },
      h2: { fontWeight: 700, letterSpacing: '-0.02em' },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { fontWeight: 600, textTransform: 'none' },
      body1: { lineHeight: 1.6 },
      body2: { lineHeight: 1.5 },
    },

    shape: { borderRadius: 8 },

    shadows: [
      'none',
      '0 1px 2px rgba(0,0,0,0.05)',
      '0 4px 6px -1px rgba(0,0,0,0.1)',
      '0 10px 15px -3px rgba(0,0,0,0.1)',
      ...Array(21).fill('none'),
    ],

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 24px',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined', size: 'small' },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              backgroundColor: isDark ? '#1e293b' : '#f8fafc',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: isDark
              ? '0 4px 6px rgba(0,0,0,0.4)'
              : '0 4px 6px rgba(0,0,0,0.06)',
            border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
          },
        },
      },
      MuiChip: {
        styleOverrides: { root: { borderRadius: 6, fontWeight: 500 } },
      },
    },
  });
};
