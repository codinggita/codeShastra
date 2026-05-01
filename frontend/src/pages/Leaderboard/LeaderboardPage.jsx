import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/slices/authSlice';
import {
  FiSearch, FiClock, FiCalendar, FiAward, FiZap, FiTrendingUp,
  FiChevronRight, FiX, FiShield, FiStar, FiLayers, FiTarget, FiCpu,
} from 'react-icons/fi';

// ── Premium Badge Component ────────────────────────────────────
const Badge = ({ tier, small = false }) => {
  const styles = {
    'GRAND ARTISAN':    { Icon: FiShield,  bg: 'bg-gradient-to-r from-violet-600 to-indigo-600', text: 'text-white', dot: 'bg-violet-300' },
    'SILVER MASTER':    { Icon: FiStar,    bg: 'bg-gradient-to-r from-slate-400 to-gray-500',    text: 'text-white', dot: 'bg-gray-200'   },
    'BRONZE ELITE':     { Icon: FiAward,   bg: 'bg-gradient-to-r from-amber-500 to-orange-500',  text: 'text-white', dot: 'bg-amber-200'  },
    'SPEED CODER':      { Icon: FiZap,     bg: 'bg-gradient-to-r from-yellow-400 to-amber-500',  text: 'text-white', dot: 'bg-yellow-200' },
    'SYS ARCHITECT':    { Icon: FiLayers,  bg: 'bg-gradient-to-r from-blue-500 to-cyan-600',     text: 'text-white', dot: 'bg-blue-200'   },
    'ALGORITHM PRO':    { Icon: FiCpu,     bg: 'bg-gradient-to-r from-emerald-500 to-teal-600',  text: 'text-white', dot: 'bg-emerald-200'},
    'CHALLENGE KING':   { Icon: FiTarget,  bg: 'bg-gradient-to-r from-rose-500 to-pink-600',     text: 'text-white', dot: 'bg-rose-200'   },
  };
  const s = styles[tier] || styles['BRONZE ELITE'];
  const { Icon, bg, text, dot } = s;
  return (
    <span className={`inline-flex items-center gap-1 ${small ? 'px-1.5 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10px]'} font-bold rounded-full ${bg} ${text} shadow-sm`}>
      <Icon size={small ? 9 : 11} />
      {tier}
    </span>
  );
};

// ── Mock Data ──────────────────────────────────────────────────
const TOP_THREE = [
  { rank: 2, name: 'Marcus Chen',  handle: '@mcchen_dev', badge: 'SILVER MASTER',  points: 14820, avatar: 'https://i.pravatar.cc/150?u=20', specialty: 'Systems Engineer',   streak: 9,  challenges: 54, projects: 12 },
  { rank: 1, name: 'Elena Soroka', handle: '@elenacodes', badge: 'GRAND ARTISAN',  points: 16245, avatar: 'https://i.pravatar.cc/150?u=21', specialty: 'Algorithm Architect',streak: 22, challenges: 87, projects: 19 },
  { rank: 3, name: 'Sarah Jenkins',handle: '@sarah_js',   badge: 'BRONZE ELITE',   points: 12190, avatar: 'https://i.pravatar.cc/150?u=22', specialty: 'Frontend Specialist', streak: 6,  challenges: 41, projects: 8  },
];

