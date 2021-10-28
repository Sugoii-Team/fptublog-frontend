import React, { useState } from "react";
import TableItems from "./TableItems";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

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
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ApprovalTable;
