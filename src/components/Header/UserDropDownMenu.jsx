import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from "../../services/Auth/userSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

UserDropDownMenu.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

UserDropDownMenu.defaultProps = {
  userInfo: {},
};

function UserDropDownMenu(props) {
  const loggedInUser = props.userInfo;
  const userRole = loggedInUser.role;
  const dispatch = useDispatch();
  const handleLogOutClick = () => {
    const action = logout();
    dispatch(action);
  };

  return (
    <motion.div
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: -10, opacity: 0 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{ duration: 0.12 }}
    >
      <div className="absolute inline-block text-left z-50">
        <div
          className="origin-top-right absolute -right-5 w-56 rounded-md shadow-lg  bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <Link
              to={`/profile?${loggedInUser.id}`}
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Hello{" "}
              <span className="font-semibold hover:text-gray-400">
                {loggedInUser.firstName + " " + loggedInUser.lastName}
              </span>
            </Link>
          </div>
          <div className="py-1" role="none">
            <Link
              to="/OwnBlog"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Posted Blog
            </Link>
            <Link
              to="/createNewPost"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Post New Blog
            </Link>
            {userRole === "LECTURER" ? (
              <div>
                <>
                  <Link
                    to="/approval"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-2"
                  >
                    Approve Blog
                  </Link>
                  <Link
                    to="/giveAward"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-2"
                  >
                    Give Awards
                  </Link>
                </>
                <Link
                  to="/mentorDashboard"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-2"
                >
                  Student Management
                </Link>
                <Link
                  to="/studentBannedDashboard"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-2"
                >
                  Banned Student List
                </Link>
              </div>
            ) : null}
          </div>
          <div className="py-1" role="none">
            <div
              className="text-red-400 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-6"
              onClick={handleLogOutClick}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default UserDropDownMenu;