const TABLE_ROWS = [
  { rank: 4,  name: "Liam O'Connor", handle: 'Senior Cloud Architect', avatar: 'https://i.pravatar.cc/150?u=30', badges: ['ALGORITHM PRO','SPEED CODER'], points: 11045, streak: 14, challenges: 63, projects: 15 },
  { rank: 5,  name: 'Maya Patel',    handle: 'Full Stack Engineer',    avatar: 'https://i.pravatar.cc/150?u=31', badges: ['SYS ARCHITECT'],               points: 10880, streak: 11, challenges: 58, projects: 13 },
  { rank: 6,  name: 'David Kim',     handle: 'Systems Specialist',     avatar: 'https://i.pravatar.cc/150?u=32', badges: ['SPEED CODER'],                  points: 9950,  streak: 5,  challenges: 44, projects: 9  },
  { rank: 7,  name: 'Riya Sharma',   handle: 'Backend Engineer',       avatar: 'https://i.pravatar.cc/150?u=33', badges: ['ALGORITHM PRO'],                points: 9610,  streak: 8,  challenges: 39, projects: 7  },
  { rank: 8,  name: 'Aiden Cole',    handle: 'DevOps Engineer',        avatar: 'https://i.pravatar.cc/150?u=34', badges: ['SYS ARCHITECT','SPEED CODER'],  points: 9210,  streak: 3,  challenges: 35, projects: 6  },
  { rank: 9,  name: 'Priya Nair',    handle: 'ML Engineer',            avatar: 'https://i.pravatar.cc/150?u=35', badges: ['CHALLENGE KING'],               points: 8890,  streak: 7,  challenges: 31, projects: 5  },
  { rank: 10, name: 'James Liu',     handle: 'React Specialist',       avatar: 'https://i.pravatar.cc/150?u=36', badges: ['ALGORITHM PRO'],                points: 8540,  streak: 4,  challenges: 28, projects: 4  },
];

// YOU is built dynamically from the logged-in user — see component below

const SEASON_STATS = [
  { label: 'Your Rank',  value: '#42',    Icon: FiAward,      bg: 'bg-yellow-50',  color: 'text-yellow-500' },
  { label: 'Total XP',   value: '4,285',  Icon: FiZap,        bg: 'bg-indigo-50',  color: 'text-primary'    },
  { label: 'Week Gain',  value: '+12',    Icon: FiTrendingUp, bg: 'bg-green-50',   color: 'text-green-500'  },
  { label: 'Challenges', value: '38',     Icon: FiCalendar,   bg: 'bg-purple-50',  color: 'text-purple-500' },
];

