import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from "../../services/Auth/adminSlice";
import { useDispatch } from "react-redux";

AdminDropDownMenu.propTypes = {
  admin: PropTypes.object.isRequired,
};

AdminDropDownMenu.defaultProps = {
  admin: {},
};

function AdminDropDownMenu({admin}) {
  const userRole = admin.role;
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
            to="/profile"
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
          >
            Hello{" "}
            <span className="font-semibold">
              {userRole}
            </span>
          </Link>
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

export default AdminDropDownMenu;
