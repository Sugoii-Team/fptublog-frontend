import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Pagination from "react-paginate";
import { useLocation } from "react-router";
import TagSuggest from "../../components/SuggestTag/TagSuggest";
import blogApi from "../../services/blogApi";
import fieldApi from "../../services/fieldAPI";
import BlogListSkeleton from "./components/MainItem/BlogListSkeleton";
import BlogsBelongToFieldList from "./components/MainItem/BlogsBelongToFieldList";
import BlogPopular from "./components/SideItem/BlogPopular";
import FieldSuggest from "./components/SideItem/FieldSuggest";

BlogByFieldHomePage.propTypes = {};

function BlogByFieldHomePage(props) {
  const location = useLocation();
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fields, setFields] = useState([]);
  //get field which is tranfered like a state when user click field suggest link from slide item
  const fieldState = location.state.field;
  const limitBlog = 5;


  //Get blog of field
  useEffect(() => {
    (async () => {
      try {
        //get top field to suggest in slide item
        const topField = await fieldApi.getTopFieldToSuggest();
        setFields(topField.data);

        // if location.state != undefined => get field from state => then get blogs belong to that field by field id
        if (location.state !== undefined) {
          setLoading(true);
          const blogByField = await blogApi.getBlogsByFieldId(
            fieldState.field.id,
            limitBlog,
            currentPage
          );
          // if it isn't have blogs in 2 or later page, setBlogList is empty (length = 0)
          if (blogByField.data.length === 0 && currentPage > 1) {
            setLoading(false);
            setBlogList([]);
          }
          else if (blogByField.data.length > 0) {
            setLoading(false);
            setBlogList(blogByField.data);
          } else {
            setLoading(false);
            setBlogList([]);
          }
        }
      } catch (error) {
        console.log("Failed to fetch blog list: ", error);
      }
    })();
  }, [
    currentPage,
    fieldState.field.id,
    location.state
  ]);


  const handleOnpageChange = (data) => {
    setCurrentPage(data.selected + 1); // Page count start at 1
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [location.state]);

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
                  Blogs about {fieldState.field.name} field:
                </span>
              </div>
            </div>
            {blogList.length === 0 ?
              currentPage === 1 ?
                (
                  <div className="mt-10">
                    <p className="text-center text-2xl">
                      This field not have blogs!
                    </p>
                    <p className="text-center text-2xl">
                      Let post your own blog in for this field.
                    </p>
                  </div>
                )
                :
                null

              :

              loading ?
                <BlogListSkeleton />
                :
                <BlogsBelongToFieldList data={blogList} />
            }

            {(blogList.length === 0 && currentPage === 1) ? null : (
              <Pagination
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={50}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                forcePage={currentPage - 1}
                onPageChange={handleOnpageChange}
                containerClassName={"flex gap-1 justify-center my-4"}
                pageLinkClassName={
                  "border-r-2 border-l-2 px-5 py-2 font-semibold hover:bg-gray-100 transision ease-in duration-200"
                }
                previousLinkClassName={"font-bold uppercase mr-2"}
                nextLinkClassName={"font-bold uppercase ml-2"}
                breakLinkClassName={"font-bold uppercase px-4 py-2"}
                activeLinkClassName={"bg-gray-100"}
              />
            )}
          </div>
          {/* Blog loader */}
          {/* Side Items */}
          <div className="col-span-1 border-l-2 min-h-screen">
            <BlogPopular />
            {fields != null ? <FieldSuggest fieldList={fields} /> : null}
            <TagSuggest />
          </div>
          {/* Side Items */}
        </div>
      </div>
    </motion.div>
  );
}

export default BlogByFieldHomePage;