// ── Stats Drawer ───────────────────────────────────────────────
const StatsDrawer = ({ user, onClose }) => {
  if (!user) return null;
  const maxXP = Math.ceil(user.points / 5000) * 5000;
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        className="relative bg-white w-full max-w-sm h-full shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
            <FiX size={20} />
          </button>
          <div className="flex items-center gap-4 mb-4">
            {user.avatar
              ? <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full border-4 border-white/30" />
              : <div className="w-16 h-16 rounded-full bg-indigo-500 border-4 border-white/30 flex items-center justify-center text-xl font-bold">{user.initials || user.name[0]}</div>
            }
            <div>
              <h3 className="text-xl font-extrabold">{user.name}</h3>
              <p className="text-indigo-200 text-sm">{user.handle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {(user.badges || [user.badge]).filter(Boolean).map(b => <Badge key={b} tier={b} />)}
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 space-y-6">
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-gray-500">Season XP</span>
              <span className="text-primary font-bold">{user.points.toLocaleString()} / {maxXP.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                style={{ width: `${Math.min((user.points / maxXP) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Global Rank', value: `#${user.rank}` },
              { label: 'Streak',      value: `${user.streak}d` },
              { label: 'Challenges',  value: user.challenges },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <p className="text-xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3">Earned Badges</h4>
            <div className="flex flex-wrap gap-2">
              {(user.badges || [user.badge]).filter(Boolean).map(b => <Badge key={b} tier={b} />)}
            </div>
          </div>

          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-1">Specialty</p>
            <p className="font-bold text-gray-900">{user.specialty || user.handle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────
export const LeaderboardPage = () => {
  const authUser = useSelector(selectUser);
  const YOU = {
    rank: 42,
    name: authUser?.name || 'You',
    handle: 'Top 15% of all engineers',
    avatar: '',
    points: 4285,
    weeklyGain: '+12 ranks',
    initials: authUser?.name ? authUser.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'ME',
    streak: 14,
    challenges: 38,
    projects: 6,
    badges: ['SPEED CODER'],
  };
  const [search, setSearch]     = useState('');
  const [scope, setScope]       = useState('Global');
  const [period, setPeriod]     = useState('Weekly');
  const [selected, setSelected] = useState(null);

  const filtered = [...TOP_THREE.slice().sort((a,b) => a.rank - b.rank), ...TABLE_ROWS]
    .filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.handle.toLowerCase().includes(search.toLowerCase()));

  const tableFiltered = TABLE_ROWS.filter(r =>
    !search || r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <StatsDrawer user={selected} onClose={() => setSelected(null)} />

      {/* Breadcrumb */}
      <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-3">
        Network <span className="mx-1">›</span> Leaderboard
      </p>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Global Rankings</h1>
          <p className="text-gray-500 max-w-md">The elite league of engineers. Code. Compete. Conquer the weekly sprints to earn master-tier accolades.</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold text-sm px-4 py-2 rounded-xl">
            <FiCalendar size={14} /> Season 4
          </div>
          <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-600 font-semibold text-sm px-4 py-2 rounded-xl">
            <FiClock size={14} /> 2d 14h left
          </div>
        </div>
      </div>

      {/* Season Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {SEASON_STATS.map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-gray-100 flex items-center gap-3`}>
            <s.Icon className={s.color} size={22} />
            <div>
              <p className="text-xl font-extrabold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-10 items-end">
        {TOP_THREE.map(user => {
          const isFirst = user.rank === 1;
          return (
            <div
              key={user.rank}
              onClick={() => setSelected(user)}
              className={`relative rounded-2xl p-6 text-center flex flex-col items-center cursor-pointer transition-all hover:scale-[1.02] ${
                isFirst
                  ? 'bg-gradient-to-b from-indigo-600 to-indigo-800 text-white shadow-xl shadow-indigo-200 scale-105 z-10'
                  : 'bg-white border border-gray-100 shadow-sm text-gray-900 hover:shadow-md'
              }`}
            >
              <span className={`absolute top-4 right-4 text-sm font-extrabold ${isFirst ? 'text-indigo-200' : 'text-gray-400'}`}>#{user.rank}</span>
              {isFirst && <div className="mb-2"><FiAward className="text-yellow-300 mx-auto" size={28} /></div>}
              <img src={user.avatar} alt={user.name} className={`rounded-full object-cover mb-3 border-4 ${isFirst ? 'w-20 h-20 border-indigo-400' : 'w-16 h-16 border-gray-200'}`} />
              <h3 className={`font-extrabold mb-0.5 ${isFirst ? 'text-white text-xl' : 'text-gray-900 text-base'}`}>{user.name}</h3>
              <p className={`text-xs mb-3 ${isFirst ? 'text-indigo-200' : 'text-gray-400'}`}>{user.handle}</p>
              <Badge tier={user.badge} />
              <p className={`font-extrabold mt-3 ${isFirst ? 'text-3xl text-white' : 'text-2xl text-gray-900'}`}>
                {user.points.toLocaleString()}
                <span className={`text-xs font-semibold ml-1 ${isFirst ? 'text-indigo-200' : 'text-gray-400'}`}>PTS</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Search for engineers..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
        </div>
        {[['Global','Friends','Institution'], ['Weekly','Monthly','All Time']].map((opts, i) => (
          <select key={i} className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 focus:outline-none focus:border-primary appearance-none cursor-pointer">
            {opts.map(o => <option key={o}>{o}</option>)}
          </select>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 tracking-wider uppercase">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Engineer</div>
          <div className="col-span-4">Badges</div>
          <div className="col-span-3 text-right">Points</div>
        </div>

        {tableFiltered.map((row, idx) => (
          <div
            key={row.rank}
            onClick={() => setSelected(row)}
            className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-indigo-50/40 transition-colors cursor-pointer ${idx !== tableFiltered.length - 1 ? 'border-b border-gray-50' : ''}`}
          >
            <div className="col-span-1 text-sm font-bold text-gray-400">{String(row.rank).padStart(2, '0')}</div>
            <div className="col-span-4 flex items-center gap-3">
              <img src={row.avatar} alt={row.name} className="w-9 h-9 rounded-full flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-gray-900">{row.name}</p>
                <p className="text-xs text-gray-400">{row.handle}</p>
              </div>
            </div>
            <div className="col-span-4 flex flex-wrap gap-1">
              {row.badges.map(b => <Badge key={b} tier={b} small />)}
            </div>
            <div className="col-span-3 flex items-center justify-end gap-2">
              <span className="font-extrabold text-gray-900 text-sm">{row.points.toLocaleString()}</span>
              <FiChevronRight className="text-gray-300" size={14} />
            </div>
          </div>
        ))}

        {/* YOU row */}
        <div onClick={() => setSelected(YOU)} className="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-gray-900 text-white rounded-b-2xl cursor-pointer hover:bg-gray-800 transition-colors">
          <div className="col-span-1">
            <span className="text-[9px] font-bold bg-indigo-500 px-1.5 py-0.5 rounded text-white">YOU</span>
            <p className="text-sm font-bold text-gray-400 mt-0.5">{YOU.rank}</p>
          </div>
          <div className="col-span-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">{YOU.initials}</div>
            <div>
              <p className="text-sm font-bold text-white">{YOU.name}</p>
              <p className="text-xs text-gray-400">{YOU.handle}</p>
            </div>
          </div>
          <div className="col-span-4 flex flex-wrap gap-1">
            {YOU.badges.map(b => <Badge key={b} tier={b} small />)}
          </div>
          <div className="col-span-3 flex items-center justify-end gap-2">
            <div className="text-right">
              <p className="font-extrabold text-white">{YOU.points.toLocaleString()}</p>
              <p className="text-xs text-green-400 font-semibold">{YOU.weeklyGain}</p>
            </div>
            <FiChevronRight className="text-gray-500" size={14} />
          </div>
        </div>
      </div>

      {/* Bottom: Tips + Badge Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-1">How to climb faster</h3>
          <p className="text-sm text-gray-500 mb-5">Actions that earn you the most XP this season.</p>
          <div className="space-y-3">
            {[
              { action: 'Complete a Hard Challenge',   xp: '+1,000–1,400 XP', Icon: FiZap,     color: 'text-yellow-500', bg: 'bg-yellow-50' },
              { action: 'Finish a Full Project',       xp: '+500–1,200 XP',   Icon: FiLayers,  color: 'text-blue-500',   bg: 'bg-blue-50'   },
              { action: 'Daily Login Streak (7 days)', xp: '+250 XP bonus',   Icon: FiCalendar,color: 'text-purple-500', bg: 'bg-purple-50' },
              { action: 'Peer Review a PR',            xp: '+150 XP',         Icon: FiShield,  color: 'text-green-500',  bg: 'bg-green-50'  },
              { action: 'Complete Debugging Lab',      xp: '+300 XP',         Icon: FiCpu,     color: 'text-rose-500',   bg: 'bg-rose-50'   },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                  <item.Icon className={item.color} size={15} />
                </div>
                <p className="flex-1 text-sm font-semibold text-gray-800">{item.action}</p>
                <span className="text-sm font-bold text-primary whitespace-nowrap">{item.xp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Badge Showcase</h3>
          <p className="text-sm text-gray-500 mb-5">Earn these titles to flex on the leaderboard.</p>
          <div className="space-y-3">
            {[
              { tier: 'GRAND ARTISAN',  desc: 'Top 1% globally — Season 4',           locked: false },
              { tier: 'SILVER MASTER',  desc: 'Top 5% in your track',                  locked: false },
              { tier: 'BRONZE ELITE',   desc: 'Top 15% this week',                     locked: false },
              { tier: 'SPEED CODER',    desc: 'Solve 5 Hard challenges in one session', locked: true  },
              { tier: 'SYS ARCHITECT',  desc: 'Complete all System Design challenges',  locked: true  },
            ].map((b, i) => (
              <div key={i} className={`flex items-center gap-4 p-3 rounded-xl border ${b.locked ? 'opacity-50 bg-gray-50 border-dashed border-gray-200' : 'bg-gray-50 border-gray-100'}`}>
                <Badge tier={b.tier} />
                <p className="flex-1 text-xs text-gray-500">{b.desc}</p>
                {b.locked
                  ? <span className="text-xs text-gray-400 font-semibold flex-shrink-0">🔒 Locked</span>
                  : <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex-shrink-0">Earned</span>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
