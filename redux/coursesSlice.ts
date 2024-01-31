import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CoursesStateTypes,
  CourseTypes,
  FetchCoursesResponse,
} from "../types/course.types";

const initialState: CoursesStateTypes = {
  courses: [],
  currentPage: null,
  pageSize: null,
  totalItems: null,
  totalPages: null,
  status: "loading",
};

interface FetchCoursesParams {
  activePage: number;
  perPage: number;
}

export const fetchCourses: any = createAsyncThunk(
  "courses/fetchCourses",
  async ({ activePage, perPage }: FetchCoursesParams) => {
    try {
      const response = await fetch(
        `/api/courses?activePage=${activePage}&perPage=${perPage}`
      );
      const data = await response.json();

      const newData = await Promise.all(
        data?.courses?.map(async (course: CourseTypes) => {
          const viewsCount = await fetchCourseViewsCount(course?.id);
          return { ...course, viewsCount };
        }) || []
      );

      return { ...data, courses: newData } as FetchCoursesResponse;
    } catch (error: any) {
      console.log("Error while fetching courses:", error);
    }
  }
);

export const fetchCourseViewsCount = async (id: number | string) => {
  try {
    const response = await fetch(`/api/viewsCount?courseId=${id}`);
    const data = await response.json();

    return data?.viewsCount;
  } catch (error: any) {
    console.log("Error while fetching views count:", error);
    return 0;
  }
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload.courses;
        state.currentPage = action.payload.currentPage;
        state.pageSize = action.payload.pageSize;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.status = "success";
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default coursesSlice.reducer;
