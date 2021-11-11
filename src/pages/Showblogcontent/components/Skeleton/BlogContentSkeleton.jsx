import { Skeleton } from "@mui/material";
import React from "react";

function BlogContentSkeleton(props) {
  return (
    <div>
      <div className="mt-6 p-8 md:p-5 mx-10">
        {/* <!--About the author--> */}
        <div className="text-xs place-content-center mx-28 grid grid-cols-12">
          {/* <!--Image of the author--> */}
          <div className="col-span-1">
            <Skeleton variant="rectangular" width={16} height={16} />
          </div>
          {/* Account Infomation */}
          <div className="-ml-4 text-lg relative col-span-11 w-full overflow-hidden">
            <div className="absolute top-0 font-bold uppercase hover:text-gray-500">
              <Skeleton variant="text" width={200} height={16} />
            </div>
            <div className="absolute top-6 text-xs italic">
              {/* {accountOfAuthor.description} */}
              <Skeleton variant="text" width={200} height={16} />
            </div>
            <div className="absolute bottom-0 text-base text-purple-600 font-bold uppercase">
              {/* {accountOfAuthor.description} */}
              <Skeleton variant="text" width={100} height={20} />
            </div>
          </div>
        </div>
        {/* About the blog content */}
        <div>
          <div className="grid md:grid-cols-3 gap-3 mx-auto w-10/12">
            {/* content 2 part, aside 1 part */}
            {/* <!--Content area--> */}
            {/* Title of the blog */}
            <div className="md:col-span-2">
              <div className="mb-5">
                {/* Title */}
                <h1 className="mt-9 font-bold text-4xl text-left w-full">
                  <Skeleton variant="text" width={200} height={16} />
                </h1>
                <div className="flex flex-col space-y-2 mt-1">
                  {/* Posted date */}
                  <p className="text-md italic ">
                    {" "}
                    <Skeleton variant="text" width={200} height={16} />
                  </p>
                  <div className="flex flex-row gap-2">
                    {/* Tags */}
                    <Skeleton variant="text" width={200} height={16} />
                  </div>
                  <div className="flex flex-row">
                    {/* Rating */}
                    <Skeleton variant="text" width={200} height={16} />
                  </div>
                </div>
              </div>
              {/* Content of the blog */}
              <span className="text-justify text-3xl ">
                <article className="prose">
                  {/* Content */}
                  <Skeleton variant="text" width={200} height={16} />
                </article>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogContentSkeleton;
