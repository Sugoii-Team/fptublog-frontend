import React from "react";
import PropTypes from "prop-types";
import { Box, Skeleton } from "@mui/material";

BlogListSkeleton.propTypes = {
  length: PropTypes.number,
};

BlogListSkeleton.defaultProps = {
  length: 4,
};

function BlogListSkeleton({ length }) {
  return (
    <div>
      <Box>
        <ul>
          {Array.from(new Array(length)).map((x, index) => (
            <li key={index}>
              <div className="grid grid-cols-3 mb-7">
                <div className="col-span-1">
                  <Skeleton variant="rectangular" width={240} height={208} />
                </div>
                <div className="col-span-2">
                  <Skeleton variant="text" width={480} height={25} />
                  <Skeleton variant="text" width={300} height={25} />
                  <Skeleton variant="text" width={200} height={23} />
                  <div className="mt-7"></div>
                  <Skeleton variant="text" width={500} height={18} />
                  <Skeleton variant="text" width={480} height={18} />
                  <Skeleton variant="text" width={490} height={18} />
                  <Skeleton variant="text" width={500} height={18} />
                  <Skeleton variant="text" width={490} height={18} />
                  <Skeleton variant="text" width={500} height={18} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Box>
    </div>
  );
}

export default BlogListSkeleton;
