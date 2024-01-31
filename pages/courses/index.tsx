import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../components/course-card";
import CourseLoading from "../../components/courseLoading";
import { fetchCourses } from "../../redux/coursesSlice";
import { CourseTypes } from "../../types/course.types";

const Home = () => {
  const dispatch = useDispatch();

  const [activePage, setActivePage] = useState<number | string>(1);
  const [perPage, setPerPage] = useState<number>(12);

  const { courses, currentPage, pageSize, status, totalItems, totalPages } =
    useSelector((state: any) => state.coursesData);

  const handlePaginationClick = (page: number) => {
    setActivePage(page);
  };

  useEffect(() => {
    if (courses?.length == 0 || currentPage != activePage) {
      dispatch(fetchCourses({ activePage, perPage }));
    }
  }, [activePage]);

  return (
    <div>
      <Head>
        <title>Courses</title>
        <meta name="description" content="Courses list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container my-12 mx-auto">
        {status == "loading" ? (
          <div className="grid w-full gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-16">
            <CourseLoading perPage={perPage} />
          </div>
        ) : (
          <>
            {status == "failed" ? (
              <div className="flex justify-center items-center h-96 w-full mb-16 bg-red-100">
                <div
                  className=" text-center text-red-700  w-full px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold text-2xl mb-16">
                    Internal Server Error
                  </strong>
                  <span className="block text-lg">Failed to fetch data</span>
                </div>
              </div>
            ) : (
              <div className="grid w-full gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-16">
                {courses?.map((c: CourseTypes) => (
                  <CourseCard data={c} />
                ))}
              </div>
            )}
          </>
        )}

        {/* pagination */}
        {status != "loading" && status != "failed" && status == "success" && (
          <ul className="flex justify-center gap-1 text-xs font-medium">
            {[...Array(totalPages)]?.map((_, i: number) => (
              <li
                onClick={() => handlePaginationClick(i + 1)}
                className={`block h-8 w-8 rounded border border-gray-100  text-center leading-8 text-gray-900 cursor-pointer ${
                  activePage == i + 1
                    ? "hello bg-blue-800 text-white h-10 w-10"
                    : "bg-white"
                }`}
              >
                {i + 1}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default Home;
