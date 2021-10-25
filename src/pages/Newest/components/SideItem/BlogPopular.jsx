import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../../../../services/blogApi";
import BlogPopularSkeleton from "./BlogPopularSkeleton";

function BlogPopular({ length }) {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultThumbnails = "http://placehold.it/100x80";

  //Get all Blogs
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await blogApi.getTopRatedBlog();
        if (response.status === 200) {
          setLoading(false);
          setBlogList(response.data);
        }
      } catch (error) {
        console.log("Failed to fetch blog list: ", error);
      }
    })();
  }, []);

  return (
    <div className="">
      <div className="h-full">
        {/* <!-- First side Items --> */}
        <div className="w-full">
          <div className="text-center text-lg uppercase font-medium">
            <span className="">Popular Post</span>
            <div className="border-t-2 border-gray-300 w-8 flex mx-auto"></div>
          </div>
          <div className="flex justify-center mt-4">
            <ul>
              {loading ? (
                <BlogPopularSkeleton />
              ) : (
                blogList.map((blog) => (
                  <li key={blog.id}>
                    <div className="grid grid-cols-3 my-6 overflow-hidden">
                      <div className="col-span-1">
                        <img
                          src={
                            blog.thumbnailUrl
                              ? blog.thumbnailUrl
                              : defaultThumbnails
                          }
                          alt=""
                          className="min-w-minWForSidePic max-w-maxWForSidePic min-h-minHForSidePic max-h-maxHForSidePic rounded-sm"
                        />
                      </div>
                      <div className="col-span-2 ml-3 grid-rows-3 relative">
                        <Link
                          to={`blogDetail?${blog.id}`}
                          className="text-sm row-span-2 absolute top-0 font-semibold hover:text-gray-400 transition duration-150"
                        >
                          {blog.title}
                        </Link>
                        <div className="text-xs uppercase text-gray-500 row-span-1 absolute bottom-0">
                          {moment(blog.createdDateTime).format("LL")}
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        {/* <!-- First side Items --> */}
      </div>
    </div>
  );
}

export default BlogPopular;
