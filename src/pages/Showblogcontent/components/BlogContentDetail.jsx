//React Things
import { Rating } from "@mui/material";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
//Markdown and display
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import gfm from "remark-gfm";
import InputDialog from "../../../components/Dialog/InputDialog";
import MyDialog from "../../../components/Dialog/MyDialog";
//Firebase
import { collection, doc, setDoc } from "@firebase/firestore";
import { db } from "../../../services/fireBase";
//Components
import blogApi from "../../../services/blogApi";
import lecturerApi from "../../../services/lecturerApi";
import ratingApi from "../../../services/ratingApi";
import BlogPopular from "../../Newest/components/SideItem/BlogPopular";
import FieldSuggest from "../../Newest/components/SideItem/FieldSuggest";
import AwardForUser from "./AwardForUser";
import FBComment from "./FBComent";
import StorageKey from "../../../constant/storage-keys";
import userApi from "../../../services/userApi";

BlogContentDetail.propTypes = {
  blog: PropTypes.object,
  tagOfBlog: PropTypes.array,
  statusList: PropTypes.array,
  blogDeletedClick: PropTypes.func,
  conditionToApprove: PropTypes.bool,
  admin: PropTypes.object,
  allAwardAvailable: PropTypes.array,
};

BlogContentDetail.defaultProps = {
  blog: {},
  tagOfBlog: [],
  conditionToApprove: false,
};

