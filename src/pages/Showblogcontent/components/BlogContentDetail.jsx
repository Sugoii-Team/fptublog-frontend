//React Things
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
import AsideBlogContent from "./Aside";
import FBComment from "./FBComent";

BlogContentDetail.propTypes = {
  blog: PropTypes.object,
  tagOfBlog: PropTypes.array,
  statusList: PropTypes.array,
  conditionToApprove: PropTypes.bool,
};

BlogContentDetail.defaultProps = {
  blog: {},
  tagOfBlog: [],
  conditionToApprove: false,
};

function BlogContentDetail({ blog, tagOfBlog, statusList }) {
  const blogId = blog.id;
  const history = useHistory(); // Get blog history path
  const time = moment(blog.createdDateTime).format("MMM Do YY");
  /* Get role in case this blog is need to approving */
  const userData = useSelector((state) => state.user.current);
  const userRole = userData.role;
  const [accountOfAuthor, setAccountOfAuthor] = useState({});
  /* Get pending status to compare to this blog */
  const [approvedDialog, setApprovedDialog] = useState(false);
  const pendingStatus = statusList.filter((status) => {
    return status.name === "pending approved";
  });
  const pendingId = pendingStatus[0]?.id; // Get pendingId to compare
  const conditionToApprove =
    userRole === "LECTURER" && blog.statusId === pendingId;
  //Get to change author avatar
  const defaultAvatar = "http://placehold.it/70x70";
  const authorAvatar = accountOfAuthor?.avatarUrl;

  // take the author account to take info about author of blog
  useEffect(() => {
    (async () => {
      try {
        const data = await blogApi.getAuthorById(blog.authorId);
        setAccountOfAuthor(data.data);
      } catch (error) {
        console.log("Failed to fetch Author: ", error);
      }
    })();
  }, [blog.authorId]);

  const responseFromDialog = (TrueOrFalse) => {
    if (TrueOrFalse) {
      // if return true then redirect to another page and close dialog
      setApprovedDialog(false);
      history.push("/");
    }
  };

  /* Let Author Update status of blog */
  const HandleApprovalBtn = async (typeOfApproval) => {
    //In case blog take time to load, button cannot do anything
    if (blog.id === undefined) {
    } else if (userRole === "LECTURER") {
      //Filter list status to get status
      const statusAction = statusList.filter((status) => {
        return typeOfApproval === status.name;
      });
      const statusObj = statusAction[0];

      //Prepare data for approval
      const dataPrepare = {
        statusId: statusObj.id,
        reviewerId: userData.id,
      };

      //Update blog
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

  return (
    <div>
      <div className="mt-6 p-8 md:p-5 mx-10">
        {/* <!--About the author--> */}
        <div className="text-xs ml-4 place-content-center">
          {/* <!--Image of the author--> */}
          <span className="inline-block mr-2">
            <img
              className="rounded-full h-16 w-16 flex items-center justify-center"
              src={authorAvatar ? authorAvatar : defaultAvatar}
              alt="Author Img"
            />
          </span>

          <span className="inline-block ml-2 text-xl">
            <p className=" font-bold">
              {" "}
              {accountOfAuthor.firstName + " " + accountOfAuthor.lastName}{" "}
              <br></br>
              {accountOfAuthor.description} <br></br>
            </p>
            <p className="text-md italic ">Created: {time}</p>
          </span>
        </div>
        {/* About the blog content */}
        <div className="grid md:grid-cols-3 gap-6 justify-center">
          {/* content 2 part, aside 1 part */}
          {/* <!--Content area--> */}
          {/* Title of the blog */}
          <div className="md:col-span-2 ml-20">
            <div className="mb-5">
              {tagOfBlog.map((tag) => (
                <Link to="" key={tag.id}>
                  {tag.name}
                </Link>
              ))}
              <h1 className="mt-9 font-bold text-4xl ">{blog.title}</h1>
            </div>
            {/* Content of the blog */}
            <span className="text-justify text-3xl ">
              <article className="prose">
                <ReactMarkdown remarkPlugins={[gfm]}>
                  {blog.content}
                </ReactMarkdown>
              </article>
            </span>
            {conditionToApprove ? (
              <div className="my-5 flex gap-3">
                <span>
                  {" "}
                  <button
                    className="bg-red-400 px-5 py-3 text-sm shadow-sm font-medium tracking-wider  text-white rounded-full hover:shadow-2xl hover:bg-red-500"
                    onClick={() => HandleApprovalBtn("rejected")}
                  >
                    Reject
                  </button>
                </span>
                <span>
                  {" "}
                  <button
                    className="bg-green-400 px-5 py-3 text-sm shadow-sm font-medium tracking-wider  text-white rounded-full hover:shadow-2xl hover:bg-green-500"
                    onClick={() => HandleApprovalBtn("approved")}
                  >
                    Approve
                  </button>
                </span>
              </div>
            ) : null}
          </div>

          {/* <!--Aside area--> */}
          <div className="hidden lg:col-span-1 lg:block">
            {/* <!--Advertise blog area - include 3 blog demo--> */}
            <AsideBlogContent />
          </div>
        </div>
      </div>

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
          description="Blog Approved"
          icon="success"
        />
      ) : null}
    </div>
  );
}

export default BlogContentDetail;
