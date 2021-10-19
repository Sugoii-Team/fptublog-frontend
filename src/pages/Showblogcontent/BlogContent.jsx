import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import blogApi from "../../services/blogApi";
import BlogStatusApi from "../../services/blogStatusApi";
import ratingApi from "../../services/ratingApi";
import BlogContentDetail from "./components/BlogContentDetail";

BlogContentFeature.propTypes = {};

function BlogContentFeature(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  const location = useLocation().search.substr(1);
  // console.log("location ", location);

  /*  const blogId = useRouteMatch().url.search; */

  const [blogDetail, setBlogDetail] = useState();
  const [ratedValue, setRatedValue] = useState(0);
  const [totalRated, setTotalRated] = useState(0);
  const [tagOfBlog, setTagOfBlog] = useState();
  const [status, setStatus] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await blogApi.get(location);
        const tag = await blogApi.getTagOfBlogById(location);
        const status = await BlogStatusApi.getStatus();
        const blograte = await ratingApi.getBlogRating(location);
        //Only get rated star when user is logged in
        if (!!loggedInUser.id) {
          const ratedStar = await ratingApi.getUserRating(location);
          setRatedValue(ratedStar.data);
        }

        setBlogDetail(data);
        setTagOfBlog(tag);
        setStatus(status);
        setTotalRated(blograte.data);
      } catch (error) {
        console.log("Failed to fetch blog list: ", error);
      }
    })();
  }, [location, loggedInUser.id]);

  return (
    <div>
      <BlogContentDetail
        blog={blogDetail}
        tabOfBlog={tagOfBlog}
        statusList={status}
        ratedValue={ratedValue}
        totalRated={totalRated}
      />
    </div>
  );
}

export default BlogContentFeature;
