import React from "react";
import PropTypes from "prop-types";

BlogPopular.propTypes = {
  length: PropTypes.number,
};

BlogPopular.defaultProps = {
  length: 4,
};

function BlogPopular({ length }) {
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
              {Array.from(new Array(length)).map((x, index) => (
                <li key={index}>
                  <div className="grid grid-cols-3 my-6 overflow-hidden">
                    <div className="col-span-1">
                      <img src="http://placehold.it/100x80" alt="" />
                    </div>
                    <div className="col-span-2 ml-3 grid-rows-3 relative">
                      <div className="text-sm row-span-2 absolute top-0">
                        Beautiful Landscape View of Rio de Janeiro
                      </div>
                      <div className="text-xs uppercase text-gray-500 row-span-1 absolute bottom-0">
                        March 6, 2021
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <!-- First side Items --> */}

        {/* <!-- Second Side Items --> */}
        <div></div>
        {/* <!-- Second Side Items --> */}
      </div>
    </div>
  );
}

export default BlogPopular;
