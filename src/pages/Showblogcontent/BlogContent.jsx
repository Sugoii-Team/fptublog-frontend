import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import blogApi from "../../services/blogApi";
import BlogStatusApi from "../../services/blogStatusApi";
import BlogContentDetail from "./components/BlogContentDetail";

BlogContentFeature.propTypes = {};

function BlogContentFeature(props) {
  const location = useLocation().search.substr(1);
  // console.log("location ", location);

  /*  const blogId = useRouteMatch().url.search; */

  const [blogDetail, setBlogDetail] = useState();
  const [tagOfBlog, setTagOfBlog] = useState();
  const [status, setStatus] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await blogApi.get(location);
        const tag = await blogApi.getTagOfBlogById(location);
        const status = await BlogStatusApi.getStatus();

        setBlogDetail(data);
        setTagOfBlog(tag);
        setStatus(status);
      } catch (error) {
        console.log("Failed to fetch blog list: ", error);
      }
    })();
  }, [location]);

  return (
    <div>
      <BlogContentDetail
        blog={blogDetail}
        tabOfBlog={tagOfBlog}
        statusList={status}
      />
    </div>
  );
}

export default BlogContentFeature;
