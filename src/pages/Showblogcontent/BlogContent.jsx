import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import blogApi from "../../services/blogApi";
import BlogStatusApi from "../../services/blogStatusApi";
import BlogContentDetail from "./components/BlogContentDetail";

BlogContentFeature.propTypes = {};

function BlogContentFeature(props) {
  const location = useLocation().search.substr(1);

  /*  const blogId = useRouteMatch().url.search; */

  const [blogDetail, setBlogDetail] = useState();
  const [tagOfBlog, setTagOfBlog] = useState();
  const [status, setStatus] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       // const data = await blogApi.get("9EC773D6-4520-EC11-B5F4-B0608858BC0D");
  //       const dataOfBlog = await blogApi.get(3);
  //       console.log("Data cua blog ne:", dataOfBlog)
  //       setBlogDetail(dataOfBlog.data);
  //       console.log("Data cua blog detail", blogDetail);
  //       const tag = await blogApi.getTagOfBlogById(3);
  //       tag.then((response) => setTagOfBlog(response.data));
  //     } catch (error) {
  //       console.log("Failed to fetch blog list: ", error);
  //     }
  //   })();
  // }, []);

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
