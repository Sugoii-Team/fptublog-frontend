import React, { useEffect, useState } from "react";
import blogApi from "../../services/blogApi";
import BlogList from "./components/BlogList/BlogList";
import BlogPopular from "./components/PopularPost/BlogPopular";

HomePage.propTypes = {};

function HomePage(props) {
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await blogApi.getAll();
        setBlogList(data);
      } catch (error) {
        console.log("Failed to fetch blog list: ", error);
      }
    })();
  }, []);

  return (
    <div>
      <div className="mx-auto w-3/4 mt-10">
        <div className="grid grid-cols-3 gap-4">
          {/* Blog loader */}
          <div className="col-span-2 w-auto h-auto ">
            <div className="mb-4">
              <div className="text-lg font-medium uppercase">
                <span className="border-b-2 border-gray-300">Newest</span>
              </div>
            </div>

            <BlogList data={blogList} />
          </div>
          {/* Blog loader */}
          {/* Side Items */}
          <BlogPopular />
          {/* Side Items */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
