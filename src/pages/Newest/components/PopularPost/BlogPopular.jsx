import React from "react";

BlogPopular.propTypes = {};

function BlogPopular(props) {
  return (
    <div>
      <div className="border-l-2 h-full">
        {/* <!-- First side Items --> */}
        <div className="w-auto">
          <div className="text-center text-lg uppercase font-medium">
            <span className="border-b-2 border-gray-300">Popular Post</span>
          </div>
          <div className="flex justify-center mt-4">
            <ul>
              <li>Top rated's items</li>
              <li>Top rated's items</li>
              <li>Top rated's items</li>
              <li>Top rated's items</li>
              <li>Top rated's items</li>
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
