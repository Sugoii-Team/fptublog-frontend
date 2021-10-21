import { motion } from "framer-motion";
import React from "react";

CategoriesShow.propTypes = {};

function CategoriesShow(props) {
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 20, opacity: 0 }}
      className="bg-gray-50 w-full h-96 border-b-2 border-gray-300 shadow-lg absolute z-40"
    >
      <div className="flex justify-center ">
        <div className="grid grid-cols-5 pt-10 w-3/4 text-sm text-secondary font-bold ">
          <div className="text-left ">
            <div className="borderForCategories">Software Engineer</div>
            <div>
              <ul className="grid grid-rows-4text-sm font-normal">
                <li className="mt-2">Java Script</li>
                <li className="mt-2">PHP</li>
                <li className="mt-2">Web Design For Everybody</li>
              </ul>
            </div>
          </div>
          <div className="text-left">
            <div className="borderForCategories">Software Engineer</div>
          </div>
          <div className="text-left">
            <div className="borderForCategories">Software Engineer</div>
          </div>
          <div className="text-left">
            <div className="borderForCategories">Software Engineer</div>
          </div>
          <div className="text-left">
            <div className="borderForCategories">Software Engineer</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CategoriesShow;
