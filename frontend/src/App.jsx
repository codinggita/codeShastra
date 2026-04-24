import { useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';

import AppRoutes from '@/routes/AppRoutes';
import { createMuiTheme } from '@/theme/muiTheme';

/**
 * Root Application Component
 * - Reads theme mode from Redux uiSlice
 * - Applies MUI ThemeProvider dynamically (light/dark)
 * - Syncs data-theme attribute on <html> for CSS custom properties
 * - Renders the full route tree via AppRoutes
 */
function App() {
  const themeMode = useSelector(state => state.ui.theme);
  const muiTheme = createMuiTheme(themeMode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AppRoutes />
    </MuiThemeProvider>
  );
}

export default App;
