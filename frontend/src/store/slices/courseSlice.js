import { createSlice } from '@reduxjs/toolkit';

const loadEnrolledCourses = () => {
  try {
    const serialized = localStorage.getItem('cs_enrolled_courses');
    if (serialized === null) {
      return [];
    }
    return JSON.parse(serialized);
  } catch (err) {
    console.error('Could not load enrolled courses from localStorage', err);
    return [];
  }
};

const saveEnrolledCourses = (courses) => {
  try {
    const serialized = JSON.stringify(courses);
    localStorage.setItem('cs_enrolled_courses', serialized);
  } catch (err) {
    console.error('Could not save enrolled courses to localStorage', err);
  }
};

const initialState = {
  enrolledCourses: loadEnrolledCourses(),
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    enrollCourse: (state, action) => {
      // Prevent duplicates
      const courseExists = state.enrolledCourses.find(c => c.id === action.payload.id);
      if (!courseExists) {
        state.enrolledCourses.push(action.payload);
        saveEnrolledCourses(state.enrolledCourses);
      }
    },
    unenrollCourse: (state, action) => {
      state.enrolledCourses = state.enrolledCourses.filter(c => c.id !== action.payload);
      saveEnrolledCourses(state.enrolledCourses);
    }
  },
});

export const { enrollCourse, unenrollCourse } = courseSlice.actions;

export const selectEnrolledCourses = (state) => state.course.enrolledCourses;

export default courseSlice.reducer;
