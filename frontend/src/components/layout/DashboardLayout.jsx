import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiGrid, FiBookOpen, FiTerminal, FiFolder, FiTarget, FiBarChart2, FiUser, FiPlus, FiSettings, FiHelpCircle, FiArrowLeft } from 'react-icons/fi';
import { ROUTES } from '@/utils/constants';

const DashboardLayout = () => {
  const navigate = useNavigate();

  // Restore persisted theme on every app load
  useEffect(() => {
    const saved = localStorage.getItem('cs_theme') || 'light';
    const root = document.documentElement;
    if (saved === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else if (saved === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) root.setAttribute('data-theme', 'dark');
      else root.removeAttribute('data-theme');
    } else {
      root.removeAttribute('data-theme');
    }
  }, []);

  const navLinks = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: <FiGrid size={18} /> },
    { name: 'Courses', path: ROUTES.LABS, icon: <FiBookOpen size={18} /> },
    { name: 'Debugging Lab', path: ROUTES.DEBUGGING_LAB, icon: <FiTerminal size={18} /> },
    { name: 'Projects', path: ROUTES.PROJECTS, icon: <FiFolder size={18} /> },
    { name: 'Challenges', path: ROUTES.CHALLENGES, icon: <FiTarget size={18} /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <FiBarChart2 size={18} /> },
    { name: 'Profile', path: '/profile', icon: <FiUser size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Left Sidebar */}
      <aside className="w-64 bg-slate-50 border-r border-gray-200 flex flex-col shrink-0">
        
        {/* Brand Area */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold tracking-tight text-gray-900">CodeShastra</span>
          </div>
          <span className="text-xs font-medium text-gray-500">Student</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 space-y-4">
          <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg font-semibold text-sm transition-colors shadow-sm">
            <FiPlus size={16} /> New Project
          </button>
          
          <div className="space-y-1">
            <button onClick={() => navigate('/settings')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
              <FiSettings size={18} /> Settings
            </button>
            <button onClick={() => navigate('/support')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
              <FiHelpCircle size={18} /> Support
            </button>
            <button onClick={() => navigate(ROUTES.HOME)} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
              <FiArrowLeft size={18} /> Back to Home
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;
