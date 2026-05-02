import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiActivity, FiStar, FiClock, FiCode, FiZap, FiTarget, FiTrendingUp, FiFolder, FiCalendar, FiVideo, FiMoreHorizontal, FiUsers, FiArrowLeft } from 'react-icons/fi';
import { selectEnrolledCourses } from '@/store/slices/courseSlice';
import useAuth from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';
import Skeleton from '@/components/ui/Skeleton';
import { Helmet } from 'react-helmet-async';
import useFetch from '@/hooks/useFetch';
import DashboardChallenges from './components/DashboardChallenges';
import DashboardInsights from './components/DashboardInsights';

const WORKSPACE_COLORS = [
  'bg-green-50 text-green-600',
  'bg-blue-50 text-blue-600',
  'bg-cyan-50 text-cyan-600',
  'bg-purple-50 text-purple-600',
  'bg-rose-50 text-rose-600',
];

const timeAgo = (date) => {
  const secs = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (secs < 60) return 'Just now';
  if (secs < 3600) return Math.floor(secs / 60) + 'm ago';
  if (secs < 86400) return Math.floor(secs / 3600) + 'h ago';
  return Math.floor(secs / 86400) + 'd ago';
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const { user } = useAuth();

  // Fetch live projects for the Recent Workspaces section
  const { data: projectsData, isLoading: projectsLoading } = useFetch('/projects');

  // Data for contribution graph
  const contributionData = user?.stats?.contributionPulse?.length > 0 
    ? user?.stats?.contributionPulse 
    : Array.from({ length: 168 }).map(() => Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0);

  // Safe list — never null, capped to 3
  const recentProjects = (projectsData || []).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <Helmet>
        <title>Dashboard | CodeShastra</title>
        <meta name="description" content="Your CodeShastra learning overview and analytics." />
      </Helmet>

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header & Top Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-2">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#1a1f36] tracking-tight">CodeShastra Overview</h1>
              <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.name || 'Architect'}. Your craft awaits.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-indigo-50/50 flex flex-col items-center justify-center min-w-[100px]">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1"><FiZap className="text-indigo-400"/> STREAK</span>
              <span className="text-lg font-extrabold text-gray-900">{user?.stats?.streak || 0} days</span>
            </div>
            <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-indigo-50/50 flex flex-col items-center justify-center min-w-[100px]">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1"><FiStar className="text-indigo-400"/> TOTAL XP</span>
              <span className="text-lg font-extrabold text-gray-900">{(user?.xp || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Top Section: Competencies */}
        <div className="bg-indigo-50/40 rounded-2xl p-8 border border-indigo-100/50 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 w-full space-y-6">
            <h2 className="text-lg font-bold text-gray-800">Core Competencies</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-600 mb-2">
                  <span>Frontend Engineering</span>
                  <span className="text-indigo-600">{user?.stats?.competencies?.frontend || 0}%</span>
                </div>
                <div className="w-full bg-indigo-100 rounded-full h-1.5">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${user?.stats?.competencies?.frontend || 0}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-600 mb-2">
                  <span>Systems & Backend</span>
                  <span className="text-indigo-600">{user?.stats?.competencies?.backend || 0}%</span>
                </div>
                <div className="w-full bg-indigo-100 rounded-full h-1.5">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${user?.stats?.competencies?.backend || 0}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-600 mb-2">
                  <span>Optimization & Debugging</span>
                  <span className="text-indigo-600">{user?.stats?.competencies?.optimization || 0}%</span>
                </div>
                <div className="w-full bg-indigo-100 rounded-full h-1.5">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${user?.stats?.competencies?.optimization || 0}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-48 h-48 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0 relative overflow-hidden border border-white">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent"></div>
            <div className="w-32 h-32 rounded-full border-4 border-indigo-50 flex items-center justify-center relative z-10">
              <div className="w-24 h-24 rounded-full border-4 border-indigo-100 flex flex-col items-center justify-center bg-white shadow-inner">
                <span className="text-2xl font-black text-indigo-600 tracking-tight">Lvl {user?.level || 1}</span>
                <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mt-0.5">Architect</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contribution Pulse */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-gray-800">Contribution Pulse</h2>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                <div className="w-3 h-3 bg-indigo-200 rounded-sm"></div>
                <div className="w-3 h-3 bg-indigo-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-indigo-600 rounded-sm"></div>
                <div className="w-3 h-3 bg-indigo-900 rounded-sm"></div>
              </div>
              <span>More</span>
            </div>
          </div>
          
          <div className="flex gap-1.5 flex-wrap justify-end">
            {contributionData.map((level, i) => (
              <div 
                key={i} 
                className={`w-3.5 h-3.5 rounded-[3px] transition-colors hover:border hover:border-gray-400 ${
                  level === 0 ? 'bg-gray-100' :
                  level === 1 ? 'bg-indigo-200' :
                  level === 2 ? 'bg-indigo-400' :
                  level === 3 ? 'bg-indigo-600' : 'bg-indigo-900'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Selected Challenges / Courses */}
        <DashboardChallenges enrolledCourses={enrolledCourses} />

        {/* Bottom Grid: Insights & Leaderboard */}
        <DashboardInsights user={user} />

        {/* Recent Workspaces — live from API */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Workspaces</h2>
            <button onClick={() => navigate('/projects')} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">View All Projects</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col h-[140px]">
                  <div className="flex justify-between items-start mb-4">
                    <Skeleton className="w-10 h-10 rounded-xl" />
                    <Skeleton className="w-6 h-6 rounded-md" />
                  </div>
                  <Skeleton className="w-3/4 h-5 mb-4" />
                  <div className="flex items-center justify-between mt-auto">
                    <Skeleton className="w-20 h-4" />
                    <Skeleton className="w-20 h-4" />
                  </div>
                </div>
              ))
            ) : recentProjects.length === 0 ? (
              <div className="col-span-3 bg-white rounded-2xl border border-dashed border-gray-300 p-8 flex flex-col items-center justify-center text-center h-40">
                <FiFolder size={32} className="text-gray-300 mb-3" />
                <p className="text-sm font-semibold text-gray-500">No projects yet. Create your first project!</p>
              </div>
            ) : (
              recentProjects.map((project, idx) => (
                <div
                  key={project._id}
                  onClick={() => navigate('/projects/' + project._id)}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={'w-10 h-10 rounded-xl flex items-center justify-center ' + (WORKSPACE_COLORS[idx % WORKSPACE_COLORS.length])}>
                      <FiFolder size={20} />
                    </div>
                    <button onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiMoreHorizontal size={20} />
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                  <div className="flex items-center justify-between mt-4 text-xs font-medium text-gray-500">
                    <span className="flex items-center gap-1"><FiCode /> {project.tech || 'Code'}</span>
                    <span className="flex items-center gap-1"><FiClock /> {timeAgo(project.updatedAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Events & Mentorship */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-8 shadow-md text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1">Upcoming Events & Mentorship</h2>
              <p className="text-sm text-indigo-200">Your scheduled 1-on-1s and live workshops.</p>
            </div>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors flex items-center gap-2">
              <FiCalendar /> View Schedule
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-5 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 shrink-0 border border-indigo-400/30">
                <FiVideo size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base mb-1">System Architecture Review</h3>
                <p className="text-xs text-indigo-200 flex items-center gap-2">
                  <span>with Julian D.</span> • <span>Today, 2:00 PM</span>
                </p>
              </div>
              <div className="shrink-0 text-indigo-300">
                <FiArrowLeft className="rotate-180" size={18} />
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-5 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-300 shrink-0 border border-rose-400/30">
                <FiUsers size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base mb-1">Live: Advanced React Hooks</h3>
                <p className="text-xs text-indigo-200 flex items-center gap-2">
                  <span>Group Workshop</span> • <span>Tomorrow, 10:00 AM</span>
                </p>
              </div>
              <div className="shrink-0 text-indigo-300">
                <FiArrowLeft className="rotate-180" size={18} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
