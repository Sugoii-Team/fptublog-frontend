import PropTypes from "prop-types";
import React, { useState } from "react";
import Pagination from "react-paginate";
import Blog from "./Blog";

BlogList.propTypes = {
  data: PropTypes.array,
};

BlogList.defaultProps = {
  data: [],
};

function BlogList({ data }) {
  const [pageNumber, setPageNumber] = useState(0);
  const blogPerPage = 6;
  const pagesVisited = pageNumber * blogPerPage;
  const displayBlog = data.slice(pagesVisited, pagesVisited + blogPerPage);
  const pageCount = Math.ceil(data.length / blogPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo(0, 0);
  };
  return (
    <div>
      {data !== null ? (
        <div className="justify-center">
          {displayBlog?.map((blog, index) => (
            <div key={index}>
              <Blog blog={blog} />
            </div>
          ))}
          <Pagination
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            onPageChange={changePage}
            containerClassName={"flex gap-1 justify-center my-4"}
            pageLinkClassName={
              "border-r-2 border-l-2 px-5 py-2 font-semibold hover:bg-gray-100 transision ease-in duration-200"
            }
            previousLinkClassName={"font-bold uppercase mr-2"}
            nextLinkClassName={"font-bold uppercase ml-2"}
            breakLinkClassName={"font-bold uppercase px-4 py-2"}
            activeLinkClassName={"bg-gray-100"}
          />
        </div>
      ) : (
        <div>We are under mainternance</div>
      )}
    </div>
  );
}

export default BlogList;
