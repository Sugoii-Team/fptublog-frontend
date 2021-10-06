import React from 'react';

AsideBlogContent.propTypes = {};

function AsideBlogContent(props) {

  return (

    <div>

      {/* about another blogs */}
      <div>
        {/* <!-- blog 1 --> */}
        <div className="grid grid-cols-3 mb-4 gap-3">
          <div className="my-9 relative col-span-1 flex justify-center">
            <a href="">
              <img className="box-border h-32 w-32 p-4 border-4 text-xs"
                src="http://placehold.it/70x70" alt="the blog" />
            </a>

          </div>
          <div className="col-span-2">
            <a className="font-bold text-xl" href="#">Title của bài blog</a>
            <p className="text-lg text-justify">mô tả bài blog - Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Suscipit laboriosam expedita doloribus non, voluptatum eligendi sunt quas veritatis
              repudiandae dolor.</p>
          </div>
        </div>

        {/* <!-- blog 2 --> */}
        <div className="grid grid-cols-3 mb-4 gap-3 mt-5">
          <div className="my-9 relative col-span-1 flex justify-center">
            <a href="">
              <img className="box-border h-32 w-32 p-4 border-4 text-xs"
                src="http://placehold.it/70x70" alt="image of the blog" />
            </a>
          </div>
          <div className="col-span-2">
            <a className="font-bold text-xl" href="#">Title của bài blog</a>
            <p className="text-lg text-justify">mô tả bài blog - Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Suscipit laboriosam expedita doloribus non, voluptatum eligendi sunt quas veritatis
              repudiandae dolor.</p>
          </div>
        </div>

        {/* <!-- blog 3 --> */}

        <div className="grid grid-cols-3 mb-4 gap-3 mt-5">
          <div className="my-7 relative col-span-1 flex justify-center">
            <a href="">
              <img className="box-border h-32 w-32 p-4 border-4 text-xs"
                src="http://placehold.it/70x70" alt="image of the blog" />
            </a>
          </div>
          <div className="col-span-2">
            <a className="font-bold text-xl" href="#">Title của bài blog</a>
            <p className="text-lg text-justify">mô tả bài blog - Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Suscipit laboriosam expedita doloribus non, voluptatum eligendi sunt quas veritatis
              repudiandae dolor.</p>
          </div>
        </div>

      </div>



      {/* <!-- Category and fields blog --> */}
      <div className="mt-10">
        <div className="text-center">
          <h3 className="text-3xl font-bold p-2">Categories</h3>
          <hr />
          <ul>
            <li className="my-2 text-xl"><a href="" title="Nature">Nature</a></li>
            <li className="my-2 text-xl"><a href="" title="Technology">Technology</a></li>
            <li className="my-2 text-xl"><a href="" title="Travel">Travel</a></li>
            <li className="my-2 text-xl"><a href="" title="Sport">Sport</a></li>
            <li className="my-2 text-xl"><a href="" title="Lifestyle">Lifestyle</a></li>
          </ul>
        </div>
        {/* <!-- Widget : Categories /- --> */}
      </div>

    </div>
  );
}

export default AsideBlogContent;