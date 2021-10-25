import React from "react";
import PropTypes from "prop-types";

CategoriesSuggest.propTypes = {
  length: PropTypes.number,
};

CategoriesSuggest.defaultProps = {
  length: 4,
};

function CategoriesSuggest({ length }) {
  return (
    <div className="mt-8">
      <div className="h-full">
        {/* <!-- First side Items --> */}
        <div className="w-full">
          <div className="text-center text-lg uppercase font-medium">
            <span className="">Categories</span>
            <div className="border-t-2 border-gray-300 w-8 flex mx-auto"></div>
          </div>
          <div className="flex justify-center mt-4">
            <ul>
              {Array.from(new Array(length)).map((x, index) => (
                <li key={index} className="w-80 my-1">
                  <div
                    className="py-3 text-center text-xs font-medium uppercase bg-gray-50 shadow-sm hover:bg-gray-200 
                  cursor-pointer transition ease-in-out duration-100"
                  >
                    Categories
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <!-- First side Items --> */}
      </div>
    </div>
  );
}

export default CategoriesSuggest;
