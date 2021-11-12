import PropTypes from "prop-types";
import React from "react";
import Blog from "./Blog";

BlogsBelongToCategoryList.propTypes = {
  data: PropTypes.array,
};

BlogsBelongToCategoryList.defaultProps = {
  data: [],
};

function BlogsBelongToCategoryList({ data }) {
  /* const [pageNumber, setPageNumber] = useState(0);
  const blogPerPage = 6;
  const pagesVisited = pageNumber * blogPerPage;
  const displayBlog = data.slice(pagesVisited, pagesVisited + blogPerPage);
  const pageCount = Math.ceil(data.length / blogPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo(0, 550);
  }; */
  return (
    <div>
      {data !== null ? (
        <div className="justify-center">
          {data?.map((blog, index) => (
            <div key={index}>
              <Blog blog={blog} />
            </div>
          ))}
        </div>
      ) : (
        <div>We are under mainternance</div>
      )}
    </div>
  );
}

export default BlogsBelongToCategoryList;
