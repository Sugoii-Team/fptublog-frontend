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
import MyDialog from "../../../components/Dialog/MyDialog";
//Components
import blogApi from "../../../services/blogApi";
import lecturerApi from "../../../services/lecturerApi";
import ratingApi from "../../../services/ratingApi";
import BlogPopular from "../../Newest/components/SideItem/BlogPopular";
import CategoriesSuggest from "../../Newest/components/SideItem/CategoriesSuggest";
import FBComment from "./FBComent";

BlogContentDetail.propTypes = {
  blog: PropTypes.object,
  tagOfBlog: PropTypes.array,
  statusList: PropTypes.array,
  blogDeletedClick:PropTypes.func,
  conditionToApprove: PropTypes.bool,
  admin: PropTypes.object,
};

BlogContentDetail.defaultProps = {
  blog: {},
  tagOfBlog: [],
  conditionToApprove: false,
}

function BlogContentDetail({
  blog,
  tagOfBlog,
  statusList,
  ratedValue,
  totalRated,
  blogDeletedClick,
  admin,
}) {
  const blogId = blog.id;
  const history = useHistory(); // Get blog history path
  const time = moment(blog.createdDateTime).format("LL");
  /* Get role in case this blog is need to approving */
  const userData = useSelector((state) => state.user.current);
  const userRole = userData.role;
  const [accountOfAuthor, setAccountOfAuthor] = useState({});
  const [approvedDialog, setApprovedDialog] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const defaultAvatar = "http://placehold.it/70x70";
  const authorAvatar = accountOfAuthor?.avatarUrl;

  //For delete blog function
  const adminLoggedIn = (admin.role ==="ADMIN");
  //Handle open-close announment when delete blog
  const handleDeleteBlogClick = (id) =>{
    let confirmToDeleteBlog = window.confirm("Are you sure to delete this blog ?")
    if(confirmToDeleteBlog === true){
      blogDeletedClick(id);
    }
    else return;
  }

  
  const totalEveryoneRate =
    totalRated.oneStar +
    totalRated.twoStar +
    totalRated.threeStar +
    totalRated.fourStar +
    totalRated.fiveStar;

  const averageStar =
    (totalRated.oneStar * 1 +
      totalRated.twoStar * 2 +
      totalRated.threeStar * 3 +
      totalRated.fourStar * 4 +
      totalRated.fiveStar * 5) /
    totalEveryoneRate;

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
    blog.authorId !== userData.id;
  //Get to change author avatar

  //Rerender rating value everytime rating update
  useEffect(() => {
    setRatingValue(parseInt(ratedValue.star));
  }, [ratedValue]);


  // take the author account to take info about author of blog
  useEffect(() => {
    (async () => {
      try {
        if (blog.authorId) {
          const data = await blogApi.getAuthorById(blog.authorId);
          setAccountOfAuthor(data.data);
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
          userData.id
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
              Dead just like the wind, always by my side!
            </div>
            <div className="absolute bottom-0 text-base text-purple-600 font-bold uppercase">
              {/* {accountOfAuthor.description} */}
              Pro Blogger
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
                  {tagOfBlog.map((tag) => (
                    <Link to="" key={tag.id}>
                      {tag.name}
                    </Link>
                  ))}
                  <div className="flex flex-row">
                    <Rating
                      name="read-only"
                      value={averageStar}
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
              {userData.id && isInPending.length < 1 ? (
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

              {/* Approve Buttons */}
              {conditionToApprove ? (
                <div className="my-5 flex gap-3">
                  <span>
                    {" "}
                    <button
                      className="bg-red-400 px-5 py-3 text-sm shadow-lg font-medium tracking-wider  text-white rounded-lg hover:shadow-2xl hover:bg-red-500 transition ease-in-out duration-150"
                      onClick={() => HandleApprovalBtn("reject")}
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
            </div>

            {/* <!--Aside area--> */}
            <div className="hidden lg:col-span-1 lg:flex ">
              <div className="border-l-2 min-h-screen mr-10"></div>
              {/* <!--Advertise blog area - include 3 blog demo--> */}
              {/* <AsideBlogContent /> */}
              <div>
                <BlogPopular />
                <CategoriesSuggest />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete blog buttons */}
      {/* Hide when admin log out */}
      {adminLoggedIn ?
         <div className="grid grid-cols-9 mt-4 mb-8">
          <div className="text-center grid col-start-6">
            <button className="ml-5 p-2 pl-3 pr-3 w-24 transition-colors 
          duration-300 rounded-3xl transform 
        text-white bg-red-200 hover:bg-red-500 
        border-red-300 text-sm focus:border-4"
              onClick={() => handleDeleteBlogClick(blog.id)} >
              DELETE
            </button>
          </div>
        </div>
         :
        null
      }

      {/* <!-- Comment Area --> */}
      <div className="col-span-2 mb-16">
        <FBComment blogId={blogId} />
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
