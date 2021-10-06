import React from "react";

CategoriesShow.propTypes = {};

function CategoriesShow(props) {
  return (
    <div className="bg-gray-100 w-full h-96 border-b-2 border-gray-300 absolute z-40">
      <div className="flex justify-center ">
        <div className="grid grid-cols-5 pt-10 w-3/4 text-sm text-secondary font-bold ">
          <div className="text-left ">
            <div className="borderForCategories">Software Engineer</div>
            <div>
              <ul className="grid grid-rows-4text-sm font-normal">
                <li>Doi song</li>
                <li>Doi song</li>
                <li>Doi song</li>
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
    </div>
  );
}

export default CategoriesShow;
