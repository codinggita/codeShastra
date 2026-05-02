import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiZap, FiClock, FiAward, FiPlay, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import useFetch from '@/hooks/useFetch';
import Skeleton from '@/components/ui/Skeleton';

const difficultyStyle = (diff) => {
  switch (diff) {
    case 'EASY':   return 'bg-green-100 text-green-700';
    case 'MEDIUM': return 'bg-yellow-100 text-yellow-700';
    case 'HARD':   return 'bg-red-100 text-red-700';
    default:       return 'bg-gray-100 text-gray-600';
  }
};

export const ChallengeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Fetch from the live API we just built!
  const { data: challenge, isLoading, error } = useFetch(`/challenges/${id}`);

  // Fallback for fields not stored in DB (yet)
  const hints = challenge?.hints || [
    'Read the problem statement carefully and identify edge cases.',
    'Consider time and space complexity trade-offs.',
    'Start with a brute force solution, then optimize.'
  ];
  const timeLimit = challenge?.timeLimit || '45 min';

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="w-40 h-6 mb-6" />
        <Skeleton className="w-full h-40 rounded-2xl mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <FiAlertCircle size={48} className="mx-auto text-red-500 mb-4 opacity-50" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Challenge not found</h2>
        <p className="text-gray-500 mb-6">{error || "The challenge you are looking for doesn't exist."}</p>
        <button onClick={() => navigate('/challenges')} className="text-indigo-600 font-semibold hover:underline">
          Return to Challenges
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Back */}
      <button
        onClick={() => navigate('/challenges')}
        className="flex items-center text-sm font-semibold text-gray-500 hover:text-primary mb-6 transition-colors"
      >
        <FiArrowLeft className="mr-2" /> Back to Challenges
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6 border-t-4 border-t-indigo-600">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div>
            <span className={`text-[10px] font-bold px-2 py-1 rounded tracking-wider mr-3 ${difficultyStyle(challenge.difficulty)}`}>
              {challenge.difficulty}
            </span>
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-100 text-gray-600 tracking-wider">
              {challenge.track}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm font-semibold text-gray-500">
            <span className="flex items-center gap-1.5"><FiZap className="text-yellow-500" /> {challenge.xp} XP</span>
            <span className="flex items-center gap-1.5"><FiClock className="text-primary" /> {timeLimit}</span>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{challenge.title}</h1>
        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{challenge.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hints */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Hints</h3>
            <div className="space-y-3">
              {hints.map((hint, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                  <FiCheckCircle className="text-indigo-500 mt-0.5 flex-shrink-0" size={16} />
                  <span className="text-sm text-indigo-800 font-medium">{hint}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ready?</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate(`/challenges/${challenge._id}/room`)}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md"
              >
                <FiPlay size={15} /> Start Challenge
              </button>
              <button
                onClick={() => navigate('/leaderboard')}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors text-sm"
              >
                <FiAward size={15} /> View Leaderboard
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100 text-center">
            <FiZap className="text-yellow-500 mx-auto mb-2" size={28} />
            <p className="font-extrabold text-2xl text-gray-900">{challenge.xp} XP</p>
            <p className="text-xs text-gray-500 mt-1">Awarded on completion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
