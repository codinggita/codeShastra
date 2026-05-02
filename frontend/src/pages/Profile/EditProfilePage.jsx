import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateUser } from '@/store/slices/authSlice';
import {
  FiArrowLeft, FiCamera, FiMapPin, FiGlobe, FiGithub,
  FiEye, FiMail, FiZap, FiCheckCircle, FiAlertCircle,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const SPECIALIZATIONS = ['Full Stack Engineering', 'Frontend Engineering', 'Backend Engineering', 'DevOps / Cloud', 'Machine Learning', 'System Design', 'Mobile Development'];
const LANGUAGES       = ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java', 'C++', 'Kotlin'];

// ── Toggle Switch ─────────────────────────────────────────────
const Toggle = ({ enabled, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className={`relative inline-flex w-10 h-5 rounded-full transition-colors focus:outline-none ${enabled ? 'bg-indigo-600' : 'bg-gray-200'}`}
  >
    <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform mt-0.5 ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
  </button>
);

// ── Field Component ───────────────────────────────────────────
const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />}
    <input
      className={`w-full border border-gray-200 rounded-xl py-2.5 text-sm text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition-colors bg-white placeholder:text-gray-400 ${Icon ? 'pl-9 pr-3' : 'px-3'}`}
      {...props}
    />
  </div>
);

