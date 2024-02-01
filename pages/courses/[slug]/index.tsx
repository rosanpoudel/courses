import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CourseTypes } from "../../../types/course.types";
import { AiOutlineEye } from "react-icons/ai";
import Link from "next/link";
import Head from "next/head";
import { removeHtmlTags } from "../../../utils/helpers";

const CourseDetails = () => {
  const router = useRouter();
  const { query } = router;

  const slug = query?.slug;

  const [pageDetails, setPageDetails] = useState<CourseTypes | any>({});

  const { courses, currentPage, pageSize, status, totalItems, totalPages } =
    useSelector((state: any) => state.coursesData);

  console.log("page details:", pageDetails);

  useEffect(() => {
    if (slug) {
      const course = courses?.find(
        (course: CourseTypes) => course?.slug == slug
      );
      setPageDetails(course);
    }
  }, [slug]);

  return (
    <div>
      <Head>
        <title>{pageDetails?.title}</title>
        <meta name="description" content="Courses detail" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container my-12 mx-auto">
        {pageDetails?.title ? (
          <div className="grid w-full gap-8 sm:grid-cols-1  mb-8">
            <div>
              <div>
                <img
                  className="w-full object-cover rounded-t-lg h-96"
                  src={pageDetails?.coverImage}
                  alt={pageDetails?.title}
                />
              </div>
            </div>
            <div className="px-5">
              <div className="mb-5">
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-stone-600">
                    {pageDetails?.title}
                  </h5>
                  <p className="mb-5 font-normal text-xl text-gray-600">
                    {removeHtmlTags(pageDetails?.description)}
                  </p>

                  <div>
                    <p className="font-medium text-lg text-gray-800">
                      <span className="font-bold">Author:</span>{" "}
                      {pageDetails?.instructorName}
                    </p>

                    <p className="font-medium text-lg text-gray-800">
                      <span className="font-bold">Views:</span>{" "}
                      {pageDetails?.viewsCount}
                    </p>

                    <p className="font-medium text-lg text-gray-800">
                      <span className="font-bold">Created At:</span>{" "}
                      {pageDetails?.creationDate}
                    </p>
                  </div>
                </div>
              </div>

              <Link className="" href={`/courses?page=${currentPage}`}>
                <button className="w-48 bg-blue-500 text-white text-lg  py-1 px-4 rounded">
                  Back to courses
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <Link className="" href="/courses">
            <button className="w-48 bg-blue-500 text-white text-lg  py-1 px-4 rounded">
              Back to courses
            </button>
          </Link>
        )}
      </main>
    </div>
  );
};

export default CourseDetails;
