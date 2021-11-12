import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Pagination from "react-paginate";
import { useLocation } from "react-router";
import blogApi from "../../services/blogApi";
import fieldApi from "../../services/fieldApi";
import BlogList from "./components/MainItem/BlogList";
import BlogListSkeleton from "./components/MainItem/BlogListSkeleton";
import BlogPopular from "./components/SideItem/BlogPopular";
import FieldSuggest from "./components/SideItem/FieldSuggest";


HomePage.propTypes = {};

function HomePage(props) {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fields, setFields] = useState([]);
  const location = useLocation();

  const limitBlog = 6;

  //Get all Blogs
  useEffect(() => {
    (async () => {
      try {
        const topField = await fieldApi.getTopFieldToSuggest();
        setLoading(true);
        const response = await blogApi.getAll({ currentPage, limitBlog });
        if (response.status === 200) {
          setBlogList(response.data);
          setLoading(false);
          setFields(topField.data);
        }
      } catch (error) {
        console.log("Failed to fetch blog list: ", error);
      }
    })();
  }, [currentPage, location.state]);


  const handleOnpageChange = (data) => {
    console.log("data ne : ", data);
    setCurrentPage(data.selected + 1); // Page count start at 1
  };

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
                <span className="border-b-2 border-gray-300">Newest</span>
              </div>
            </div>
            {(loading || blogList === null) ? (
              blogList.length === 0 ?
              null
              :
              <BlogListSkeleton />
            ) : (
              <div>
                <BlogList data={blogList} />
              </div>
            )}
            <Pagination
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={50}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
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
          </div>
          {/* Blog loader */}
          {/* Side Items */}
          <div className="col-span-1 border-l-2 min-h-screen">
            <BlogPopular />
            {fields.some ?
              <FieldSuggest fieldList={fields} />
              :
              null
            }
          </div>
          {/* Side Items */}
        </div>
      </div>
    </motion.div>
  );
}

export default HomePage;
