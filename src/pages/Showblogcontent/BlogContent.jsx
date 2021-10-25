import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import AnnouncementDialog from "../../components/AnouncementStatusDialog/AnnouncementDialog";
import adminApi from "../../services/adminApi";
import blogApi from "../../services/blogApi";
import BlogStatusApi from "../../services/blogStatusApi";
import ratingApi from "../../services/ratingApi";
import BlogContentDetail from "./components/BlogContentDetail";

BlogContentFeature.propTypes = {};

function BlogContentFeature(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  const admin = useSelector((state)=> state.admin.current);

  const location = useLocation().search.substr(1);
  const [blogDeleted, setBlogDeleted] = useState(false);
  const [blogDetail, setBlogDetail] = useState();
  const [ratedValue, setRatedValue] = useState(0);
  const [totalRated, setTotalRated] = useState(0);
  const [tagOfBlog, setTagOfBlog] = useState();
  const [status, setStatus] = useState([]);


  const [deletedStatus, setDeletedStatus] = useState(false);
  const [repsonseObject, setRepsonseObject] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const data = await blogApi.get(location);
        setBlogDetail(data);
      } catch(error){
        setBlogDeleted(true)
        console.log("Cannot load content of blog", error);
      }
    }) ();
  },[blogDeleted]);

 
    useEffect(() => {
      if(blogDeleted === false){
      (async () => {
        try {
          // const data = await blogApi.get(location);
          const tag = await blogApi.getTagOfBlogById(location);
          const status = await BlogStatusApi.getStatus();
          const blograte = await ratingApi.getBlogRating(location);
          //Only get rated star when user is logged in
          if (!!loggedInUser.id) {
            const ratedStar = await ratingApi.getUserRating(location);
            setRatedValue(ratedStar.data);
          }
  
          // setBlogDetail(data);
          setTagOfBlog(tag);
          setStatus(status);
          setTotalRated(blograte.data);
        } catch (error) {
          console.log("Failed to fetch blog list: ", error);
      }
      })()
      } 
      else if(blogDeleted === true){
        return;
      };
    }, [location, loggedInUser.id]);


  //Send blog id to adminApi to delete blog by blog id
  const handleDeleteBlog = async (id) => {
    try {
      const repsonse = await adminApi.deleteBlogById(id);
      console.log("response ne: ", repsonse);
      setRepsonseObject(repsonse);
      setBlogDeleted(true);
      setDeletedStatus(true);
    } catch (error) {
      console.log("Fail to delete a blog", error);
    }
  }

  //handle OK click of announment dialog
  const handleAnnouncementDialogOKClick = (values) => {
    setDeletedStatus(values);
  }

  return (
    <div>
      {blogDeleted ?
      <p className= "text-center text-3xl mt-5">This blog has been deleted !</p>
      :
      <BlogContentDetail
        admin = {admin}
        blogDeletedClick={handleDeleteBlog}
        blog={blogDetail}
        tabOfBlog={tagOfBlog}
        statusList={status}
        ratedValue={ratedValue}
        totalRated={totalRated}
      />
    }

    {deletedStatus ? 
    <AnnouncementDialog 
      responseStatus={handleAnnouncementDialogOKClick} 
      responseObject={repsonseObject}/>
    : 
    null
    }
    </div>
  );
}

export default BlogContentFeature;
