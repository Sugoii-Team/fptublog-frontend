import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../../../services/blogApi";

TableItems.propTypes = {
  blog: PropTypes.object.isRequired,
};

TableItems.defaultProps = {
  blog: {},
};

function TableItems(props) {
  const singleBlog = props.blog;
  const [author, setAuthor] = useState({});
  const blogDetailUrl = `/blogdetail?${singleBlog.id}`;

  useEffect(() => {
    (async () => {
      try {
        const author = await blogApi.getAuthorById(singleBlog.authorId);
        setAuthor(author.data);
      } catch (error) {}
    })();
  }, [singleBlog.authorId]);

  return (
    <>
      <td className="w-full lg:w-auto p-3 text-gray-800 text-left border border-b block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          New Blog
        </span>
        <Link to={blogDetailUrl} className="font-bold">
          {singleBlog.title}
        </Link>
      </td>
      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          Author
        </span>
        <Link to="/users">{author.firstName + " " + author.lastName}</Link>
      </td>
      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          Status
        </span>
        <span className="rounded bg-yellow-500 py-1 px-3 text-xs font-bold">
          Pending
        </span>
      </td>
    </>
  );
}

export default TableItems;
