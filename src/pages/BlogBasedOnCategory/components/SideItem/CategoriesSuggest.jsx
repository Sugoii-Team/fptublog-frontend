import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

CategoriesSuggest.propTypes = {
  length: PropTypes.number,
};

CategoriesSuggest.defaultProps = {
  length: 4,
};

function CategoriesSuggest({ categoriesList }) {
  let listCategoriesToShowOnHomePage = null;
  categoriesList !== undefined ? 
    listCategoriesToShowOnHomePage = categoriesList.slice(0,5)
    :
    listCategoriesToShowOnHomePage = null;
  return (
    <div className="mt-8">
      <div className="h-full">
        {/* <!-- First side Items --> */}
        {(listCategoriesToShowOnHomePage !== null) ?
        <div className="w-full">
          <div className="text-center text-lg uppercase font-medium">
            <span className="">Categories</span>
            <div className="border-t-2 border-gray-300 w-8 flex mx-auto"></div>
          </div>
          <div className="flex justify-center mt-4">
            <ul>             
               {listCategoriesToShowOnHomePage.map((category, index) => (
                <li key = {index} className="w-80 my-1">
                  <div  className="py-3 text-center text-sm font-medium uppercase bg-gray-50 shadow-sm hover:bg-gray-200 
                  cursor-pointer transition ease-in-out duration-100 rounded-md mt-1">
                  <Link
                    to = {{
                      pathname: '/',
                      state:{
                        category : {category}
                      }
                    }}
                  >
                    {category.name}
                  </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        :null}
        {/* <!-- First side Items --> */}
      </div>
    </div>
  );
}

export default CategoriesSuggest;
