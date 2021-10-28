import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import AnnouncementDialog from "../../components/AnouncementStatusDialog/AnnouncementDialog";
import adminApi from "../../services/adminApi";
import awardApi from "../../services/awardApi";
import blogApi from "../../services/blogApi";
import BlogStatusApi from "../../services/blogStatusApi";
import ratingApi from "../../services/ratingApi";
import BlogContentDetail from "./components/BlogContentDetail";

BlogContentFeature.propTypes = {};

function BlogContentFeature(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  const admin = useSelector((state) => state.admin.current);

  const location = useLocation().search.substr(1);
  const [blogDeleted, setBlogDeleted] = useState(false);
  const [blogDetail, setBlogDetail] = useState();
  const [ratedValue, setRatedValue] = useState(0);
  const [totalRated, setTotalRated] = useState(0);
  const [tagOfBlog, setTagOfBlog] = useState();
  const [status, setStatus] = useState([]);
  const [allAwardAvailable, setAllAwardAvailable] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);

  const [deletedStatus, setDeletedStatus] = useState(false);
  const [repsonseObject, setRepsonseObject] = useState({});

  //Load content of blog
  useEffect(() => {
    (async () => {
      try {
        const data = await blogApi.get(location);
        setBlogDetail(data);
      } catch (error) {
        //setBlogDeleted(true);
        console.log("Cannot load content of blog", error);
      }
    })();
  }, [blogDeleted, location]);

  useEffect(() => {
    //If blog is deleted then not allow to load api
    if (blogDeleted === false) {
      (async () => {
        try {
          // const data = await blogApi.get(location);
          const tag = await blogApi.getTagOfBlogById(location);
          const status = await BlogStatusApi.getStatus();
          const blograte = await ratingApi.getBlogRating(location);
          const awardResponse = await awardApi.getAllAward();

          //Only get rated star when user is logged in
          if (!!loggedInUser.id) {
            const ratedStar = await ratingApi.getUserRating(location);
            setRatedValue(ratedStar.data);
          }

          //setBlogDetail(data);
          setTagOfBlog(tag.data);
          setStatus(status);
          setTotalRated(blograte.data);
          setAllAwardAvailable(awardResponse.data);
        } catch (error) {
          console.log("Failed to fetch blog list: ", error);
        }
      })();
    } else if (blogDeleted === true) {
      return;
    }
  }, [location, loggedInUser.id, blogDeleted]);

  //Send blog id to adminApi to delete blog by blog id
  const handleDeleteBlog = async (id) => {
    try {
      const repsonse = await adminApi.deleteBlogById(id);
      setRepsonseObject(repsonse);
      setBlogDeleted(true);
      setDeletedStatus(true);
    } catch (error) {
      console.log("Fail to delete a blog", error);
    }
  };

  //handle OK click of announment dialog
  const handleAnnouncementDialogOKClick = (values) => {
    setDeletedStatus(values);
  };

  return (
    <div>
      {blogDeleted ? (
        <div></div>
      ) : (
        <BlogContentDetail
          admin={admin}
          blogDeletedClick={handleDeleteBlog}
          blog={blogDetail}
          tagOfBlog={tagOfBlog}
          statusList={status}
          ratedValue={ratedValue}
          totalRated={totalRated}
          allAwardAvailable={allAwardAvailable}
        />
      )}

      {deletedStatus ? (
        <AnnouncementDialog
          responseStatus={handleAnnouncementDialogOKClick}
          responseObject={repsonseObject}
        />
      ) : null}
    </div>
  );
}

export default BlogContentFeature;
