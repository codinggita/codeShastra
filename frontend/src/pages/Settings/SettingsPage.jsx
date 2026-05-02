import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  FiUser, FiBell, FiShield, FiMoon, FiSun, FiMonitor,
  FiTrash2, FiAlertTriangle, FiCheckCircle, FiChevronRight,
  FiLogOut, FiLock, FiMail, FiGlobe, FiSliders,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authService from '@/services/authService';

// ── Toggle ─────────────────────────────────────────────────────
const Toggle = ({ enabled, onToggle }) => (
  <button type="button" onClick={onToggle}
    className={`relative inline-flex w-10 h-5 rounded-full transition-colors ${enabled ? 'bg-indigo-600' : 'bg-gray-200'}`}>
    <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform mt-0.5 ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
  </button>
);

// ── Section Wrapper ────────────────────────────────────────────
const Section = ({ id, icon: Icon, title, desc, children }) => (
  <section id={id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-50">
      <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
        <Icon className="text-indigo-600" size={16} />
      </div>
      <div>
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        {desc && <p className="text-xs text-gray-400">{desc}</p>}
      </div>
    </div>
    <div className="p-6">{children}</div>
  </section>
);

// ── Row (toggle or chevron item) ───────────────────────────────
const SettingRow = ({ label, desc, action }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
    <div>
      <p className="text-sm font-semibold text-gray-800">{label}</p>
      {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
    </div>
    <div className="flex-shrink-0 ml-4">{action}</div>
  </div>
);

// ── Theme Option ───────────────────────────────────────────────
const ThemeBtn = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick}
    className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border-2 text-sm font-semibold transition-all ${active ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'}`}>
    <Icon size={20} />
    {label}
  </button>
);

// ── Sidebar Nav ────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'account',       label: 'Account',       Icon: FiUser    },
  { id: 'appearance',    label: 'Appearance',    Icon: FiMonitor },
  { id: 'notifications', label: 'Notifications', Icon: FiBell    },
  { id: 'privacy',       label: 'Privacy',       Icon: FiShield  },
  { id: 'danger',        label: 'Danger Zone',   Icon: FiAlertTriangle },
];

