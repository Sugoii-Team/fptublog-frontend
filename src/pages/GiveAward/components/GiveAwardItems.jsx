import React, { useState } from "react";
import GiveAwardDialog from "./GiveAwardDialog";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

GiveAwardItems.propTypes = {
  allAward: PropTypes.array,
};

GiveAwardItems.defaultProps = {
  allAward: [],
};

function GiveAwardItems({ allAward, studentObj }) {
  const defaultAvatar = "http://placehold.it/70x70";
  const [onGivingAward, setOnGivingAward] = useState(false);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap grid grid-cols-6">
        <div className="col-span-1 flex mx-auto">
          <img
            src={
              studentObj.student.avatarUrl
                ? studentObj.student.avatarUrl
                : defaultAvatar
            }
            alt="avatar"
            className="min-w-minWForCommentAvatar min-h-minHForCommentAvatar max-w-maxWForCommentAvatar max-h-maxHForCommentAvatar my-auto ml-auto mr-3 rounded-full"
          />
        </div>
        <Link to={`/profile?${studentObj.student.id}`} className="col-span-5">
          <div className="text-sm text-gray-900 font-semibold">
            {studentObj.student.firstName + " " + studentObj.student.lastName}{" "}
            {/* Print out name of student */}
          </div>
          <div className="text-sm text-gray-900">
            {studentObj.student.description}
          </div>
        </Link>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex flex-row justify-center">
          <span className="font-bold mr-2">{studentObj.numberOfBlog}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
        {onGivingAward ? (
          <GiveAwardDialog
            isCancel={() => setOnGivingAward(false)}
            allAwardAvailable={allAward}
            forStudentId={studentObj.student.id}
          />
        ) : null}
      </td>
      <td
        className="py-3 px-6 text-center cursor-pointer"
        onClick={() => setOnGivingAward(true)}
      >
        <div className="flex flex-row justify-center items-center  transform hover:scale-105 transition ease-in-out duration-150">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text text-yellow-300 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <span className="text-xs uppercase font-semibold text-yellow-500">
            Give Award
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text text-yellow-300 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        </div>
      </td>
    </tr>
  );
}

export default GiveAwardItems;
