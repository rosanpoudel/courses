import { CoursesStateTypes, CourseTypes } from "./course.types";

export interface RootState {
  coursesData: CoursesStateTypes;
}

export interface ReduxAction<T = any> {
  type: string;
  payload?: T;
}

export type CoursesPayload = {
  courses?: CourseTypes[];
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
  totalPages?: number;
  status?: "idle" | "loading" | "success" | "failed";
};

export type ReduxReducer<S = RootState, A = ReduxAction> = (
  state: S,
  action: A
) => S;
