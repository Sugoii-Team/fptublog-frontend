import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import NewBlogForm from "../../components/form-controls/NewBlogForm";
import blogApi from "../../services/blogApi";

function UpdateBlog(props) {
  const [blogDetail, setBlogDetail] = useState();

  const location = useLocation().search.substr(1);

  useEffect(() => {
    (async () => {
      try {
        const data = await blogApi.get(location);
        setBlogDetail(data);
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
        isUpdate={true}
      />
    </div>
  );
}

export default UpdateBlog;