// ── Main Component ─────────────────────────────────────────────
export const SettingsPage = () => {
  const authUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Read saved theme from localStorage on mount
  const [theme, setTheme] = useState(() => localStorage.getItem('cs_theme') || 'light');

  const applyTheme = (mode) => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else if (mode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) root.setAttribute('data-theme', 'dark');
      else root.removeAttribute('data-theme');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem('cs_theme', mode);
    setTheme(mode);
  };

  const [activeNav, setActiveNav] = useState('account');
  const [language, setLanguage]   = useState('English');
  const [timezone, setTimezone]   = useState('Asia/Kolkata');
  const passwordForm = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string().min(8, 'New password must be at least 8 characters').required('New password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await authService.changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });
        resetForm();
        toast.success('Password updated successfully!');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to update password');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const scrollTo = (id) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const name     = authUser?.name  || 'User';
  const email    = authUser?.email || 'user@example.com';
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <Helmet>
        <title>Settings | CodeShastra</title>
        <meta name="description" content="Manage your account preferences, security, and privacy." />
      </Helmet>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-1">Settings</h1>
        <p className="text-gray-500">Manage your account preferences, security, and privacy.</p>
      </div>

      <div className="flex gap-8 items-start">

        {/* ── Sticky Sidebar ──────────────────────────────────── */}
        <aside className="w-52 flex-shrink-0 hidden lg:block sticky top-8">
          {/* Mini profile */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-extrabold text-white flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{name}</p>
              <p className="text-xs text-gray-400 truncate">{email}</p>
            </div>
          </div>

          <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {NAV_ITEMS.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-colors text-left border-b border-gray-50 last:border-0 ${activeNav === id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Icon size={15} className={activeNav === id ? 'text-indigo-600' : 'text-gray-400'} />
                {label}
              </button>
            ))}
          </nav>

          <button onClick={() => navigate('/profile')}
            className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors py-2">
            <FiUser size={14} /> View Profile
          </button>
        </aside>

        {/* ── Settings Panels ──────────────────────────────────── */}
        <div className="flex-1 space-y-6">

          {/* Account */}
          <Section id="account" icon={FiUser} title="Account" desc="Manage your identity and login credentials">
            {/* Account info card */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-extrabold text-white flex-shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900">{name}</p>
                <p className="text-sm text-gray-500">{email}</p>
              </div>
              <button onClick={() => navigate('/profile/edit')}
                className="text-sm font-semibold text-primary hover:underline flex-shrink-0 flex items-center gap-1">
                Edit <FiChevronRight size={14} />
              </button>
            </div>

            {/* Change Password */}
            <div>
              <p className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2"><FiLock size={14} /> Change Password</p>
              <form onSubmit={passwordForm.handleSubmit} className="space-y-3">
                {[
                  { id: 'currentPassword', label: 'Current Password' },
                  { id: 'newPassword',     label: 'New Password' },
                  { id: 'confirmPassword', label: 'Confirm Password' },
                ].map(({ id, label }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
                    <input
                      id={id}
                      type="password"
                      placeholder="••••••••"
                      className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 transition-colors ${
                        passwordForm.touched[id] && passwordForm.errors[id]
                          ? 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50'
                          : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-100 bg-white'
                      }`}
                      {...passwordForm.getFieldProps(id)}
                    />
                    {passwordForm.touched[id] && passwordForm.errors[id] && (
                      <p className="text-xs text-red-500 mt-1">{passwordForm.errors[id]}</p>
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={passwordForm.isSubmitting}
                  className="mt-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  {passwordForm.isSubmitting ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>

            {/* Connected accounts */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2"><FiGlobe size={14} /> Connected Accounts</p>
              {[
                { name: 'Google',  icon: '🔴', connected: false },
                { name: 'GitHub',  icon: '⚫', connected: false },
                { name: 'LinkedIn',icon: '🔵', connected: false },
              ].map(acc => (
                <div key={acc.name} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{acc.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{acc.name}</p>
                      <p className="text-xs text-gray-400">{acc.connected ? 'Connected' : 'Not connected'}</p>
                    </div>
                  </div>
                  <button onClick={() => toast(`${acc.name} integration coming soon!`, { icon: '🔗' })}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${acc.connected ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}>
                    {acc.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </Section>

          {/* Appearance */}
          <Section id="appearance" icon={FiSliders} title="Appearance" desc="Customize how CodeShastra looks for you">
            <div className="mb-6">
              <p className="text-sm font-bold text-gray-700 mb-3">Theme</p>
              <div className="flex gap-3">
                <ThemeBtn icon={FiSun}     label="Light"  active={theme === 'light'}  onClick={() => applyTheme('light')} />
                <ThemeBtn icon={FiMoon}    label="Dark"   active={theme === 'dark'}   onClick={() => applyTheme('dark')} />
                <ThemeBtn icon={FiMonitor} label="System" active={theme === 'system'} onClick={() => applyTheme('system')} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Language</label>
                <select value={language} onChange={e => setLanguage(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-400 appearance-none bg-white cursor-pointer">
                  {['English', 'Hindi', 'Spanish', 'French', 'German'].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Timezone</label>
                <select value={timezone} onChange={e => setTimezone(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-400 appearance-none bg-white cursor-pointer">
                  {['Asia/Kolkata', 'UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </Section>

          {/* Notifications */}
          <Section id="notifications" icon={FiBell} title="Notifications" desc="Choose what you want to be notified about">
            {[
              { key: 'challengeReminders', label: 'Challenge Reminders',  desc: 'Daily nudges to keep your solving streak alive.' },
              { key: 'weeklyDigest',       label: 'Weekly Digest',        desc: 'A curated summary of top challenges and projects every Monday.' },
              { key: 'mentorMessages',     label: 'Mentor Messages',      desc: 'Alerts when a mentor sends you feedback or invitations.' },
              { key: 'projectUpdates',     label: 'Project Updates',      desc: 'Notify me when collaborators push changes to shared projects.' },
              { key: 'leaderboardAlerts',  label: 'Leaderboard Shifts',   desc: 'Alert when someone overtakes you in the global rankings.' },
              { key: 'emailSummary',       label: 'Email Summary',        desc: 'Weekly performance report delivered to your inbox.' },
            ].map(({ key, label, desc }) => (
              <SettingRow key={key} label={label} desc={desc}
                action={<Toggle enabled={notifications[key]} onToggle={toggleNotif(key)} />} />
            ))}
          </Section>

          {/* Privacy */}
          <Section id="privacy" icon={FiShield} title="Privacy & Security" desc="Control who can see your data and activity">
            {[
              { key: 'publicProfile',     label: 'Public Profile',        desc: 'Allow anyone to view your profile page.' },
              { key: 'showOnLeaderboard', label: 'Show on Leaderboard',   desc: 'Appear in global and weekly leaderboard rankings.' },
              { key: 'showActivity',      label: 'Show Activity Feed',    desc: 'Let others see your recent challenges and projects.' },
              { key: 'showXP',            label: 'Show XP & Badges',      desc: 'Display your experience points and earned badges publicly.' },
            ].map(({ key, label, desc }) => (
              <SettingRow key={key} label={label} desc={desc}
                action={<Toggle enabled={privacy[key]} onToggle={togglePrivacy(key)} />} />
            ))}

            <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-2 mb-1">
                <FiCheckCircle className="text-indigo-500" size={14} />
                <p className="text-xs font-bold text-indigo-700">2-Factor Authentication</p>
              </div>
              <p className="text-xs text-gray-500 mb-3">Protect your account with an extra layer of security. Coming soon.</p>
              <button onClick={() => toast('2FA is coming soon!', { icon: '🔐' })}
                className="text-xs font-bold bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors">
                Enable 2FA
              </button>
            </div>
          </Section>

          {/* Danger Zone */}
          <Section id="danger" icon={FiAlertTriangle} title="Danger Zone" desc="Irreversible actions — proceed with caution">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-orange-200 bg-orange-50">
                <div>
                  <p className="text-sm font-bold text-orange-800">Sign Out Everywhere</p>
                  <p className="text-xs text-orange-600">Log out of all active sessions across all devices.</p>
                </div>
                <button onClick={() => { dispatch(logout()); navigate('/'); toast.success('Logged out from all devices.'); }}
                  className="flex items-center gap-1.5 text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex-shrink-0">
                  <FiLogOut size={12} /> Sign Out
                </button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-red-200 bg-red-50">
                <div>
                  <p className="text-sm font-bold text-red-800">Delete Account</p>
                  <p className="text-xs text-red-500">Permanently remove your account and all associated data. Cannot be undone.</p>
                </div>
                <button onClick={() => navigate('/settings/delete-account')}
                  className="flex items-center gap-1.5 text-xs font-bold bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex-shrink-0">
                  <FiTrash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
