import React, { useState } from "react";
import TableItems from "./TableItems";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";

ApprovalTable.propTypes = {
  listReviewBlogs: PropTypes.array.isRequired,
};

ApprovalTable.defaultProps = {
  listReviewBlogs: [],
};

function ApprovalTable(props) {
  const listBlog = props.listReviewBlogs;
  const [pageNumber, setPageNumber] = useState(0);
  const blogWattingApprovePerPage = 7;
  const pagesVisited = pageNumber * blogWattingApprovePerPage;
  const displayBlog = listBlog.slice(pagesVisited, pagesVisited+blogWattingApprovePerPage);
  const pageCount = Math.ceil(listBlog.length / blogWattingApprovePerPage);
  const changePage = ({selected}) => {
    setPageNumber(selected);
  } 

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -20, opacity: 0 }}
      className="flex flex-col w-11/12 mx-auto"
    >
      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="overflow-hidden sm:rounded-lg">
            <table className="w-full divide-y divide-gray-200 border-collapse mt-5 rounded-md table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="w-2/6 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="w-2/6 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th scope="col" className="w-1/6 relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayBlog.map((blog, index) => (
                  <TableItems key={index} blogObj={blog} />
                ))}
              </tbody>
            </table>
            <ReactPaginate 
            
              previousLabel = {"Previous"}
              nextLabel = {"Next"}
              pageCount = {pageCount}
              onPageChange = {changePage}
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
        </div>
      </div>
    </motion.div>
  );
}

export default ApprovalTable;
