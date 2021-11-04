import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import blogApi from "../../services/blogApi";
import BlogList from "../Newest/components/MainItem/BlogList";
import BlogListSkeleton from "../Newest/components/MainItem/BlogListSkeleton";
import BlogPopular from "../Newest/components/SideItem/BlogPopular";
import CategoriesSuggest from "../Newest/components/SideItem/CategoriesSuggest";

SearchResult.propTypes = {};

function SearchResult(props) {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState([]);
  const searchValue = useLocation().search.substr(1);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const blogResponse = await blogApi.getBlogBySearchValue({
          currentPage: 1,
          limitBlog: 10,
          searchValue,
        });
        if (blogResponse.status === 200) {
          setBlogList(blogResponse.data);
          setLoading(false);
        }
      } catch (error) {
        console.log("Failed to get searched blog: ", error);
      }
    })();
  }, [searchValue]);
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mx-auto w-3/4 mt-10">
        <div className="grid grid-cols-3 gap-4">
          {/* Blog loader */}
          <div className="col-span-2 w-auto">
            <div className="mb-4">
              <div className="text-lg font-medium uppercase">
                <span className="border-b-2 border-gray-300">
                  Search Result
                </span>
              </div>
            </div>
            {loading ? (
              <BlogListSkeleton />
            ) : (
              <>
                {blogList.length > 0 ? (
                  <BlogList data={blogList} />
                ) : (
                  <div>No result found! </div>
                )}
              </>
            )}
            {/* <Pagination
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={50}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={""}
              containerClassName={"flex gap-1 justify-center my-4"}
              pageLinkClassName={
                "border-r-2 border-l-2 px-5 py-2 font-semibold hover:bg-gray-100 transision ease-in duration-200"
              }
              previousLinkClassName={"font-bold uppercase mr-2"}
              nextLinkClassName={"font-bold uppercase ml-2"}
              breakLinkClassName={"font-bold uppercase px-4 py-2"}
              activeLinkClassName={"bg-gray-100"}
            /> */}
          </div>
          {/* Blog loader */}
          {/* Side Items */}
          <div className="col-span-1 border-l-2 min-h-screen">
            <BlogPopular />
            <CategoriesSuggest />
          </div>
          {/* Side Items */}
        </div>
      </div>
    </motion.div>
  );
}

export default SearchResult;
