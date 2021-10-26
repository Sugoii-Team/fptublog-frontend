import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";

BlogPopularSkeleton.propTypes = {
  length: PropTypes.number,
};

BlogPopularSkeleton.defaultProps = {
  length: 4,
};

function BlogPopularSkeleton({ length }) {
  return (
    <>
      {Array.from(new Array(length)).map((x, index) => (
        <li key={index}>
          <div className="grid grid-cols-3 my-6 overflow-hidden">
            <div className="col-span-1">
              <Skeleton variant="rectangular" width={100} height={80} />
            </div>
            <div className="col-span-2 ml-3 grid-rows-3 relative">
              <div className="text-sm row-span-2 absolute top-0 font-semibold hover:text-gray-400 transition duration-150">
                <Skeleton variant="text" width={180} height={20} />
                <Skeleton variant="text" width={130} height={20} />
              </div>
              <div className="text-xs uppercase text-gray-500 row-span-1 absolute bottom-0">
                <Skeleton variant="text" width={100} height={25} />
              </div>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}

export default BlogPopularSkeleton;
