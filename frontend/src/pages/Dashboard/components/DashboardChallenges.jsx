import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTarget, FiClock, FiArrowLeft, FiCode, FiStar } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';

const DashboardChallenges = ({ enrolledCourses }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Selected Challenges</h2>
      
      <div className="flex overflow-x-auto gap-6 pb-4 snap-x">
        {/* Render dynamically from Redux if available, otherwise show placeholders */}
        {enrolledCourses?.length > 0 ? (
          enrolledCourses.map((course, idx) => {
            const isPremium = idx % 3 === 2;
            return (
            <div key={course.id} className={`shrink-0 w-80 snap-start rounded-2xl overflow-hidden shadow-sm transition-transform hover:-translate-y-1 ${isPremium ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-100 text-gray-900'}`}>
              
              {/* Card Header/Image mock */}
              <div className={`h-32 w-full relative ${isPremium ? 'bg-indigo-700' : 'bg-slate-900'}`}>
                {!isPremium && (
                  <img 
                    src={idx % 2 === 0 ? "/images/course-1.png" : "/images/course-2.png"} 
                    alt="Course cover" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-400 via-transparent to-transparent"></div>
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  {isPremium ? (
                    <span className="px-2 py-1 text-[10px] font-bold bg-white/20 text-white rounded backdrop-blur-sm flex items-center gap-1">
                      PREMIUM <FiStar />
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-[10px] font-bold bg-indigo-50 text-indigo-600 rounded">
                      {course.level?.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className={`flex justify-between items-center text-xs font-semibold mb-3 ${isPremium ? 'text-indigo-200' : 'text-gray-400'}`}>
                  <span className="flex items-center gap-1"><FiTarget /> Challenge</span>
                  <span className="flex items-center gap-1"><FiClock /> {course.duration}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 leading-tight">{course.title}</h3>
                <p className={`text-sm line-clamp-2 mb-6 ${isPremium ? 'text-indigo-100' : 'text-gray-500'}`}>
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className={`font-bold ${isPremium ? 'text-white' : 'text-indigo-600'}`}>+{Math.floor(Math.random() * 300) + 100} XP</span>
                  <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isPremium ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600'}`}>
                    <FiArrowLeft className="rotate-180" size={16} />
                  </button>
                </div>
              </div>
            </div>
          )})
        ) : (
          // Fallback placeholders if no courses enrolled
          <div className="bg-white w-full rounded-2xl border border-dashed border-gray-300 p-8 flex flex-col items-center justify-center text-center h-64">
            <FiCode className="text-gray-300 text-4xl mb-4" />
            <h3 className="text-lg font-bold text-gray-700 mb-2">No active challenges</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-md">You haven't selected any courses or challenges yet. Head over to the workspace to pick your next craft.</p>
            <Button variant="primary" size="sm" onClick={() => navigate(ROUTES.LABS)}>Browse Workspace</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardChallenges;
