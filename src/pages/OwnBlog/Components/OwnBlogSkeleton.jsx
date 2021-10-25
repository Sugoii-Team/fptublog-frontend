import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

OwnBlogSkeleton.propTypes = {
  length: PropTypes.number,
};

OwnBlogSkeleton.defaultProps = {
  length: 10,
};

function OwnBlogSkeleton({ length }) {
  return (
    <>
      {Array.from(new Array(length)).map((x, index) => (
        <tr key={index}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900 font-semibold ">
              <Skeleton variant="text" width={230} height={17} />
            </div>
            <div className="text-sm text-gray-900">
              <Skeleton variant="text" width={200} height={17} />
            </div>
          </td>
          <td className="px-6 py-4">
            <Skeleton variant="text" width={230} height={17} />
            <Skeleton variant="text" width={200} height={17} />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton variant="text" width={120} height={25} />
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <Skeleton variant="text" width={200} height={25} />
          </td>
          <td className="py-3 px-6 text-center">
            <div className="flex item-center justify-center cursor-pointer">
              {/* View Icon */}
              <Link
                to="#"
                className="w-4 mr-2 transform hover:text-green-500 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </Link>
              {/* Edit Icon */}
              <Link
                to="#"
                className="w-4 mr-2 transform hover:text-yellow-500 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </Link>
              {/* Delete Icon */}
              <button
                className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                disabled={true}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default OwnBlogSkeleton;
