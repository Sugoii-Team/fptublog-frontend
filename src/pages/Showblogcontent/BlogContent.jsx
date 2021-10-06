import React, { useEffect, useState } from 'react';
import blogApi from '../../services/blogApi';
import BlogContentDetail from './components/BlogContentDetail';




BlogContentFeature.propTypes = {
};

function BlogContentFeature(props) {

  const [blogDetail, setBlogDetail] = useState();
  const [tagOfBlog, setTagOfBlog] = useState();

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
        const data = await blogApi.get("E3F0423E-F36B-1410-892A-008CAF34AFE2");
        // const dataOfBlog = await blogApi.get(3);
        
        const tag = await blogApi.getTagOfBlogById("E3F0423E-F36B-1410-892A-008CAF34AFE2");
        // const tag = await blogApi.getTagOfBlogById(3);

        setBlogDetail(data);
        setTagOfBlog(tag);
      } catch (error) {
        console.log("Failed to fetch blog list: ", error);
      }
    })();
  }, []);
  


  return (

    <div>
       <BlogContentDetail blog={blogDetail} tabOfBlog = {tagOfBlog}　/>
    </div>
  );
}

export default BlogContentFeature;