import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowLeft, FiClock, FiStar, FiCheck } from 'react-icons/fi';
import { enrollCourse, selectEnrolledCourses } from '@/store/slices/courseSlice';
import Button from '@/components/ui/Button';

// Dummy data for courses
const COURSES_DATA = [
  {
    id: 'c1',
    title: 'Advanced React Patterns',
    description: 'Master higher-order components, render props, and custom hooks to build scalable applications.',
    level: 'Advanced',
    duration: '6 Weeks',
    rating: '4.9',
    color: 'bg-blue-50',
    iconColor: 'text-blue-500'
  },
  {
    id: 'c2',
    title: 'Data Structures in JavaScript',
    description: 'A deep dive into essential data structures: arrays, linked lists, trees, graphs, and their algorithms.',
    level: 'Intermediate',
    duration: '8 Weeks',
    rating: '4.8',
    color: 'bg-indigo-50',
    iconColor: 'text-indigo-500'
  },
  {
    id: 'c3',
    title: 'Fullstack Node.js Ecosystem',
    description: 'Build robust APIs using Express, MongoDB, and integrate them with modern frontend frameworks.',
    level: 'Intermediate',
    duration: '10 Weeks',
    rating: '4.7',
    color: 'bg-green-50',
    iconColor: 'text-green-500'
  },
  {
    id: 'c4',
    title: 'Web Performance Engineering',
    description: 'Learn techniques to optimize Core Web Vitals, lazy loading, and asset delivery for high-speed sites.',
    level: 'Advanced',
    duration: '4 Weeks',
    rating: '4.9',
    color: 'bg-orange-50',
    iconColor: 'text-orange-500'
  },
  {
    id: 'c5',
    title: 'Intro to Web3 & Smart Contracts',
    description: 'Understand blockchain fundamentals and write your first smart contracts using Solidity and Hardhat.',
    level: 'Beginner',
    duration: '6 Weeks',
    rating: '4.6',
    color: 'bg-purple-50',
    iconColor: 'text-purple-500'
  },
  {
    id: 'c6',
    title: 'System Design Interview Prep',
    description: 'Architect scalable, highly available systems to ace your technical interviews at top tech companies.',
    level: 'Advanced',
    duration: '12 Weeks',
    rating: '5.0',
    color: 'bg-rose-50',
    iconColor: 'text-rose-500'
  }
];

const CoursesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(selectEnrolledCourses);

  const handleEnroll = (course) => {
    dispatch(enrollCourse(course));
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.some(c => c.id === courseId);
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

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES_DATA.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col group relative overflow-hidden">
              
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
                
                {isEnrolled(course.id) ? (
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
          ))}
        </div>

      </div>
    </div>
  );
};

export default CoursesPage;
