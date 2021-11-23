import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

FieldSuggest.propTypes = {
  length: PropTypes.number,
};

FieldSuggest.defaultProps = {
  length: 4,
};

function FieldSuggest({ fieldList }) {
  let listFieldsToShowOnHomePage = null;
  fieldList !== undefined ? 
    listFieldsToShowOnHomePage = fieldList.slice(0,5)
    :
    listFieldsToShowOnHomePage = null;
  return (
    <div className="mt-8">
      <div className="h-full">
        {/* <!-- First side Items --> */}
        {(listFieldsToShowOnHomePage !== null) ?
        <div className="w-full">
          <div className="text-center text-lg uppercase font-medium">
            <span className="">Popular field</span>
            <div className="border-t-2 border-gray-300 w-8 flex mx-auto"></div>
          </div>
          <div className="flex justify-center mt-4">
            <ul>             
               {listFieldsToShowOnHomePage.map((field, index) => (
                <li key = {index} className="w-80 my-1">
                  <div>
                  {/* Go to blog list based on field */}
                  <Link
                    to = {{
                      pathname: '/blogBaseOnField',
                      state:{
                        field : {field}
                      }
                    }}
                    className="py-3 text-center text-sm font-medium uppercase bg-gray-50 shadow-sm hover:bg-gray-200 
                    cursor-pointer transition ease-in-out duration-100 rounded-md mt-1 block"
                  >
                    {field.name}
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

export default FieldSuggest;
