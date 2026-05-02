import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  FiMapPin, FiExternalLink, FiShare2, FiEdit2, FiZap,
  FiCheckCircle, FiCode, FiAward, FiTrendingUp, FiLogOut,
  FiCamera, FiChevronRight, FiStar, FiShield, FiLayers,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

// ── Badge component (same as Leaderboard) ────────────────────
const Badge = ({ tier }) => {
  const styles = {
    'GRAND ARTISAN': { color: 'from-violet-600 to-indigo-600', Icon: FiShield },
    'SPEED CODER':   { color: 'from-yellow-400 to-amber-500',  Icon: FiZap    },
    'SYS ARCHITECT': { color: 'from-blue-500 to-cyan-600',     Icon: FiLayers },
  };
  const s = styles[tier] || styles['SPEED CODER'];
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-full bg-gradient-to-r ${s.color} text-white shadow-sm`}>
      <s.Icon size={10} /> {tier}
    </span>
  );
};

// ── Mock skill & activity data ────────────────────────────────
const SKILLS = [
  { name: 'TypeScript',    pct: 95, color: 'bg-indigo-500' },
  { name: 'Go / Systems', pct: 72, color: 'bg-cyan-500'    },
  { name: 'UI Engineering',pct: 88, color: 'bg-purple-500' },
  { name: 'Node.js',      pct: 80, color: 'bg-green-500'   },
  { name: 'Python / ML',  pct: 61, color: 'bg-yellow-500'  },
];

const ACHIEVEMENTS = [
  { icon: '🏆', label: 'Top 5%',         earned: true  },
  { icon: '✅', label: 'Streak Master',   earned: true  },
  { icon: '🔥', label: '30-Day Flame',    earned: true  },
  { icon: '⭐', label: 'Star Submitter',  earned: false },
  { icon: '🎯', label: 'Bullseye',        earned: false },
  { icon: '+',  label: 'More',            earned: false },
];

const PROJECTS = [
  {
    id: 1,
    title: 'Quantum Flux UI',
    desc: 'Experimental React framework for high-frequency trading dashboards.',
    tags: ['REACT', 'RUST'],
    gradient: 'from-gray-900 via-indigo-950 to-black',
    icon: '⚛',
  },
  {
    id: 2,
    title: 'Helix Ledger',
    desc: 'Decentralized asset tracking with real-time visualization.',
    tags: ['SOLIDITY', 'THREE.JS'],
    gradient: 'from-gray-900 via-slate-800 to-gray-950',
    icon: '🔗',
  },
];

const RECENT_CHALLENGES = [
  { title: 'Algorithmic Efficiency: Trees', time: 'Completed 2 hours ago', xp: '+450 XP', icon: <FiCode size={16} className="text-indigo-400" />, bg: 'bg-indigo-100' },
  { title: 'Low-Level System Design',       time: 'Completed yesterday',   xp: '+1,200 XP', icon: <FiLayers size={16} className="text-purple-400" />, bg: 'bg-purple-100' },
  { title: 'Valid Palindrome II',           time: 'Completed 3 days ago',  xp: '+200 XP', icon: <FiCheckCircle size={16} className="text-green-400" />, bg: 'bg-green-100' },
  { title: 'Async Request Scheduler',       time: 'Completed last week',   xp: '+550 XP', icon: <FiZap size={16} className="text-yellow-500" />, bg: 'bg-yellow-100' },
];

const STATS = [
  { label: 'Performance\nIndex', value: '98.4%', sub: null, color: 'text-primary',    showChart: true },
  { label: 'Projects\nCompleted', value: '42',   sub: null, color: 'text-indigo-600', showChart: false },
  { label: 'Daily\nStreak',       value: '128',  sub: null, color: 'text-purple-600', showChart: false },
];

// ── Mini Bar Chart ────────────────────────────────────────────
const MiniBarChart = () => {
  const bars = [40, 55, 45, 65, 60, 75, 85, 90, 95, 100];
  return (
    <div className="flex items-end gap-1 mt-2 h-10">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${h}%`,
            background: i >= bars.length - 3
              ? 'linear-gradient(to top, #4f46e5, #818cf8)'
              : 'rgba(79,70,229,0.2)',
          }}
        />
      ))}
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────
export const ProfilePage = () => {
  const authUser  = useSelector(selectUser);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const [editing, setEditing] = useState(false);

  const name     = authUser?.name  || 'Coder';
  const email    = authUser?.email || 'user@example.com';
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  // Live XP & level computations
  const userXp = authUser?.xp || 0;
  const currentLevel = Math.floor(userXp / 1000) + 1;
  const xpInLevel = userXp % 1000;
  const xpProgressPct = Math.round((xpInLevel / 1000) * 100);
  const xpToNextLevel = 1000 - xpInLevel;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

      {/* ── Profile Header ────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start gap-6 mb-10">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-extrabold text-white shadow-lg">
            {initials}
          </div>
          <button
            onClick={() => toast('Avatar upload coming soon!', { icon: '📷' })}
            className="absolute -bottom-2 -right-2 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          >
            <FiCamera size={13} className="text-gray-500" />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{name}</h1>
            <Badge tier="SPEED CODER" />
          </div>
          <p className="text-gray-500 mb-3 max-w-md">
            Full-stack architect &amp; creative technologist. Obsessed with clean abstractions and pixel-perfect interfaces.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-medium">
            <span className="flex items-center gap-1.5"><FiMapPin size={13} /> India</span>
            <span className="flex items-center gap-1.5 text-primary hover:underline cursor-pointer"><FiExternalLink size={13} /> portfolio.dev</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400">{email}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-shrink-0 mt-2 sm:mt-0">
          <button
            onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Profile link copied!'); }}
            className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            <FiShare2 size={14} /> Share Profile
          </button>
          <button
            onClick={() => navigate('/profile/edit')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-md"
          >
            <FiEdit2 size={14} /> Edit Profile
          </button>
        </div>
      </div>

      {/* ── Stats Row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {/* Performance Index */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
          <p className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase mb-1">Performance Index</p>
          <p className="text-4xl font-extrabold text-indigo-700">98.4<span className="text-xl">%</span></p>
          <MiniBarChart />
        </div>

        {/* Projects */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-center">
          <p className="text-5xl font-extrabold text-indigo-600 mb-1">42</p>
          <p className="text-sm font-semibold text-gray-500">Projects Completed</p>
        </div>

        {/* Streak */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-center">
          <p className="text-5xl font-extrabold text-purple-600 mb-1">128</p>
          <p className="text-sm font-semibold text-gray-500">Daily Streak</p>
        </div>
      </div>

      {/* ── Main Content Grid ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left — Masterpieces + Recent Challenges */}
        <div className="lg:col-span-2 space-y-8">

          {/* Recent Masterpieces */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Masterpieces</h2>
              <button
                onClick={() => navigate('/projects')}
                className="text-sm font-semibold text-primary hover:underline"
              >
                View Archive
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECTS.map(p => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/projects/${p.id}`)}
                  className={`rounded-2xl overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow border border-gray-100`}
                >
                  {/* Dark image-style header */}
                  <div className={`h-36 bg-gradient-to-br ${p.gradient} flex items-center justify-center text-5xl relative overflow-hidden`}>
                    <span className="opacity-30 text-6xl group-hover:scale-110 transition-transform duration-500">
                      {p.icon}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="bg-white p-4">
                    <h3 className="font-bold text-gray-900 mb-1">{p.title}</h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map(t => (
                        <span key={t} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded tracking-wider">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Challenges */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Challenges</h2>
              <button
                onClick={() => navigate('/challenges')}
                className="text-sm font-semibold text-primary hover:underline"
              >
                View All
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
              {RECENT_CHALLENGES.map((c, i) => (
                <div
                  key={i}
                  onClick={() => navigate('/challenges')}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{c.title}</p>
                    <p className="text-xs text-gray-400">{c.time} · <span className="text-green-600 font-semibold">{c.xp}</span></p>
                  </div>
                  <FiChevronRight className="text-gray-300 flex-shrink-0" size={16} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Achievements + Live Skills + Danger Zone */}
        <div className="space-y-6">

          {/* Achievements */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements</h3>
            <div className="grid grid-cols-3 gap-3">
              {ACHIEVEMENTS.map((a, i) => (
                <div
                  key={i}
                  title={a.label}
                  className={`aspect-square rounded-xl flex items-center justify-center text-xl font-bold transition-transform hover:scale-105 cursor-pointer ${
                    a.earned
                      ? 'bg-indigo-50 border border-indigo-100'
                      : 'bg-gray-50 border border-dashed border-gray-200 opacity-40'
                  }`}
                >
                  {a.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Live Skills */}
          <div className="bg-gray-900 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-4">
              <FiTrendingUp size={15} className="text-indigo-400" />
              <h3 className="text-sm font-bold text-gray-100 uppercase tracking-wider">Live Skills</h3>
            </div>
            <div className="space-y-3">
              {SKILLS.map(s => (
                <div key={s.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300 font-semibold uppercase tracking-wider">{s.name}</span>
                    <span className="text-gray-400 font-bold">{s.pct}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* XP Summary */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100">
            <div className="flex items-center gap-2 mb-3">
              <FiAward className="text-indigo-500" size={18} />
              <h3 className="text-sm font-bold text-gray-900">Season XP</h3>
            </div>
            <p className="text-3xl font-extrabold text-indigo-700 mb-1">{userXp.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mb-3">of {((currentLevel) * 1000).toLocaleString()} XP to Level {currentLevel + 1}</p>
            <div className="w-full bg-white rounded-full h-2 border border-indigo-100">
              <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: xpProgressPct + '%' }} />
            </div>
            <p className="text-xs text-indigo-400 font-semibold mt-2">{xpToNextLevel.toLocaleString()} XP to Level {currentLevel + 1} · Level {currentLevel}</p>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 bg-red-50 hover:bg-red-100 font-semibold text-sm py-3 rounded-xl transition-colors"
          >
            <FiLogOut size={15} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
