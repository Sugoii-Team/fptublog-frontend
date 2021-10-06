import PropTypes from "prop-types";
import React from "react";
import Blog from "./Blog";

BlogList.propTypes = {
  data: PropTypes.array,
};

BlogList.defaultProps = {
  data: [],
};

function BlogList({ data }) {
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
