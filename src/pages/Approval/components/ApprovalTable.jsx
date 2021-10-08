import React from "react";
import TableItems from "./TableItems";
import PropTypes from "prop-types";

ApprovalTable.propTypes = {
  listReviewBlogs: PropTypes.array.isRequired,
};

ApprovalTable.defaultProps = {
  listReviewBlogs: [],
};

function ApprovalTable(props) {
  const ListBlog = props.listReviewBlogs;

  return (
    <div className="flex justify-center my-4">
      <table className="border-collapse w-10/12">
        <thead>
          <tr>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell w-3/4">
              New Blog
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Author
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {ListBlog.map((blog, index) => (
            <tr
              key={index}
              className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
            >
              <TableItems blog={blog} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApprovalTable;
