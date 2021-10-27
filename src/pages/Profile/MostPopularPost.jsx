import { motion } from "framer-motion";
import React from "react";

MostPopularPost.propTypes = {};

function MostPopularPost(props) {
  return (
    <div>
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 20, opacity: 0.5 }}
        className="col-span-2"
      >
        <div className="border-2 border-gray-100 rounded-lg shadow-lg min-h-screen">
          <h1 className="text-left font-bold text-xl mt-2 ml-5 uppercase ">
            Most Popular Post
          </h1>
          <div className="bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 animate-pulse"></div>
          <div className="bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 animate-pulse"></div>
          <div className="bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 animate-pulse"></div>
          <div className="bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 animate-pulse"></div>
          <div className="bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 animate-pulse"></div>
          <div className="bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 animate-pulse"></div>
          <div className="bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 animate-pulse"></div>
          <div className="bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 animate-pulse"></div>
        </div>
      </motion.div>
    </div>
  );
}

export default MostPopularPost;
