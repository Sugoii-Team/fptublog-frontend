import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import gfm from "remark-gfm";
import blogApi from "../../../services/blogApi";
import AsideBlogContent from "./Aside";

BlogContentDetail.propTypes = {
  blog: PropTypes.object,
  tagOfBlog: PropTypes.array,
  statusList: PropTypes.array,
};

BlogContentDetail.defaultProps = {
  blog: {},
  tagOfBlog: [],
};

function BlogContentDetail({ blog, tagOfBlog, statusList }) {
  const time = moment(blog.createdDateTime).format("L");
  /* Get role incase this blog is need to approving */
  const userData = useSelector((state) => state.user.current);
  const userRole = userData.role;
  /* Get pending status to compare to this blog */
  const pendingStatus = statusList.filter((status) => {
    return status.name === "pending";
  });
  const pendingId = pendingStatus[0]?.id;

  // take the author account to take info about author of blog
  const [accountOfAuthor, setAccountOfAuthor] = useState({});
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

  /* Let Author Update status of blog */
  const HandleApprovalBtn = async (typeOfApproval) => {
    if (userRole === "LECTURER") {
      const statusAction = statusList.filter((status) => {
        return typeOfApproval === status.name;
      });
      const statusObj = statusAction[0];

      const dataPrepare = {
        statusId: statusObj.id,
        reviewerId: userData.id,
      };

      try {
        const response = await blogApi.updateBlog(blog.id, dataPrepare);
        console.log("Success", response);
      } catch (error) {
        console.log("Failed to approve blog: ", error);
      }
    } else {
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
              className="rounded-full h-10 w-10 flex items-center justify-center"
              src="http://placehold.it/70x70"
              alt="Author Img"
            />
          </span>

          <span className="inline-block ml-2 text-xl">
            <p>
              {" "}
              {accountOfAuthor.firstName + " " + accountOfAuthor.lastName}{" "}
              <br></br>
              {accountOfAuthor.description} <br></br>
              {tagOfBlog.map((tag) => (
                <Link to="" key={tag.id}>
                  {tag.name}
                </Link>
              ))}
            </p>
          </span>
        </div>
        {/* About the blog content */}
        <div className="grid md:grid-cols-3 gap-6 justify-center">
          {/* content 2 part, aside 1 part */}
          {/* <!--Content area--> */}
          {/* Title of the blog */}
          <div className="md:col-span-2 ml-20">
            <p className="text-xl ">Created: {time}</p>
            <h1 className="mt-9 font-bold text-4xl ">{blog.title}</h1>

            {/* Content of the blog */}
            <span className="text-justify text-3xl">
              <article className="prose">
                <ReactMarkdown remarkPlugins={[gfm]}>
                  {blog.content}
                </ReactMarkdown>
              </article>
            </span>
            {userRole === "LECTURER" && blog.statusId === pendingId ? (
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
      <div className="col-span-2 mb-16">{/* <CommentsFeature /> */}</div>
      {/* <!-- Comment Area /- --> */}
    </div>
  );
}

export default BlogContentDetail;
