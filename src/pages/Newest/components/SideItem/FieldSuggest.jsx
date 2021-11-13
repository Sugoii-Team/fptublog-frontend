import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fieldApi from "../../../../services/fieldAPI";

FieldSuggest.propTypes = {
  length: PropTypes.number,
};

FieldSuggest.defaultProps = {
  length: 4,
};

function FieldSuggest() {
  const [listFieldsToShowOnHomePage, setListFieldsToShowOnHomePage] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const topField = await fieldApi.getTopFieldToSuggest();
        
        if (topField.status === 200) {
          setListFieldsToShowOnHomePage(topField.data.slice(0,5));
        }
      } catch (error) {
        console.log("Failed to fetch blog list: ", error);
      }
    })();
  }, []);
  
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
                  <div  className="py-3 text-center text-sm font-medium uppercase bg-gray-50 shadow-sm hover:bg-gray-200 
                  cursor-pointer transition ease-in-out duration-100 rounded-md mt-1">
                  {/* Go to blog list based on field */}
                  <Link
                    to = {{
                      pathname: '/blogBaseOnField',
                      state:{
                        field : {field}
                      }
                    }}
                    className = "px-3"
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
