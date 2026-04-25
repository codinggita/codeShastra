import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiArrowLeft, FiBookOpen, FiPlayCircle, FiClock } from 'react-icons/fi';
import { selectEnrolledCourses } from '@/store/slices/courseSlice';
import { selectUser } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';

const DashboardPage = () => {
  const navigate = useNavigate();
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const user = useSelector(selectUser);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Navigation */}
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 text-gray-500 hover:text-gray-900 bg-white rounded-full shadow-sm border border-gray-200 transition-all hover:shadow"
            aria-label="Go Back"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome back, {user?.name || 'Student'}!
            </h1>
            <p className="text-sm text-gray-500 mt-1">Here's an overview of your learning progress.</p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area (Enrolled Courses) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FiBookOpen className="text-primary" /> My Enrolled Courses
              </h2>
              <button 
                onClick={() => navigate(ROUTES.LABS)} 
                className="text-sm font-semibold text-primary hover:text-indigo-700"
              >
                Browse More
              </button>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center">
                <FiBookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled yet</h3>
                <p className="text-gray-500 mb-6">Start your learning journey by exploring our available courses.</p>
                <Button variant="primary" onClick={() => navigate(ROUTES.LABS)}>
                  Explore Courses
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col group relative overflow-hidden">
                    {/* Decorative background slice */}
                    <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full ${course.color} opacity-40 -z-10`}></div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{course.title}</h3>
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-4">
                      <FiClock className={course.iconColor} /> {course.duration}
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        0% Completed
                      </span>
                      <button className="text-primary hover:text-indigo-700 flex items-center gap-1 text-sm font-semibold transition-colors">
                        <FiPlayCircle size={18} /> Resume
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar / Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Learning Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Courses Completed</span>
                    <span className="font-bold text-gray-900">0</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Current Streak</span>
                    <span className="font-bold text-gray-900">1 Day</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FiPlayCircle size={80} />
              </div>
              <h3 className="font-bold text-blue-900 mb-2 relative z-10">Ready for a challenge?</h3>
              <p className="text-sm text-blue-700 mb-4 relative z-10">Test your skills in the interactive debugging lab.</p>
              <Button variant="primary" size="sm" onClick={() => navigate(ROUTES.DEBUGGING_LAB)} className="relative z-10 shadow-sm">
                Enter Lab
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
