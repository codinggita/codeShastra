import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowLeft, FiClock, FiStar, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { enrollCourse, selectEnrolledCourses } from '@/store/slices/courseSlice';
import Button from '@/components/ui/Button';
import useFetch from '@/hooks/useFetch';
import Skeleton from '@/components/ui/Skeleton';

const CoursesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(selectEnrolledCourses);

  // Fetch labs from backend API
  const { data: courses, isLoading, error } = useFetch('/labs');

  const coursesList = courses || [];

  const handleEnroll = (course) => {
    dispatch(enrollCourse(course));
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.some(c => c.id === courseId || c._id === courseId);
  };

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
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Available Courses</h1>
            <p className="text-sm text-gray-500 mt-1">Enhance your skills with our industry-level curriculum.</p>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 text-center text-red-600 flex flex-col items-center">
            <FiAlertCircle size={32} className="mb-2 opacity-80" />
            <h2 className="text-lg font-bold">Failed to load courses</h2>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-[300px]">
                <div className="flex justify-between items-start mb-4">
                  <Skeleton className="w-20 h-6 rounded-full" />
                  <Skeleton className="w-12 h-6 rounded" />
                </div>
                <Skeleton className="w-3/4 h-7 mb-4" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-6" />
                <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
                  <Skeleton className="w-24 h-5" />
                  <Skeleton className="w-24 h-8 rounded-lg" />
                </div>
              </div>
            ))
          ) : (
            coursesList.map((course) => (
              <div key={course._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col group relative overflow-hidden">
                
                {/* Decorative Background blob */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${course.color} opacity-50 group-hover:scale-150 transition-transform duration-500 -z-10`}></div>

                {/* Badge & Rating */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${course.level === 'Beginner' ? 'bg-green-100 text-green-700' : course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                    {course.level}
                  </span>
                  <div className="flex items-center gap-1 text-sm font-semibold text-gray-700 bg-gray-50 px-2 py-1 rounded">
                    <FiStar className="text-yellow-400 fill-current" /> {course.rating}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-6 flex-1 leading-relaxed">
                  {course.description}
                </p>

                {/* Footer metadata & Action */}
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <FiClock className={course.iconColor} /> {course.duration}
                  </div>
                  
                  {isEnrolled(course._id) ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-green-500 text-green-600 hover:bg-green-50"
                      leftIcon={<FiCheck />}
                      disabled
                    >
                      Enrolled
                    </Button>
                  ) : (
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => handleEnroll(course)}
                      className="shadow-sm"
                    >
                      Enroll Now
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default CoursesPage;