// ── Profile Preview Card ──────────────────────────────────────
const PreviewCard = ({ name, displayName, bio, location }) => {
  const initials = name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'CS';
  return (
    <div className="bg-gray-900 rounded-2xl p-5 text-white">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-extrabold flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-bold text-white">{name || 'Your Name'}</p>
          <p className="text-xs text-gray-400">{displayName || '@handle'}</p>
        </div>
      </div>
      {bio && (
        <p className="text-xs text-gray-400 mb-3 line-clamp-2 italic">"{bio.slice(0, 70)}{bio.length > 70 ? '...' : ''}"</p>
      )}
      <div className="flex flex-wrap gap-2">
        {location && (
          <span className="flex items-center gap-1 text-[10px] font-bold bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
            <FiMapPin size={9} /> {location.toUpperCase()}
          </span>
        )}
        <span className="flex items-center gap-1 text-[10px] font-bold bg-indigo-600/40 text-indigo-300 px-2 py-1 rounded-full">
          6 YOE
        </span>
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────
export const EditProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector(selectUser);

  const [form, setForm] = useState({
    name:          authUser?.name  || '',
    displayName:   authUser?.email?.split('@')[0] ? `@${authUser.email.split('@')[0]}` : '',
    bio:           'Architecting elegant solutions at the intersection of design and data. Senior Engineer based in the foggy peaks of the Pacific Northwest.',
    location:      'India',
    website:       '',
    specialization:'Full Stack Engineering',
    primaryLang:   'TypeScript',
    yearsExp:      '2',
    github:        '',
  });

  const [prefs, setPrefs] = useState({
    publicVisibility: true,
    weeklyDigest:     false,
    experiencePoints: true,
  });

  const profileStrength = (() => {
    const fields = [form.name, form.displayName, form.bio, form.location, form.website, form.github];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  })();

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));
  const togglePref = (key) => () => setPrefs(p => ({ ...p, [key]: !p[key] }));

  const handleSave = () => {
    // 1. Update Redux + cs_auth_user in localStorage
    dispatch(updateUser({ name: form.name }));

    // 2. Also update cs_mock_users so name persists after re-login
    try {
      const users = JSON.parse(localStorage.getItem('cs_mock_users') || '[]');
      const updated = users.map(u =>
        u.email === authUser?.email ? { ...u, name: form.name } : u
      );
      localStorage.setItem('cs_mock_users', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not update mock users:', e);
    }

    toast.success('Profile settings saved!');
    navigate('/profile');
  };

  const handleDiscard = () => {
    toast('Changes discarded.', { icon: '↩️' });
    navigate('/profile');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

      {/* Header */}
      <button onClick={() => navigate('/profile')} className="flex items-center text-sm font-semibold text-gray-500 hover:text-primary mb-6 transition-colors">
        <FiArrowLeft className="mr-2" /> Back to Profile
      </button>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-1">Edit Profile</h1>
      <p className="text-gray-500 mb-8">Manage your public identity and professional credentials in the Atelier.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Left: Form ──────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-8">

          {/* Public Profile */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-1 h-5 bg-indigo-600 rounded-full" />
              <h2 className="text-lg font-bold text-gray-900">Public Profile</h2>
            </div>

            {/* Avatar Upload */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-extrabold text-white">
                  {form.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'CS'}
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                  <FiCamera size={11} className="text-gray-500" />
                </div>
              </div>
              <div>
                <div className="flex gap-2 mb-1">
                  <button onClick={() => toast('File upload coming soon!', { icon: '📷' })} className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                    <FiCamera size={12} /> Update Photo
                  </button>
                  <button onClick={() => toast('Photo removed', { icon: '🗑️' })} className="text-xs font-semibold border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                    Remove
                  </button>
                </div>
                <p className="text-xs text-gray-400">JPG, GIF or PNG. Max size of 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Field label="Full Name">
                <Input value={form.name} onChange={set('name')} placeholder="Your full name" />
              </Field>
              <Field label="Display Name">
                <Input value={form.displayName} onChange={set('displayName')} placeholder="@handle" />
              </Field>
            </div>

            <Field label="Bio">
              <textarea
                value={form.bio}
                onChange={set('bio')}
                rows={3}
                placeholder="Tell the Atelier who you are..."
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition-colors resize-none placeholder:text-gray-400"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Field label="Location">
                <Input icon={FiMapPin} value={form.location} onChange={set('location')} placeholder="City, Country" />
              </Field>
              <Field label="Website">
                <Input icon={FiGlobe} value={form.website} onChange={set('website')} placeholder="https://yoursite.dev" />
              </Field>
            </div>
          </section>

          {/* Professional Details */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-1 h-5 bg-indigo-600 rounded-full" />
              <h2 className="text-lg font-bold text-gray-900">Professional Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Field label="Specialization">
                <select value={form.specialization} onChange={set('specialization')} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-indigo-400 transition-colors appearance-none bg-white cursor-pointer">
                  {SPECIALIZATIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Primary Language">
                <select value={form.primaryLang} onChange={set('primaryLang')} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-indigo-400 transition-colors appearance-none bg-white cursor-pointer">
                  {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                </select>
              </Field>
              <Field label="Years of Experience">
                <Input type="number" min="0" max="40" value={form.yearsExp} onChange={set('yearsExp')} placeholder="e.g. 3" />
              </Field>
              <Field label="Github Username">
                <Input icon={FiGithub} value={form.github} onChange={set('github')} placeholder="github.com/username" />
              </Field>
            </div>
          </section>

          {/* Preferences */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-1 h-5 bg-indigo-600 rounded-full" />
              <h2 className="text-lg font-bold text-gray-900">Preferences</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { key: 'publicVisibility', Icon: FiEye,   title: 'Public Visibility',  desc: 'Allow others to see your profile and projects.' },
                { key: 'weeklyDigest',     Icon: FiMail,  title: 'Weekly Digest',       desc: 'Stay updated with challenges and top projects.' },
                { key: 'experiencePoints', Icon: FiZap,   title: 'Experience Points',   desc: 'Track XP gains on your public contribution graph.' },
              ].map(({ key, Icon, title, desc }) => (
                <div key={key} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center mb-3">
                    <Icon className="text-indigo-600" size={16} />
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-1">{title}</p>
                  <p className="text-xs text-gray-500 mb-3">{desc}</p>
                  <div className="flex items-center gap-2">
                    <Toggle enabled={prefs[key]} onToggle={togglePref(key)} />
                    <span className="text-xs font-semibold text-gray-500">{prefs[key] ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-2 pb-8">
            <button onClick={handleDiscard} className="text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">
              Discard changes
            </button>
            <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-md">
              Save Profile Settings
            </button>
          </div>
        </div>

        {/* ── Right: Preview + Strength + Tip ─────────────────── */}
        <div className="space-y-5">
          {/* Live Preview */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Live Preview</p>
            <PreviewCard name={form.name} displayName={form.displayName} bio={form.bio} location={form.location} />
          </div>

          {/* Profile Strength */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-gray-900">Profile Strength</p>
              <span className={`text-xs font-bold ${profileStrength >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>{profileStrength}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${profileStrength >= 80 ? 'bg-green-500' : profileStrength >= 50 ? 'bg-yellow-400' : 'bg-red-400'}`}
                style={{ width: `${profileStrength}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mb-2">
              {profileStrength < 100 ? 'Add your Github & Website to reach 100%.' : 'Your profile is complete!'}
            </p>
            {profileStrength < 100 && (
              <button onClick={() => document.querySelector('[placeholder="github.com/username"]')?.focus()} className="text-xs font-semibold text-primary hover:underline">
                Complete Profile →
              </button>
            )}
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Profile Checklist</p>
            <div className="space-y-2">
              {[
                { label: 'Add your name',        done: !!form.name         },
                { label: 'Write a bio',           done: !!form.bio          },
                { label: 'Set your location',     done: !!form.location     },
                { label: 'Add website URL',       done: !!form.website      },
                { label: 'Connect Github',        done: !!form.github       },
                { label: 'Choose specialization', done: !!form.specialization },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  {item.done
                    ? <FiCheckCircle className="text-green-500 flex-shrink-0" size={14} />
                    : <FiAlertCircle className="text-gray-300 flex-shrink-0" size={14} />
                  }
                  <span className={`text-xs font-medium ${item.done ? 'text-gray-500 line-through' : 'text-gray-700'}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Atelier Tip */}
          <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">⚡ Atelier Tip</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Professional developers with detailed bios and specialization tags receive <strong>3× more challenge invitations</strong> from mentors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