function BlogContentDetail({
  blog,
  tagOfBlog,
  statusList,
  ratedValue,
  totalRated,
  blogDeletedClick,
  admin,
  allAwardAvailable,
}) {
  const blogId = blog.id;
  const history = useHistory(); // Get blog history path
  const time = moment(blog.createdDateTime).format("LL");
  /* Get role in case this blog is need to approving */
  const currentUser = useSelector((state) => state.user.current);
  const userRole = currentUser.role;
  const [studentInfo, setStudentInfo] = useState({});
  const [accountOfAuthor, setAccountOfAuthor] = useState({});
  const [approvedDialog, setApprovedDialog] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [averageRate, setAverageRate] = useState(0);
  const defaultAvatar = "http://placehold.it/70x70";
  const authorAvatar = accountOfAuthor?.avatarUrl;

  //For delete blog function
  const adminLoggedIn = admin.role === "ADMIN";
  //Handle open-close announment when delete blog
  const handleDeleteBlogClick = (id) => {
    let confirmToDeleteBlog = window.confirm(
      "Are you sure to delete this blog ?"
    );
    if (confirmToDeleteBlog === true) {
      blogDeletedClick(id);
    } else return;
  };

  const experience = () => {
    if(0 <= studentInfo.experiencePoint && studentInfo.experiencePoint<1000){
      return "ROOKIE";
    } else if (1000 <= studentInfo.experiencePoint && studentInfo.experiencePoint < 2000){
      return "NEWBIE";
    }else if (2000 <= studentInfo.experiencePoint && studentInfo.experiencePoint < 3000){
      return "BLOGGER";
    } else if (studentInfo.experiencePoint >= 3000){
      return "PRO BLOGGER";
    }
  };


  const totalEveryoneRate =
    totalRated.oneStar +
    totalRated.twoStar +
    totalRated.threeStar +
    totalRated.fourStar +
    totalRated.fiveStar;

  /* Get pending status to compare to this blog */
  //Filter pending status
  const pendingStatus = statusList.filter((status) => {
    return (
      status.name === "pending approved" ||
      status.name === "pending deleted" ||
      status.name === "pending updated"
    );
  });
  //Filter to make sure blog id is in pending state
  const isInPending = pendingStatus.filter((status) => {
    return status.id === blog.statusId;
  });

  //Only show approve button when loggedin user is Lecture and blog is in pending state
  //and this blog not own by it poster
  const conditionToApprove =
    userRole === "LECTURER" &&
    isInPending.length !== 0 &&
    blog.authorId !== currentUser.id;
  //Get to change author avatar

  //Rerender rating value everytime rating update
  useEffect(() => {
    setRatingValue(parseInt(ratedValue.star));
  }, [ratedValue]);

  //Rerender Average rate when api arrive
  useEffect(() => {
    setAverageRate(blog.avgRate);
  }, [blog.avgRate]);

  // take the author account to take info about author of blog
  useEffect(() => {
    (async () => {
      try {
        if (blog.authorId) {
          const author = await blogApi.getAuthorById(blog.authorId);
          setAccountOfAuthor(author.data);
          if(author.data.role === "STUDENT"){
            const studentAccountToGetExperience = await userApi.getStudentById(author.data.id);
            setStudentInfo(studentAccountToGetExperience.data);
          }
        }
      } catch (error) {
        console.log("Failed to fetch Author: ", error);
      }
    })();
  }, [blog.authorId]);

  //Handle dialog after blog approve or reject
  const responseFromDialog = (TrueOrFalse) => {
    if (TrueOrFalse) {
      // if return true then redirect to approval page and close dialog
      setApprovedDialog(false);
      history.push("/approval");
    }
  };

  /* Let Author Update status of blog */
  const HandleApprovalBtn = async (typeOfApproval) => {
    //In case blog take time to load, button cannot do anything
    if (blog.id === undefined) {
      //Undefined then do nothing
    } else if (userRole === "LECTURER") {
      //Prepare data for approval
      const dataPrepare = {
        action: typeOfApproval,
      };

      //Approve blog
      try {
        const response = await lecturerApi.approveBlog(
          blog.id,
          dataPrepare,
          currentUser.id
        );
        //If update success then redirect to home page
        if (
          response.data === "Update successfully!" &&
          response.status === 200
        ) {
          setApprovedDialog(true);
        }
      } catch (error) {
        console.log("Failed to approve blog: ", error);
      }
    } else {
      // If user not Lecturer then can't update
      console.log("Permission Error!");
    }
  };

  //Send api after user change rate state
  const handleRatingBlog = async (value) => {
    try {
      if (value === null) {
        await ratingApi.deleteRating(blogId);
      } else {
        const prepareData = {
          star: value,
        };
        await ratingApi.sendRating(blogId, prepareData);
      }
    } catch (error) {
      console.log("Failed to rate: ", error);
    }
  };

  //Cancel button for dialog
  const handleCancelDialog = () => {
    setIsReject(false);
  };

  //Handle submit reject reason
  const handleSubmitRejectReason = async (message) => {
    handleCancelDialog();
    //Get current date to post
    let currentDate = moment().valueOf();
    const newDocRef = doc(collection(db, "notifications")); // Create new doc to generate id
    const payload = {
      id: newDocRef.id, // Give field id by doc's id
      forUserId: blog.authorId,
      fromUserId: currentUser.id,
      message,
      referenceId: blog.id, // reject blog so set ref id is blog id
      status: StorageKey.unviewStatus,
      date: currentDate,
      type: StorageKey.rejectblog, // Get constrain value from storage key
    };
    await setDoc(newDocRef, payload); // Update doc with some field
    //After create noti then reject the blog
    HandleApprovalBtn("reject");
  };

  return (
    <div>
      <div className="mt-6 p-8 md:p-5 mx-10">
        {/* <!--About the author--> */}
        <div className="text-xs place-content-center mx-28 grid grid-cols-12">
          {/* <!--Image of the author--> */}
          <div className="col-span-1">
            <img
              className="rounded-md h-16 w-16 flex items-center justify-center"
              src={authorAvatar ? authorAvatar : defaultAvatar}
              alt="Author Img"
            />
          </div>
          {/* Account Infomation */}
          <div className="-ml-4 text-lg relative col-span-11 w-full overflow-hidden">
            <Link
              to={`profile?${blog.authorId}`}
              className="absolute top-0 font-bold uppercase hover:text-gray-500"
            >
              {accountOfAuthor.firstName + " " + accountOfAuthor.lastName}{" "}
            </Link>
            <div className="absolute top-6 text-xs italic">
              {/* {accountOfAuthor.description} */}
              {accountOfAuthor.description}
            </div>
            <div className="absolute bottom-0 text-base text-purple-600 font-bold uppercase">
              {/* {accountOfAuthor.description} */}
              {accountOfAuthor.role === "LECTURER" ? 
            <p>LECTURER</p>
            :
            <p>{experience()}</p>
            }
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
                  {blog.title}
                </h1>
                <div className="flex flex-col space-y-2 mt-1">
                  <p className="text-md italic ">Posted: {time}</p>
                  <div className="flex flex-row gap-2">
                    {tagOfBlog.map((tag) => (
                      <div
                        key={tag.id}
                        className="border-2 rounded-md p-1 text-sm italic font-semibold text-blue-800"
                      >
                        #{tag.name}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row">
                    <Rating
                      name="read-only"
                      value={averageRate ? averageRate : 0}
                      readOnly
                      precision={0.1}
                    />
                    <span className="ml-1 font-light text-gray-500">
                      ( {totalEveryoneRate} )
                    </span>
                  </div>
                </div>
              </div>
              {/* Content of the blog */}
              <span className="text-justify text-3xl ">
                <article className="prose">
                  <ReactMarkdown remarkPlugins={[gfm]}>
                    {blog.content}
                  </ReactMarkdown>
                </article>
              </span>
              {currentUser.id && isInPending.length < 1 ? (
                <div className="flex flex-col justify-center gap-3 my-4">
                  <div className="font-semibold uppercase text-xs mx-auto">
                    Leave a rate
                  </div>
                  <div className="mx-auto">
                    <Rating
                      name="simple-controlled"
                      value={ratingValue}
                      onChange={(event, newValue) => {
                        setRatingValue(newValue);
                        handleRatingBlog(newValue);
                      }}
                      size="large"
                    />
                  </div>
                </div>
              ) : null}

              {/* Award section, if current loggin user is lecture and author of the blog is student then allowed to
              give award */}
              {currentUser.id &&
              isInPending.length < 1 &&
              currentUser.role === "LECTURER" &&
              accountOfAuthor.role === "STUDENT" ? (
                <div>
                  <AwardForUser
                    allAwardAvailable={allAwardAvailable}
                    blogAuthor={accountOfAuthor}
                  />
                </div>
              ) : null}

              {/* Approve Buttons */}
              {conditionToApprove ? (
                <div className="my-5 flex gap-3">
                  <span>
                    {" "}
                    <button
                      className="bg-red-400 px-5 py-3 text-sm shadow-lg font-medium tracking-wider  text-white rounded-lg hover:shadow-2xl hover:bg-red-500 transition ease-in-out duration-150"
                      onClick={() => setIsReject(true)}
                    >
                      Reject
                    </button>
                  </span>
                  <span>
                    {" "}
                    <button
                      className="bg-green-400 px-5 py-3 text-sm shadow-lg font-medium tracking-wider  text-white rounded-lg hover:shadow-2xl hover:bg-green-500 transition ease-in-out duration-150"
                      onClick={() => HandleApprovalBtn("approve")}
                    >
                      Approve
                    </button>
                  </span>
                </div>
              ) : null}
              {/* Approve Buttons */}
              {isReject ? (
                <InputDialog
                  isCancel={handleCancelDialog}
                  onSubmitReason={handleSubmitRejectReason}
                />
              ) : null}
            </div>

            {/* <!--Aside area--> */}
            <div className="hidden lg:col-span-1 lg:flex ">
              <div className="border-l-2 min-h-screen mr-10"></div>
              {/* <!--Advertise blog area - include 3 blog demo--> */}
              {/* <AsideBlogContent /> */}
              <div>
                <BlogPopular />
                <FieldSuggest />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete blog buttons */}
      {/* Hide when admin log out */}
      {adminLoggedIn ? (
        <div className="grid grid-cols-9 mt-4 mb-8">
          <div className="text-center grid col-start-6">
            <button
              className="ml-5 p-2 pl-3 pr-3 w-24 transition-colors 
          duration-300 rounded-3xl transform 
        text-white bg-red-200 hover:bg-red-500 
        border-red-300 text-sm focus:border-4"
              onClick={() => handleDeleteBlogClick(blog.id)}
            >
              DELETE
            </button>
          </div>
        </div>
      ) : null}

      {/* <!-- Comment Area --> */}
      <div className="col-span-2 mb-16">
        <FBComment blogId={blogId} authorId={blog.authorId} />
      </div>
      {/* <!-- Comment Area /- --> */}
      {/* Dialog Area */}
      {approvedDialog ? (
        <MyDialog
          isCancel={responseFromDialog}
          title="Sucesss"
          description="You action is Success"
          icon="success"
        />
      ) : null}
    </div>
  );
}

export default BlogContentDetail;
