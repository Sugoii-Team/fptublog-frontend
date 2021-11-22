import { motion } from "framer-motion";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import awardApi from "../../services/awardApi";
import userApi from "../../services/userApi";
import NameSectionSkeleton from "./NameSectionSkeleton";
import LecturerOption from "./Option/LecturerOption";
import StudentOption from "./Option/StudentOption";
import UpdateProfileImg from "./UpdateProfileImg/UpdateProfileImg";

Profile.propTypes = {};

function Profile(props) {
  const currentUser = useSelector((state) => state.user.current);
  const userId = useLocation().search.substr(1);
  const [userProfile, setUserProfile] = useState({});
  const [profileAward, setProfileAward] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdateImg, setIsUpdateImg] = useState(false);
  const [listPopularBlog, setListPopularBlog] = useState([]);
  const [studentUser, setStudentUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const defaultThumnail =
    "http://geniussys.com/img/placeholder/blogpost-placeholder-100x100.png";

  //Get student profile to get experience point to show on profile page
  const handleStudentProfile = (data) => {
    setStudentUser(data);
  };

  const handleOnpageChange = (data) => {
    setCurrentPage(data.selected + 1); // Page count start at 1
  };

  const limitBlog = 10;

  const color = {
    frombgColor: "pink",
    tobgColor: "purple",
    completed: ((studentUser.experiencePoint / 4000) * 100).toFixed(0),
  };

  const experience = () => {
    if (
      0 <= studentUser.experiencePoint &&
      studentUser.experiencePoint < 1000
    ) {
      return "ROOKIE";
    } else if (
      1000 <= studentUser.experiencePoint &&
      studentUser.experiencePoint < 2000
    ) {
      return "NEWBIE";
    } else if (
      2000 <= studentUser.experiencePoint &&
      studentUser.experiencePoint < 3000
    ) {
      return "BLOGGER";
    } else if (studentUser.experiencePoint >= 3000) {
      return "PRO BLOGGER";
    }
  };

  const onHandleStudentSubmit = async (data) => {
    if (userProfile.role === "STUDENT") {
      try {
        const reponse = await userApi.updateStudentProfile(
          userProfile.id,
          data
        );
        if (reponse.status === 200) {
          window.alert("Update Student Profile successfully");
        }
      } catch (error) {
        console.log("Fail to update Student profile", error);
      }
    } else return;
  };

  useEffect(() => {
    (async () => {
      try {
        //Get award of profile
        if (userProfile.role === "STUDENT") {
          const awardResponse = await awardApi.getAwardOfStudent(userId);
          setProfileAward(awardResponse.data);
        }
        const response = await userApi.viewProfile(userId);
        const popularBlog = await userApi.getPopularBlogOfUser(
          response.data.id,
          currentPage,
          limitBlog
        );
        setUserProfile(response.data);
        setListPopularBlog(popularBlog.data);
        if (response.status === 200 && popularBlog.status === 200) {
          setLoading(false);
        }
      } catch (error) {
        console.log("Failed to get profile: ", error);
      }
    })();
  }, [userId, userProfile.role, userProfile.description, currentPage]);

  return (
    <div>
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
                  <div
                    className="absolute col-span-1 -top-7 left-10 cursor-pointer"
                    onClick={() => {
                      if (currentUser.id === userProfile.id) {
                        setIsUpdateImg(true);
                      }
                    }}
                  >
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
                  {isUpdateImg ? (
                    <UpdateProfileImg
                      isCancle={() => {
                        setIsUpdateImg(false);
                      }}
                      userId={userId}
                    />
                  ) : null}
                  {userProfile.role === "STUDENT" ? (
                    <div className="col-span-1 absolute left-56 top-5">
                      <div className="profileNameNDes">
                        <span className="font-bold uppercase text-xl text-transparent filter drop-shadow-md bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
                          {userProfile.firstName + " " + userProfile.lastName}
                        </span>
                        <p className="text-lg">
                          {userProfile.description !== null
                            ? userProfile.description
                            : ""}
                        </p>
                      </div>
                      <div className="mt-2 text-purple-600 font-bold uppercase">
                        {experience()}
                      </div>
                    </div>
                  ) : (
                    <div className="col-span-1 absolute left-56 top-5">
                      <div className="profileNameNDes">
                        <span className="font-bold uppercase text-xl text-transparent filter drop-shadow-md bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
                          {userProfile.firstName + " " + userProfile.lastName}
                        </span>
                        <p className="text-lg">
                          {userProfile.description !== null
                            ? userProfile.description
                            : "AYoooooooo <3"}
                        </p>
                        <div className="mt-2 text-purple-600 font-bold uppercase">
                          LECTURER
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="profileStatus col-span-2 ">
                <div className="flex flex-col items-end space-y-12 my-2 mx-10">
                  <div className="flex flex-row gap-7 text-center text-xs uppercase text-gray-400">
                    <div className="">
                      <p className="text-2xl font-bold text-black">
                        {userProfile.blogsNumber}
                      </p>
                      <p>Posted</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-black">
                        {userProfile.avgRate}
                      </p>
                      <p>Average Rate</p>
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

        <div className="grid grid-cols-3 my-5 gap-3">
          {/* Left */}
          <div className="col-span-1">
            {userProfile.role === "STUDENT" && loading === false ? (
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                initial={{ y: 20, opacity: 0.5 }}
                className="border-2 border-gray-100 rounded-lg shadow-lg min-h-0 mb-3 py-4 px-7"
              >
                <h1 className="font-bold text-xl text-center uppercase">
                  Award
                </h1>
                <div className="">
                  <p className="font-semibold text-md">Experience Point</p>
                  <div>
                    <ProgressBar
                      frombgColor={color.frombgColor}
                      tobgColor={color.tobgColor}
                      completed={color.completed}
                    />
                  </div>
                  <div className="relative my-8">
                    <div className="absolute bottom-0 left-0 uppercase text-sm font-semibold text-green-600">
                      Next Level:{" "}
                    </div>
                    <div className="absolute bottom-0 right-0 uppercase text-sm font-semibold text-pink-600">
                      Pro Blogger{" "}
                    </div>
                  </div>
                </div>
                <div className="">
                  <h1 className="text-center font-bold uppercase">
                    Badges Gained
                  </h1>
                  {profileAward.length > 0 ? (
                    <div className="grid grid-cols-6 gap-4">
                      {profileAward?.map((award, index) => (
                        <div className="col-span-1" key={index}>
                          <div className="p-1">
                            <img
                              src={award?.iconUrl}
                              className="w-12 mx-auto transition ease-in-out duration-150 transform hover:-translate-y-0.5 hover:scale-105"
                              alt="award"
                              title={award?.name}
                            />
                            <p className="flex justify-center font-semibold">
                              1
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="uppercase text-center">
                      You not have badges Gained
                    </p>
                  )}
                </div>
              </motion.div>
            ) : null}

            {/* ///////////////////////////////////////////////////////////////// */}

            {/* Infomation of user to edit */}

            <motion.div
              animate={{ y: 0, opacity: 1 }}
              initial={{ y: 20, opacity: 0.5 }}
              transition={{ duration: 0.25 }}
              className="border-2 border-gray-100 rounded-lg shadow-lg h-100 py-4 px-7"
            >
              <h1 className="font-bold text-xl text-center uppercase">ABOUT</h1>
              {userProfile.role === "STUDENT" ? (
                <StudentOption
                  userProfile={userProfile}
                  dataOfStudentToUpdate={onHandleStudentSubmit}
                  studentProfile={handleStudentProfile}
                />
              ) : (
                <LecturerOption userProfile={userProfile} />
              )}
            </motion.div>
          </div>

          {/* ///////////////////////////////////////////////////////////////// */}

          {/* right */}
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0.5 }}
            className="col-span-2"
          >
            <div className=" border-2 border-gray-100 rounded-lg shadow-lg min-h-screen">
              <h1 className="text-left font-bold text-xl mt-2 ml-5 uppercase ">
                Blogger's POST
              </h1>
              {listPopularBlog.map((popularBlog, idx) => (
                <Link
                  to={`blogDetail?${popularBlog.id}`}
                  className="grid: grid-cols-5 flex bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 mt-3"
                  key={idx}
                >
                  <div className="min-w-minWidthForBlogInProfilePage object-none object-center my-4 ml-6">
                    <img
                      className="inline object-contain w-32 h-32 bg-no-repeat rounded-md"
                      src={
                        popularBlog.thumbnailUrl
                          ? popularBlog.thumbnailUrl
                          : defaultThumnail
                      }
                      alt=""
                    />
                  </div>
                  <div className="my-8">
                    <div className="font-bold text-xl ml-3 uppercase">
                      {popularBlog.title}
                    </div>
                    <div className="ml-3 text-sm">
                      Created date:{" "}
                      {moment(popularBlog.createdDateTime).format("LL")}
                    </div>
                    <div className="ml-3 pr-6">{popularBlog.description}</div>
                  </div>
                </Link>
              ))}

              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={15}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handleOnpageChange}
                containerClassName={"flex gap-1 justify-center my-4"}
                pageLinkClassName={
                  "border-r-2 border-l-2 px-5 py-2 font-semibold hover:bg-gray-100 transision ease-in duration-200"
                }
                previousLinkClassName={"font-bold uppercase mr-2"}
                nextLinkClassName={"font-bold uppercase ml-2"}
                breakLinkClassName={"font-bold uppercase px-4 py-2"}
                activeLinkClassName={"bg-gray-100"}
              />
            </div>
          </motion.div>
        </div>

        {/* Show annountment dialog */}
        {/* {status ? (
            <AnnouncementDialog
              responseStatus={handleAnnouncementDialogOKClick}
              responseObject={responseObject}
            />
          ) : null} */}
      </div>
    </div>
  );
}

export default Profile;
