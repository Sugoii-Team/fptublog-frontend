import { Skeleton } from "@mui/material";
import React from "react";
import BlogPopularSkeleton from "../../../Newest/components/SideItem/BlogPopularSkeleton";

function BlogContentSkeleton(props) {
  return (
    <div className="mt-6 p-8 md:p-5 mx-10">
      {/* <!--About the author--> */}
      <div className="text-xs place-content-center mx-28 grid grid-cols-12">
        {/* <!--Image of the author--> */}
        <div className="col-span-1">
          <Skeleton variant="rectangular" width={64} height={64} />
        </div>
        {/* Account Infomation */}
        <div className="-ml-4 text-lg relative col-span-11 w-full overflow-hidden">
          <div className="absolute top-0 font-bold uppercase hover:text-gray-500">
            <Skeleton variant="text" width={300} height={20} />
          </div>
          <div className="absolute top-6 text-xs italic">
            {/* {accountOfAuthor.description} */}
            <Skeleton variant="text" width={200} height={20} />
          </div>
          <div className="absolute bottom-0 text-base text-purple-600 font-bold uppercase">
            <Skeleton variant="text" width={100} height={25} />
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
              <h1 className="mt-9 font-bold text-4xl text-left w-full">
                <Skeleton variant="text" width={650} height={30} />
                <Skeleton variant="text" width={500} height={30} />
              </h1>
              <div className="flex flex-col space-y-2 mt-1">
                <p className="text-md italic ">
                  <Skeleton variant="text" width={200} height={30} />
                </p>
                <div className="flex flex-row gap-2">
                  <Skeleton variant="text" width={70} height={40} />
                  <Skeleton variant="text" width={70} height={40} />
                  <Skeleton variant="text" width={70} height={40} />
                </div>
                <div className="flex flex-row">
                  <Skeleton variant="text" width={550} height={20} />
                </div>
              </div>
            </div>
            {/* Content of the blog */}
            <span className="text-justify text-3xl ">
              <Skeleton variant="text" width={700} height={20} />
              <Skeleton variant="text" width={600} height={20} />
              <Skeleton variant="text" width={630} height={20} />
              <Skeleton variant="text" width={620} height={20} />
              <Skeleton variant="text" width={700} height={20} />
              <Skeleton variant="text" width={690} height={20} />
              <Skeleton variant="text" width={650} height={20} />
              <Skeleton variant="text" width={660} height={20} />
              <Skeleton variant="text" width={670} height={20} />
            </span>
          </div>

          {/* <!--Aside area--> */}
          <div className="hidden lg:col-span-1 lg:flex ">
            <div className="border-l-2 min-h-screen mr-10"></div>
            {/* <!--Advertise blog area - include 3 blog demo--> */}
            {/* <AsideBlogContent /> */}
            <div className="w-full">
              <div className="text-center text-lg uppercase font-medium">
                <span className="">Popular Post</span>
                <div className="border-t-2 border-gray-300 w-8 flex mx-auto"></div>
              </div>
              <div className="flex justify-center mt-4">
                <ul>
                  <BlogPopularSkeleton />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogContentSkeleton;
