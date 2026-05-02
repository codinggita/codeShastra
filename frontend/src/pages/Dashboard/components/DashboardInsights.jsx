import React from 'react';
import { FiClock, FiActivity, FiTrendingUp } from 'react-icons/fi';
import useFetch from '@/hooks/useFetch';

const DashboardInsights = ({ user }) => {
  const { data: leaderboardData, isLoading } = useFetch('/users/leaderboard');
  const topUsers = leaderboardData || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Session Insights */}
      <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/30 flex flex-col">
        <h2 className="text-base font-bold text-gray-800 mb-6">Session Insights</h2>
        
        <div className="space-y-6 flex-1">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-indigo-500 shrink-0">
              <FiClock />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Time on Craft</p>
              <p className="text-xl font-black text-gray-900">{user?.stats?.timeOnCraft || 0} hrs <span className="text-sm font-medium text-gray-500 normal-case tracking-normal">this week</span></p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-indigo-500 shrink-0">
              <FiActivity />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Success Rate</p>
              <p className="text-xl font-black text-gray-900">{user?.stats?.successRate || 100}% <span className="text-xs font-bold text-emerald-500 normal-case tracking-normal bg-emerald-50 px-1.5 py-0.5 rounded">+2.4% vs last mo</span></p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-indigo-500 shrink-0">
              <FiTrendingUp />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Code Complexity</p>
              <p className="text-xl font-black text-indigo-600">{user?.stats?.complexity || 'O(n)'} <span className="text-sm font-medium text-gray-500 normal-case tracking-normal text-gray-900">avg efficiency</span></p>
            </div>
          </div>
        </div>

        <button className="w-full mt-6 py-3 bg-indigo-100/50 hover:bg-indigo-100 text-indigo-700 font-bold text-sm rounded-xl transition-colors">
          View Detailed Analytics
        </button>
      </div>

      {/* Top Peer Performance */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-bold text-gray-800">Top Peer Performance</h2>
          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Full Leaderboard</button>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            <p className="text-sm text-gray-500">Loading leaderboard...</p>
          ) : topUsers.length === 0 ? (
            <p className="text-sm text-gray-500">No data available.</p>
          ) : (
            topUsers.map((peer, i) => {
              const isMe = peer._id === user?._id;
              return (
              <div key={peer._id || i} className={`flex items-center justify-between p-4 rounded-xl transition-colors ${isMe ? 'bg-indigo-50 border border-indigo-100/50' : 'bg-slate-50 hover:bg-slate-100 border border-transparent'}`}>
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-bold ${isMe ? 'text-indigo-600' : 'text-gray-400'}`}>0{i + 1}</span>
                  <img 
                    src={peer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(peer.name)}&background=${isMe ? '10b981' : '6366f1'}&color=fff`} 
                    alt={peer.name} 
                    className={`w-10 h-10 rounded-full object-cover shadow-sm border-2 ${isMe ? 'border-indigo-400' : 'border-white'}`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900">{peer.name}</span>
                      {isMe && <span className="text-[9px] font-bold uppercase tracking-wider bg-indigo-600 text-white px-1.5 py-0.5 rounded">You</span>}
                    </div>
                    <span className="text-xs text-gray-500">{peer.specialization || 'Developer'}</span>
                  </div>
                </div>
                <span className="font-extrabold text-sm text-gray-900">{(peer.xp || 0).toLocaleString()} XP</span>
              </div>
            )})
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardInsights;
