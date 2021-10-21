import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import userApi from "../../services/userApi";
import NameSectionSkeleton from "./NameSectionSkeleton";

Profile.propTypes = {};

function Profile(props) {
  const userId = useLocation().search.substr(1);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  console.log("user profile ne", userProfile);

  const color = {
    frombgColor: "pink",
    tobgColor: "purple",
    completed: 57,
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await userApi.viewProfile(userId);
        setUserProfile(response.data);
        if (response.status === 200) {
          setLoading(false);
        }
      } catch (error) {
        console.log("Failed to get profile: ", error);
      }
    })();
  }, [userId]);

  return (
    <div className="my-24 w-11/12 relative mx-auto h-full">
      {/* Start */}
      <motion.div
        animate={{ x: 0, opacity: 1 }}
        initial={{ x: -50, opacity: 0 }}
      >
        {loading ? (
          <NameSectionSkeleton />
        ) : (
          <div className="profileHeader border-2 border-gray-100 rounded-lg h-40 grid grid-cols-6 mt-5 shadow-lg">
            <div className="profileInfoWrapper col-span-4 relative">
              <div className="profileInfo grid grid-cols-2">
                <div className="absolute col-span-1 -top-7 left-10">
                  <img
                    className="w-40 h-40 rounded-full border-4 border-gray-700 border-opacity-70"
                    src={
                      userProfile.avatarUrl
                        ? userProfile.avatarUrl
                        : "https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                    }
                    alt="profile img"
                  />
                </div>
                <div className="col-span-1 absolute left-56 top-5">
                  <div className="profileNameNDes">
                    <span className="font-bold uppercase text-xl text-transparent filter drop-shadow-md bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
                      {userProfile.firstName + " " + userProfile.lastName}
                    </span>
                    <p className="text-sm">
                      {/* Dead just like the wind, Always by my side */}
                      {userProfile.description !== null
                        ? userProfile.description
                        : "Dead just like the wind, Always by my side"}
                    </p>
                  </div>
                  <div className="mt-5 text-purple-600 font-bold uppercase">
                    Pro Blogger
                  </div>
                </div>
              </div>
            </div>

            <div className="profileStatus col-span-2 ">
              <div className="flex flex-col items-end space-y-12 my-2 mx-10">
                <div className="flex flex-row gap-7 text-center text-xs uppercase text-gray-400">
                  <div className="">
                    <p className="text-2xl font-bold text-black">9</p>
                    <p>Posted</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-black">0</p>
                    <p>Liked</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-black">0</p>
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
        )}
      </motion.div>

      {/* Below */}
      <div className="wrapper-container grid grid-cols-3 my-5 gap-3">
        {/* Left */}
        <div className="col-span-1">
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0.5 }}
            className="border-2 border-gray-100 rounded-lg shadow-lg h-80 mb-3 py-4 px-7"
          >
            <h1 className="font-bold text-xl text-center uppercase">Award</h1>
            <div>
              <p className="font-semibold text-md">Experience Point</p>
              <div>
                <ProgressBar
                  frombgColor={color.frombgColor}
                  tobgColor={color.tobgColor}
                  completed={color.completed}
                />
              </div>
            </div>
            <div>
              <h1 className="text-center font-bold my-3">Badget Gained</h1>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0.5 }}
            transition={{ duration: 0.25 }}
            className="border-2 border-gray-100 rounded-lg shadow-lg h-80 py-4 px-7"
          >
            <h1 className="font-bold text-xl text-center uppercase">
              Tech Stack
            </h1>
            <p>Full tech stack</p>
          </motion.div>
        </div>
        {/* right */}
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 20, opacity: 0.5 }}
          className="col-span-2"
        >
          <div className="border-2 border-gray-100 rounded-lg shadow-lg min-h-screen">
            <h1 className="text-left font-bold text-xl mt-2 ml-5 uppercase ">
              Most Popular Post
            </h1>
            <div className="bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 animate-pulse"></div>
            <div className="bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 animate-pulse"></div>
            <div className="bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 animate-pulse"></div>
            <div className="bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 animate-pulse"></div>
            <div className="bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 animate-pulse"></div>
            <div className="bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 animate-pulse"></div>
            <div className="bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 animate-pulse"></div>
            <div className="bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;
