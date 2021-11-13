import { collection, doc, setDoc } from "@firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import AnnouncementDialog from "../../components/AnouncementStatusDialog/AnnouncementDialog";
import StorageKey from "../../constant/storage-keys";
import adminApi from "../../services/adminApi";
import awardApi from "../../services/awardApi";
import blogApi from "../../services/blogApi";
import BlogStatusApi from "../../services/blogStatusApi";
import { db } from "../../services/fireBase";
import ratingApi from "../../services/ratingApi";
import BlogContentDetail from "./components/BlogContentDetail";
import BlogContentSkeleton from "./components/Skeleton/BlogContentSkeleton";

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
  const [isLoading, setIsLoading] = useState(false);
  const [repsonseObject, setRepsonseObject] = useState({});

  //Load content of blog
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const blogContentResponse = await blogApi.get(location);
        if (blogContentResponse.status === 200) {
          setBlogDetail(blogContentResponse.data);
          setIsLoading(false);
        }
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
  const handleDeleteBlog = async (blogId, reason) => {
    try {
      const repsonse = await adminApi.deleteBlogById(blogId);
      setRepsonseObject(repsonse);
      setBlogDeleted(true);
      setDeletedStatus(true);

      let currentDate = moment().valueOf();
      //Create notification when reply comments
      const newNotiDocRef = doc(collection(db, "notifications")); // Create new doc to generate id
      const notiPayload = {
        id: newNotiDocRef.id, // Give field id by doc's id
        forUserId: blogDetail.authorId, //for first comment author
        fromUserId: StorageKey.ADMIN, //this is from admin
        message: reason,
        referenceId: blogDetail.id, // Give award so set student id to view profile
        status: StorageKey.unviewStatus,
        date: currentDate,
        type: StorageKey.deleteBlog, // Get constrain value from storage key
      };
      await setDoc(newNotiDocRef, notiPayload); // Update doc with some field
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
      {isLoading ? (
        <BlogContentSkeleton />
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
