import PropTypes from "prop-types";
import React from "react";
import Blog from "./Blog";

BlogList.propTypes = {
  data: PropTypes.array,
};

BlogList.defaultProps = {
  data: [],
};

/* function ListBlog(props) {
  return (
    <li key={props.id}>
      <Blog blog={props.value} />
    </li>
  );
} */

function BlogList({ data }) {
  /* const blogList = data.map((blog) => <ListBlog key={blog.id} value={blog} />); */
  console.log("Data: " + data);
  return (
    <div>
      {data.map((blog, index) => (
        <div key={index}>
          <Blog blog={blog} />
        </div>
      ))}
    </div>
  );
}

export default BlogList;
