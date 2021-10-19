import React from "react";
import NewBlogForm from "../../components/form-controls/NewBlogForm";

PostBlog.propTypes = {};

function PostBlog(props) {
  return (
    <div>
      <NewBlogForm Ftitle="Post New Blog!" />
    </div>
  );
}

export default PostBlog;
