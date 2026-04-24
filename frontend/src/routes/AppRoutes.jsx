import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { ProtectedRoute, PublicOnlyRoute } from './RouteGuards';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// ── Lazy-loaded Pages ──────────────────────────────────────────
const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const LoginPage = lazy(() => import('@/pages/Auth/LoginPage'));
const SignupPage = lazy(() => import('@/pages/Auth/SignupPage'));
const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'));
const LabsPage = lazy(() => import('@/pages/Labs/LabsPage'));
const ProjectsPage = lazy(() => import('@/pages/Projects/ProjectsPage'));
const ChallengesPage = lazy(() => import('@/pages/Challenges/ChallengesPage'));
const MentorsPage = lazy(() => import('@/pages/Mentors/MentorsPage'));
const ProfilePage = lazy(() => import('@/pages/Profile/ProfilePage'));

// ── Loading Fallback ───────────────────────────────────────────
const PageLoader = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    minHeight="100vh"
  >
    <CircularProgress color="primary" />
  </Box>
);

/**
 * AppRoutes — Central Route Configuration
 *
 * Route guards:
 *   ProtectedRoute  — requires authentication
 *   PublicOnlyRoute — redirects authenticated users away from auth pages
 */
function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.HOME} element={<HomePage />} />

        {/* Auth Routes — redirect if already logged in */}
        <Route element={<PublicOnlyRoute />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
        </Route>

        {/* Protected Routes — require authentication */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.LABS} element={<LabsPage />} />
          <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
          <Route path={ROUTES.CHALLENGES} element={<ChallengesPage />} />
          <Route path={ROUTES.MENTORS} element={<MentorsPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
