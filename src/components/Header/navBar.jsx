import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Login from "../../services/Auth/components/Login/Login";
import MyGoogleLogin from "../../services/Auth/components/LoginWithGoogle/GoogleLogin";
import { logout } from "../../services/Auth/userSlice";

NavBar.propTypes = {};

function NavBar(props) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;

  const [showCategories, setShowCategories] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isToggleLogginUser, setisToggleLogginUser] = useState(false);

  const handleCategoriesClick = () => {
    setShowCategories(!showCategories);
  };

  const handleLoginOnclick = () => {
    setShowModal(!showModal);
  };

  const handleLogOutClick = () => {
    const action = logout();
    dispatch(action);
  };

  const toggleUserMenu = () => {
    setisToggleLogginUser(!isToggleLogginUser);
  };

  return (
    /* Nav Wrapper */
    <div className="">
      <div className="border-b-2 border-gray-600 h-14 lg:h-auto lg:border-0">
        <div className="flex lg:justify-center p-2 lg:p-7 lg:mt-6 lg:mb-5 h-8 lg:h-1/3 w-full lg:gap-96">
          {/*Social icons */}
          <div className="hidden lg:flex pb-4 pt-2 gap-2">
            <svg
              className="w-5 h-5 fill-current"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <svg
              className="w-5 h-5 fill-current"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </div>
          {/* Social icons */}

          {/* <!-- Brand --> */}
          <div className="mr-auto lg:mr-0">
            <Link to="/" className="flex text-4xl uppercase font-bold">
              FPTU Blog
            </Link>
          </div>

          {/* <!-- User --> */}
          <div className="flex gap-2 pt-2 ml-auto lg:ml-0">
            {/* <!-- Search icon --> */}
            <div className="cursor-pointer">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {/* <!-- User icon  --> */}

            {!isLoggedIn && (
              <div
                className="userIcon cursor-pointer"
                onClick={handleLoginOnclick}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {/* <div className="userIconDropDown hidden text-sm mt-0.5 ml-1 p-1.5 absolute border-2 rounded gap-4 border-gray-500 border-opacity-80">
                <ul>
                  <li className="userLoginHover" id="loginButton">
                    Login
                  </li>
                  <li className="userLoginHover">Register</li>
                </ul>
              </div> */}
              </div>
            )}

            {isLoggedIn && (
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>

                <div className="border-2 absolute p-1 bg-gray-100">
                  <ul>
                    <li className="cursor-pointer">My Account</li>
                    <li className="cursor-pointer" onClick={handleLogOutClick}>
                      Log out
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* <!-- Burger Icon --> */}
            <div className="navbarBtn lg:hidden cursor-pointer">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
          </div>
          {/* <!-- User --> */}
        </div>
      </div>

      {/* Navigation bar */}
      <div className="navbarShow hidden lg:flex justify-center text-center lg:justify-around lg:mt-5 border-t-2 border-b-2 border-opacity-50 border-gray-300 w-full shadow-md">
        <ul className="lg:flex lg:p-3 lg:gap-28 uppercase text-sm w-screen lg:w-auto">
          <li className="navItemPadding">
            <Link to="/" className="navItemsHover">
              Home
            </Link>
          </li>
          <li className="navItemPadding">
            <Link
              to=""
              className="navItemsHover"
              onClick={handleCategoriesClick}
            >
              Categories
            </Link>
          </li>
          <li className="navItemPadding">
            <Link to="/" className="navItemsHover">
              Archives
            </Link>
          </li>
          <li className="navItemPadding">
            <Link to="/" className="navItemsHover">
              About
            </Link>
          </li>
          <li className="navItemPadding">
            <Link to="/createNewPost" className="navItemsHover">
              Post
            </Link>
          </li>
        </ul>
      </div>
      {/* Navigation bar */}

      {/* Category show */}
      {showCategories ? (
        <div className="bg-gray-100 w-full h-96 border-b-2 border-gray-300 absolute">
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
      ) : null}

      {/* Category show */}

      {/* Login Dialog */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-md">
              {/*content*/}
              <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold uppercase">Login</h3>
                  {/* <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button> */}
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div
                    className="flex justify-center"
                    onClick={handleLoginOnclick}
                  >
                    <MyGoogleLogin />
                  </div>
                  <div className="my-4">
                    <Login />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Login Now!
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* Login Dialog */}
    </div>
  );
}

export default NavBar;
