import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { ProtectedRoute, PublicOnlyRoute } from './RouteGuards';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AuthLayout from '@/components/layout/AuthLayout';
import MainLayout from '@/components/layout/MainLayout';

const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const LoginPage = lazy(() => import('@/pages/Auth/LoginPage'));
const SignupPage = lazy(() => import('@/pages/Auth/SignupPage'));
const DebuggingLab = lazy(() => import('@/pages/Labs/DebuggingLab'));
// const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'));
// const LabsPage = lazy(() => import('@/pages/Labs/LabsPage'));
// const ProjectsPage = lazy(() => import('@/pages/Projects/ProjectsPage'));
// const ChallengesPage = lazy(() => import('@/pages/Challenges/ChallengesPage'));
// const MentorsPage = lazy(() => import('@/pages/Mentors/MentorsPage'));
// const ProfilePage = lazy(() => import('@/pages/Profile/ProfilePage'));

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
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          </Route>
        </Route>

        {/* Protected Routes — require authentication */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<div>Dashboard (Coming Soon)</div>} />
            <Route path={ROUTES.DEBUGGING_LAB} element={<DebuggingLab />} />
            <Route path={ROUTES.LABS} element={<div>Labs (Coming Soon)</div>} />
            <Route path={ROUTES.PROJECTS} element={<div>Projects (Coming Soon)</div>} />
            <Route path={ROUTES.CHALLENGES} element={<div>Challenges (Coming Soon)</div>} />
            <Route path={ROUTES.MENTORS} element={<div>Mentors (Coming Soon)</div>} />
            <Route path={ROUTES.PROFILE} element={<div>Profile (Coming Soon)</div>} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
