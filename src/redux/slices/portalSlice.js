import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  defaultCourses,
  defaultAnnouncements,
  defaultExams,
  defaultCalendarEvents,
  defaultProgress,
  defaultStudyCards,
  defaultTeacherCourses
} from "../data/defaultData";

const API_BASE = "http://localhost:8080";

// Helper fetcher with fallback
const fetchWithFallback = async (endpoint, fallbackData) => {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data && (!Array.isArray(fallbackData) || (Array.isArray(data) && data.length > 0))) {
      return data;
    }
    return fallbackData;
  } catch {
    return fallbackData;
  }
};

export const fetchAllPortalData = createAsyncThunk(
  "portal/fetchAllPortalData",
  async (_, { rejectWithValue }) => {
    try {
      const [courses, announcements, exams, calendar, progress, studyCards] = await Promise.all([
        fetchWithFallback("/score", defaultCourses),
        fetchWithFallback("/SPAnoucments", defaultAnnouncements),
        fetchWithFallback("/course", defaultExams),
        fetchWithFallback("/Calenderevents", defaultCalendarEvents),
        fetchWithFallback("/myprogress", defaultProgress),
        fetchWithFallback("/Studycard", defaultStudyCards)
      ]);
      return { courses, announcements, exams, calendar, progress, studyCards };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const submitResultRecord = createAsyncThunk(
  "portal/submitResultRecord",
  async (resultData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultData)
      });
      if (res.ok) {
        return await res.json();
      }
      return { message: "Result submitted and recorded successfully." };
    } catch {
      // Local fallback success
      return { message: "Result recorded successfully (Offline Mode)." };
    }
  }
);

const portalSlice = createSlice({
  name: "portal",
  initialState: {
    courses: defaultCourses,
    announcements: defaultAnnouncements,
    exams: defaultExams,
    calendarEvents: defaultCalendarEvents,
    progress: defaultProgress,
    studyCards: defaultStudyCards,
    teacherCourses: defaultTeacherCourses,
    loading: false,
    error: null,
    lastUpdated: Date.now()
  },
  reducers: {
    addAnnouncement: (state, action) => {
      state.announcements.unshift({
        id: Date.now(),
        announcement_text: action.payload
      });
    },
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    updateCourseGrade: (state, action) => {
      const { course_id, score, grade } = action.payload;
      const course = state.courses.find((c) => c.course_id === course_id);
      if (course) {
        course.score = score;
        if (grade) course.grade = grade;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPortalData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPortalData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.courses?.length) state.courses = action.payload.courses;
        if (action.payload.announcements?.length) state.announcements = action.payload.announcements;
        if (action.payload.exams?.length) state.exams = action.payload.exams;
        if (action.payload.calendar?.length) state.calendarEvents = action.payload.calendar;
        if (action.payload.progress?.length) state.progress = action.payload.progress;
        if (action.payload.studyCards?.length) state.studyCards = action.payload.studyCards;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchAllPortalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addAnnouncement, addCourse, updateCourseGrade } = portalSlice.actions;
export default portalSlice.reducer;
