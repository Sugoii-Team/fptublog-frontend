import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import blogApi from "../../services/blogApi";
import BlogList from "./components/BlogList/BlogList";
import BlogListSkeleton from "./components/BlogList/BlogListSkeleton";
import BlogPopular from "./components/PopularPost/BlogPopular";

HomePage.propTypes = {};

function HomePage(props) {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(true);

  //Get all Blogs
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await blogApi.getAll();
        if (response.status === 200) {
          setLoading(false);
        }
        setBlogList(response.data);
      } catch (error) {
        console.log("Failed to fetch blog list: ", error);
      }
    })();
  }, []);

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
            {loading ? <BlogListSkeleton /> : <BlogList data={blogList} />}
          </div>
          {/* Blog loader */}
          {/* Side Items */}
          <div className="col-span-1 border-l-2 min-h-screen">
            <BlogPopular />
          </div>
          {/* Side Items */}
        </div>
      </div>
    </motion.div>
  );
}

export default HomePage;
