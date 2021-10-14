import React from "react";
import { Link } from "react-router-dom";

AsideBlogContent.propTypes = {};

function AsideBlogContent(props) {
  return (
    <div>
      {/* about another blogs */}
      <div>
        {/* <!-- blog 1 --> */}
        <div className="grid grid-cols-3 mb-4 gap-3">
          <div className="my-9 relative col-span-1 flex justify-center">
            <Link to="">
              <img
                className="box-border h-32 w-32 p-4 border-4 text-xs"
                src="http://placehold.it/70x70"
                alt="the blog"
              />
            </Link>
          </div>
          <div className="col-span-2">
            <Link className="font-bold text-xl" to="">
              Title của bài blog
            </Link>
            <p className="text-lg text-justify">
              mô tả bài blog - Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Suscipit laboriosam expedita doloribus non,
              voluptatum eligendi sunt quas veritatis repudiandae dolor.
            </p>
          </div>
        </div>

        {/* <!-- blog 2 --> */}
        <div className="grid grid-cols-3 mb-4 gap-3 mt-5">
          <div className="my-9 relative col-span-1 flex justify-center">
            <Link to="">
              <img
                className="box-border h-32 w-32 p-4 border-4 text-xs"
                src="http://placehold.it/70x70"
                alt="img of blog"
              />
            </Link>
          </div>
          <div className="col-span-2">
            <Link className="font-bold text-xl" to="">
              Title của bài blog
            </Link>
            <p className="text-lg text-justify">
              mô tả bài blog - Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Suscipit laboriosam expedita doloribus non,
              voluptatum eligendi sunt quas veritatis repudiandae dolor.
            </p>
          </div>
        </div>

        {/* <!-- blog 3 --> */}

        <div className="grid grid-cols-3 mb-4 gap-3 mt-5">
          <div className="my-7 relative col-span-1 flex justify-center">
            <Link to="">
              <img
                className="box-border h-32 w-32 p-4 border-4 text-xs"
                src="http://placehold.it/70x70"
                alt=""
              />
            </Link>
          </div>
          <div className="col-span-2">
            <Link className="font-bold text-xl" to="">
              Title của bài blog
            </Link>
            <p className="text-lg text-justify">
              mô tả bài blog - Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Suscipit laboriosam expedita doloribus non,
              voluptatum eligendi sunt quas veritatis repudiandae dolor.
            </p>
          </div>
        </div>
      </div>

      {/* <!-- Category and fields blog --> */}
      <div className="mt-10">
        <div className="text-center">
          <h3 className="text-3xl font-bold p-2">Categories</h3>
          <hr />
          <ul>
            <li className="my-2 text-xl">
              <Link to="" title="Nature">
                Nature
              </Link>
            </li>
            <li className="my-2 text-xl">
              <Link to="" title="Technology">
                Technology
              </Link>
            </li>
            <li className="my-2 text-xl">
              <Link to="" title="Travel">
                Travel
              </Link>
            </li>
            <li className="my-2 text-xl">
              <Link to="" title="Sport">
                Sport
              </Link>
            </li>
            <li className="my-2 text-xl">
              <Link to="" title="Lifestyle">
                Lifestyle
              </Link>
            </li>
          </ul>
        </div>
        {/* <!-- Widget : Categories /- --> */}
      </div>
    </div>
  );
}

export default AsideBlogContent;
