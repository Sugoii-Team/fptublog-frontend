import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import NewBlogForm from "../../components/form-controls/NewBlogForm";
import blogApi from "../../services/blogApi";
import tagsApi from "../../services/tagsApi";

function UpdateBlog(props) {
  const [blogDetail, setBlogDetail] = useState();
  const [tagsOfBlog, setTagsOfBlog] = useState([]);

  const location = useLocation().search.substr(1);

  useEffect(() => {
    (async () => {
      try {
        const data = await blogApi.get(location);
        const tagsResponse = await tagsApi.getTagsOfABlog(location);
        setBlogDetail(data.data);
        setTagsOfBlog(tagsResponse.data);
      } catch (error) {
        console.log("Failed to fetch blog list: ", error);
      }
    })();
  }, [location]);

  return (
    <div>
      <NewBlogForm
        Ftitle="Update Blog!!"
        BlogNeedUpdate={blogDetail}
        TagsOfBlog={tagsOfBlog}
        isUpdate={true}
      />
    </div>
  );
}

export default UpdateBlog;
