export interface CourseTypes {
  id: number;
  title: string;
  slug: string;
  creationDate: string;
  instructorName: string;
  coverImage: string;
  description: string;
  viewsCount?: number;
}

export interface CoursesStateTypes {
  courses: CourseTypes[];
  currentPage: number | null;
  pageSize: number | null;
  totalItems: number | null;
  totalPages: number | null;
  status: "idle" | "loading" | "success" | "failed";
}

export interface FetchCoursesResponse {
  courses: CourseTypes[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
