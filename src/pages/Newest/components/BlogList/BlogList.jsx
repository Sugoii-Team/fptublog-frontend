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
  console.log("Data cua blog list", data);
  return (
    <div>
      {data !== null ? (
        data?.map((blog, index) => (
          <div key={index}>
            <Blog blog={blog} />
          </div>
        ))
      ) : (
        <div>We are under mainternance</div>
      )}
    </div>
  );
}

export default BlogList;
