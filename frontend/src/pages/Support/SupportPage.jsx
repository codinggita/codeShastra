import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiSearch, FiChevronRight, FiChevronDown, FiChevronUp,
  FiMail, FiMessageCircle, FiBook, FiZap, FiUser,
  FiShield, FiAlertCircle, FiCheckCircle, FiExternalLink,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

// ── FAQ Data ──────────────────────────────────────────────────
const FAQS = [
  {
    q: 'How do I reset my password?',
    a: 'Go to Settings → Account → Change Password. Enter your current password and your new one. If you\'ve forgotten it, use the "Forgot Password" link on the login page.',
  },
  {
    q: 'Why can\'t I access my daily challenge?',
    a: 'Daily challenges reset at 00:00 UTC. If you\'re seeing an error, try clearing your cache or logging out and back in. If the issue persists, contact support.',
  },
  {
    q: 'How is XP calculated?',
    a: 'XP is awarded based on challenge difficulty (Easy: 150–250, Medium: 450–700, Hard: 950–1400 XP), project completion, daily streaks, and peer review contributions.',
  },
  {
    q: 'Can I delete a project I started?',
    a: 'Yes — navigate to the project, scroll to the bottom, and click "Archive Project". Full deletion will be available once backend APIs are integrated.',
  },
  {
    q: 'How do I connect my GitHub account?',
    a: 'Go to Settings → Account → Connected Accounts and click "Connect" next to GitHub. OAuth integration is coming in the next release.',
  },
  {
    q: 'What browsers are supported?',
    a: 'CodeShastra works best on Chrome 100+, Firefox 100+, Safari 15+, and Edge 100+. We recommend keeping your browser updated for the best experience.',
  },
];

// ── Help Category Cards ───────────────────────────────────────
const CATEGORIES = [
  {
    icon: FiBook,
    title: 'Getting Started',
    desc: 'New here? Learn the basics of CodeShastra — setting up your profile, earning XP, and completing your first challenge.',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    iconBg: 'bg-indigo-100',
    link: '/challenges',
  },
  {
    icon: FiUser,
    title: 'Account & Profile',
    desc: 'Manage your identity, update your name or email, change your password, or delete your account.',
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    iconBg: 'bg-purple-100',
    link: '/settings',
  },
  {
    icon: FiZap,
    title: 'Challenges & Projects',
    desc: 'Understand how challenges work, how XP is scored, and how to submit and get feedback on your projects.',
    color: 'bg-yellow-50 text-yellow-600 border-yellow-100',
    iconBg: 'bg-yellow-100',
    link: '/projects',
  },
  {
    icon: FiShield,
    title: 'Privacy & Security',
    desc: 'Control who sees your data, manage your leaderboard visibility, and learn about our security practices.',
    color: 'bg-green-50 text-green-600 border-green-100',
    iconBg: 'bg-green-100',
    link: '/settings',
  },
];

// ── Status Indicators ─────────────────────────────────────────
const STATUS = [
  { service: 'Authentication Service', ok: true  },
  { service: 'Challenge Engine',       ok: true  },
  { service: 'Leaderboard API',        ok: true  },
  { service: 'Notification Service',   ok: false },
];

// ── FAQ Item ──────────────────────────────────────────────────
const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${open ? 'border-indigo-200 shadow-sm' : 'border-gray-100'}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-bold text-gray-900 pr-4">{q}</span>
        {open ? <FiChevronUp className="text-indigo-500 flex-shrink-0" size={16} /> : <FiChevronDown className="text-gray-400 flex-shrink-0" size={16} />}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-gray-50">
          <p className="text-sm text-gray-600 leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────
