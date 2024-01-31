import React from "react";
import { CourseTypes } from "../../types/course.types";
import { AiOutlineEye } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

interface CourseCardProps {
  data: CourseTypes;
}

const CourseCard: React.FC<CourseCardProps> = ({ data }) => {
  function removeHtmlTags(str: string) {
    return str?.replace(/<[^>]*>?/gm, "");
  }
  const {
    id,
    title,
    slug,
    coverImage,
    creationDate,
    description,
    instructorName,
    viewsCount,
  } = data;
  return (
    <Link href={`/courses/${slug}`}>
      <div
        className="fadeFromTopAnimation course-card bg-white  rounded-lg shadow-lg dark:bg-gray-800 hover:shadow-2xl transition ease-in-out hover:transition-all cursor-pointer "
        key={id}
      >
        <div>
          <img
            className="card-image h-44 w-full object-cover rounded-t-lg"
            src={coverImage}
            alt={title}
          />
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-stone-600 line-clamp-1">
            {title}
          </h5>
          <p className="mb-5 font-normal text-sm text-gray-600  line-clamp-3  ">
            {removeHtmlTags(description)}
          </p>

          <div className="flex justify-between">
            <a className="inline-flex items-center font-bold text-sm text-zinc-800  hover:underline ">
              {instructorName}
            </a>
            <p className="flex items-center text-sm text-zinc-600">
              <AiOutlineEye />
              <span className="text-gray ml-1">{viewsCount}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
