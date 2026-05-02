import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '@/store/slices/authSlice';
import { clearAuthData } from '@/utils/storage';
import {
  FiAlertTriangle, FiAward, FiBox, FiCheckSquare,
  FiUsers, FiArrowLeft, FiChevronRight,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import authService from '@/services/authService';

// ── Consequence Card ───────────────────────────────────────────
const ConsequenceCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex flex-col gap-3">
    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
      <Icon className="text-indigo-600" size={16} />
    </div>
    <div>
      <p className="text-sm font-bold text-gray-900 mb-1">{title}</p>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

// ── Main Component ─────────────────────────────────────────────
export const DeleteAccountPage = () => {
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const authUser  = useSelector(selectUser);
  const [agreed, setAgreed]       = useState(false);
  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    if (!agreed) {
      toast.error('Please check the confirmation box before deleting.');
      return;
    }

    setConfirming(true);

    try {
      // 1. Delete user from backend database
      await authService.deleteAccount();

      // 2. Wipe all auth keys locally
      clearAuthData();
      localStorage.removeItem('cs_theme');

      // 3. Dispatch Redux logout
      dispatch(logout());

      toast.success('Account deleted. We\'re sorry to see you go.', { duration: 4000 });

      // 4. Redirect to register page
      setTimeout(() => navigate('/register'), 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete account.');
      setConfirming(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 tracking-wide mb-6">
        <button onClick={() => navigate('/settings')} className="hover:text-primary transition-colors">Settings</button>
        <FiChevronRight size={12} />
        <span className="text-gray-700">Security &amp; Privacy</span>
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate('/settings')}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary mb-8 transition-colors"
      >
        <FiArrowLeft size={15} /> Back to Settings
      </button>

      {/* Centered Card */}
      <div className="max-w-2xl mx-auto">

        {/* Warning Banner */}
        <div className="bg-red-50 border border-red-100 rounded-3xl p-10 text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
            <FiAlertTriangle className="text-red-500" size={28} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Delete your CodeShastra account?
          </h1>
          <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
            This action is permanent and cannot be undone. All your progress will be erased from the Master's Atelier forever.
          </p>
        </div>

        {/* Consequences Grid */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ConsequenceCard
              icon={FiAward}
              title="Loss of Status"
              desc="Your XP, badges, and competitive leaderboard rankings will be permanently purged."
            />
            <ConsequenceCard
              icon={FiBox}
              title="Project Deletion"
              desc="All your sandboxes, saved repositories, and deployed prototypes will be deleted."
            />
            <ConsequenceCard
              icon={FiCheckSquare}
              title="Certifications"
              desc="Your professional mastery certificates and shared learning history will no longer be verifiable."
            />
            <ConsequenceCard
              icon={FiUsers}
              title="Community Links"
              desc="Your posts, peer reviews, and mentorship history will be anonymized or removed."
            />
          </div>
        </div>

        {/* Confirm Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          {/* Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer mb-6 group">
            <div
              onClick={() => setAgreed(a => !a)}
              className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                agreed ? 'bg-red-600 border-red-600' : 'border-gray-300 group-hover:border-red-400'
              }`}
            >
              {agreed && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <span className="text-sm text-gray-600 leading-relaxed">
              I understand that this action is irreversible and I agree to the permanent deletion of my data, progress, and professional records within CodeShastra.
            </span>
          </label>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleDelete}
              disabled={confirming}
              className={`w-full sm:flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-2xl transition-colors shadow-md text-sm`}
            >
              <FiAlertTriangle size={15} />
              {confirming ? 'Deleting...' : 'Delete My Account'}
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="w-full sm:w-auto text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors px-6 py-3.5"
            >
              Cancel
            </button>
          </div>

          {/* Soft alternative */}
          <p className="text-xs text-center text-gray-400 mt-5">
            Need a temporary break?{' '}
            <button
              onClick={() => { toast('Account deactivation coming with backend integration.', { icon: '⏸️' }); }}
              className="text-primary hover:underline font-semibold"
            >
              Consider deactivating instead.
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPage;