export const SupportPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filteredFAQs = FAQS.filter(
    f => !query || f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

      {/* ── Hero Header ──────────────────────────────────────── */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-full mb-4">
          <FiMessageCircle size={12} /> Support Center
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">How can we help?</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">Search our knowledge base, browse categories, or reach out to our team directly.</p>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search for help… e.g. 'reset password', 'XP', 'delete account'"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* ── Category Cards ────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {CATEGORIES.map(cat => (
          <div
            key={cat.title}
            onClick={() => navigate(cat.link)}
            className={`${cat.color} border rounded-2xl p-5 cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5 group`}
          >
            <div className={`w-10 h-10 rounded-xl ${cat.iconBg} flex items-center justify-center mb-4`}>
              <cat.icon size={18} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1.5 text-sm">{cat.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">{cat.desc}</p>
            <span className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all">
              Learn more <FiChevronRight size={12} />
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Left: FAQ ──────────────────────────────────────── */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
            {query && <span className="text-xs text-gray-400 font-semibold">{filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''}</span>}
          </div>

          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
              <FiAlertCircle className="mx-auto text-gray-300 mb-3" size={36} />
              <p className="font-semibold text-gray-500">No results for "{query}"</p>
              <p className="text-sm text-gray-400 mt-1">Try different keywords or contact us below.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFAQs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
            </div>
          )}

          {/* Quick links */}
          <div className="mt-8 p-5 bg-indigo-50 rounded-2xl border border-indigo-100">
            <p className="text-sm font-bold text-indigo-800 mb-3 flex items-center gap-2"><FiExternalLink size={14} /> Quick Links</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'View your profile', to: '/profile' },
                { label: 'Edit profile details', to: '/profile/edit' },
                { label: 'Change settings', to: '/settings' },
                { label: 'Browse challenges', to: '/challenges' },
                { label: 'View leaderboard', to: '/leaderboard' },
              ].map(link => (
                <button
                  key={link.to}
                  onClick={() => navigate(link.to)}
                  className="text-xs font-semibold text-indigo-700 bg-white border border-indigo-100 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Contact + Status ───────────────────────── */}
        <div className="space-y-5">

          {/* Contact Options */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-bold text-gray-900 mb-4">Still need help?</h3>
            <div className="space-y-3">
              <button
                onClick={() => toast.success('Opening mail client…')}
                className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 rounded-xl transition-all group text-left"
              >
                <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-200 transition-colors">
                  <FiMail className="text-indigo-600" size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Email Support</p>
                  <p className="text-xs text-gray-500">support@codeshastra.dev</p>
                </div>
                <FiChevronRight className="text-gray-300 group-hover:text-indigo-400 ml-auto transition-colors" size={16} />
              </button>

              <button
                onClick={() => toast('Live chat coming soon! 💬', { icon: '🕐' })}
                className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-purple-50 border border-gray-100 hover:border-purple-200 rounded-xl transition-all group text-left"
              >
                <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
                  <FiMessageCircle className="text-purple-600" size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Live Chat</p>
                  <p className="text-xs text-gray-500">Coming soon — avg. reply in 2 min</p>
                </div>
                <FiChevronRight className="text-gray-300 group-hover:text-purple-400 ml-auto transition-colors" size={16} />
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-gray-900">System Status</h3>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                MOSTLY OPERATIONAL
              </span>
            </div>
            <div className="space-y-2.5">
              {STATUS.map(s => (
                <div key={s.service} className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 font-medium">{s.service}</span>
                  <div className="flex items-center gap-1.5">
                    {s.ok
                      ? <><div className="w-2 h-2 rounded-full bg-green-500" /><span className="text-[10px] text-green-600 font-bold">Operational</span></>
                      : <><div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" /><span className="text-[10px] text-orange-500 font-bold">Degraded</span></>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Time Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <FiCheckCircle size={16} className="text-indigo-200" />
              <p className="text-xs font-bold text-indigo-200 uppercase tracking-wider">Our Commitment</p>
            </div>
            <p className="text-sm font-bold mb-1">Response within 24 hours</p>
            <p className="text-xs text-indigo-200 leading-relaxed">We take every report seriously and aim to resolve all issues within one business day.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SupportPage;
