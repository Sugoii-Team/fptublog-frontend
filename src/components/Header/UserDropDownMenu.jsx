import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from "../../services/Auth/userSlice";
import { useDispatch } from "react-redux";

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
            to=""
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
          >
            Hello{" "}
            <span className="font-semibold">
              {loggedInUser.firstName + " " + loggedInUser.lastName}
            </span>
          </Link>
          <Link
            to="#"
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
          >
            Edit Profile
          </Link>
        </div>
        <div className="py-1" role="none">
          <Link
            to="#"
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-2"
          >
            Archive
          </Link>
          <Link
            to="#"
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-3"
          >
            Posted Blog
          </Link>
          {userRole === "LECTURER" ? (
            <Link
              to="/approval"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2"
            >
              Approve Blog
            </Link>
          ) : null}
        </div>
        <div className="py-1" role="none">
          <div
            className="text-gray-700 block px-4 py-2 text-sm"
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
  );
}

export default UserDropDownMenu;
