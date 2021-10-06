import moment from 'moment';
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import blogApi from "../../../services/blogApi";
import AsideBlogContent from "./Aside";



BlogContentDetail.propTypes = {
  blog: PropTypes.object,
  tabOfBlog: PropTypes.array,
};

BlogContentDetail.defaultProps = {
  blog: {},
  tabOfBlog: [],
};



function BlogContentDetail({ blog, tabOfBlog }) {

  const authorId = blog.authorId;
  const time = moment(blog.createdDateTime).format("L");

  // take the author account to take info about author of blog
  const [accountOfAuthor, setAccountOfAuthor] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const data = await blogApi.getAuthorById(authorId).then((response) => response.data);
        setAccountOfAuthor(data);
      } catch (error) {
        console.log("Failed to fetch Author: ", error);
      }
    })();
  }, [blog.authorId]);




  return (
    <div>

      <div className="mt-6 p-8 md:p-5 mx-10">

        {/* <!--About the author--> */}
        <div className="text-xs ml-4 place-content-center">
          {/* <!--Image of the author--> */}
          <span className="inline-block mr-2">
            <img className="rounded-full h-10 w-10 flex items-center justify-center" src="http://placehold.it/70x70"
              alt="Author image" />
          </span>

          <span className="inline-block ml-2 text-xl">
            <p> {accountOfAuthor.firstName + ' ' + accountOfAuthor.lastName} <br></br>
              {accountOfAuthor.description} <br></br>
              {tabOfBlog.map(tag => (
                <a href='#' key={tag.id}>{tag.name}</a>
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
            <h1 className="mt-9 font-bold text-4xl ">
              {blog.title}
            </h1>

            {/* Content of the blog */}
            <span className="text-justify text-3xl">
              <article className="prose">
                <ReactMarkdown remarkPlugins={[gfm]}>{blog.content}</ReactMarkdown>
              </article>
            </span>
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
        {/* <CommentsFeature /> */}
      </div>
      {/* <!-- Comment Area /- --> */}



    </div>

  );
}

export default BlogContentDetail;