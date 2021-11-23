import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

CategoriesShow.propTypes = {};

function CategoriesShow({ fieldList, categoriesList, setShowCategories }) {
  const handleOnFieldClick = (values) => {
    setShowCategories(values);
  };

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 20, opacity: 0 }}
      className="bg-gray-50 w-full min-h-96 border-b-2 border-gray-300 shadow-lg z-40 absolute grid grid-flow-row grid-cols-4 auto-rows-auto px-6 pt-4 pb-6"
    >
      {fieldList.map((field, idx) => (
        <div key={idx} className="text-sm ml-10">
          <div>
            <div
              className="text-left px-4 relative text-secondary font-bold mt-10 hover:text-gray-400 transition ease-in-out duration-150"
              key={idx}
            >
              <span className="borderForCategories text-lg">

                <Link to={{
                  pathname: '/blogBaseOnField',
                  state: {
                    field: { field }
                  }
                }}
                onClick={() => handleOnFieldClick(false)}
                className = "p-2 hover:bg-gray-200 hover: rounded-md transition duration-300 ease-in-out"
                >
                  {field.name}
                </Link>
              </span>
            </div>

            {categoriesList.map((category, idx) =>
              category.fieldId === field.id ? (
                <Link
                  to={{
                    pathname: "/blogBaseOnCategory",
                    state: {
                      field: { field },
                      category: { category },
                    },
                  }}
                  key={idx}
                  className="mt-2 ml-7 text-sm block hover:text-gray-400 transition ease-in-out duration-150 transform hover:scale-y-110"
                  onClick={() => handleOnFieldClick(false)}
                >
                  {category.name}
                </Link>
              ) : null
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default CategoriesShow;
