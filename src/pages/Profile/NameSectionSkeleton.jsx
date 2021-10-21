import { Skeleton } from "@mui/material";
import React from "react";

NameSectionSkeleton.propTypes = {};

NameSectionSkeleton.defaultProps = {};

function NameSectionSkeleton(props) {
  return (
    <div>
      <div className="profileHeader border-2 border-gray-100 rounded-lg h-40 grid grid-cols-6 mt-5 shadow-lg">
        <div className="profileInfoWrapper col-span-4 relative">
          <div className="profileInfo grid grid-cols-2">
            <div className="absolute col-span-1 -top-7 left-10">
              <Skeleton variant="circular" width={150} height={150} />
            </div>
            <div className="col-span-1 absolute left-56 top-5">
              <div className="profileNameNDes">
                <Skeleton variant="text" width={320} height={30} />

                <p className="text-sm mt-2">
                  <Skeleton variant="text" width={250} height={18} />
                  <Skeleton variant="text" width={180} height={18} />
                </p>
              </div>
              <div className="mt-2 text-purple-600 font-bold uppercase">
                <Skeleton variant="text" width={180} height={30} />
              </div>
            </div>
          </div>
        </div>

        <div className="profileStatus col-span-2 ">
          <div className="flex flex-col items-end space-y-12 my-2 mx-10">
            <div className="flex flex-row gap-7 text-center text-xs uppercase text-gray-400">
              <div className="">
                <p className="flex justify-center">
                  <Skeleton variant="rectangular" width={30} height={33} />
                </p>
                <p>Posted</p>
              </div>
              <div>
                <p className="flex justify-center">
                  {" "}
                  <Skeleton variant="rectangular" width={30} height={33} />
                </p>
                <p>Liked</p>
              </div>
              <div>
                <p className="flex justify-center">
                  {" "}
                  <Skeleton variant="rectangular" width={30} height={33} />
                </p>
                <p>Award</p>
              </div>
            </div>
            <div className="flex flex-row gap-4 text-sm cursor-pointer">
              <div className="text-green-500">Like</div>
              <div className="text-blue-500">Share</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NameSectionSkeleton;
