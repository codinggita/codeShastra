import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { ProtectedRoute, PublicOnlyRoute } from './RouteGuards';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AuthLayout from '@/components/layout/AuthLayout';
import MainLayout from '@/components/layout/MainLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';

const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const LoginPage = lazy(() => import('@/pages/Auth/LoginPage'));
const SignupPage = lazy(() => import('@/pages/Auth/SignupPage'));
const DebuggingLab = lazy(() => import('@/pages/Labs/DebuggingLab'));
const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'));
const CoursesPage = lazy(() => import('@/pages/Labs/CoursesPage'));
const ProjectsPage = lazy(() => import('@/pages/Projects/ProjectsPage'));
const ProjectDetail = lazy(() => import('@/pages/Projects/ProjectDetail'));
// const ChallengesPage = lazy(() => import('@/pages/Challenges/ChallengesPage'));
const ChallengesPage = lazy(() => import('@/pages/Challenges/ChallengesPage'));
const ChallengeDetail = lazy(() => import('@/pages/Challenges/ChallengeDetail'));
const LeaderboardPage = lazy(() => import('@/pages/Leaderboard/LeaderboardPage'));
const ProfilePage = lazy(() => import('@/pages/Profile/ProfilePage'));
const EditProfilePage = lazy(() => import('@/pages/Profile/EditProfilePage'));
const SettingsPage = lazy(() => import('@/pages/Settings/SettingsPage'));

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
          
          {/* Global App Layout for authenticated users (Sidebar) */}
          <Route element={<DashboardLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.DEBUGGING_LAB} element={<DebuggingLab />} />
            <Route path={ROUTES.LABS} element={<CoursesPage />} />
            <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
            <Route path={`${ROUTES.PROJECTS}/:id`} element={<ProjectDetail />} />
            <Route path={ROUTES.CHALLENGES} element={<ChallengesPage />} />
            <Route path="/challenges/:id" element={<ChallengeDetail />} />
            <Route path={ROUTES.MENTORS} element={<div>Mentors (Coming Soon)</div>} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
