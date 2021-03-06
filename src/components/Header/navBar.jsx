import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import StorageKey from "../../constant/storage-keys";
import Login from "../../services/Auth/components/Login/Login";
import MyGoogleLogin from "../../services/Auth/components/LoginWithGoogle/GoogleLogin";
import Notification from "../Notifications/Notification";
import AdminDropDownMenu from "./AdminDropDownMenu";
import CategoriesShow from "./CategoriesShow";
import UserDropDownMenu from "./UserDropDownMenu";

NavBar.propTypes = {};
function NavBar({ fieldList, categoriesList }) {
  const adminLoggedIn = useSelector((state) => state.admin.current);
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const userImg = loggedInUser.avatarUrl;

  const history = useHistory();
  const [showCategories, setShowCategories] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isToggleLogginUser, setisToggleLogginUser] = useState(false);
  const [isToggleNotification, setIsToggleNotification] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [currentScrollPostion, setCurrentScrollPostion] = useState(0);

  //Handle Scroll Event to set up nav bar
  useEffect(() => {
    window.onscroll = () => {
      setCurrentScrollPostion(window.pageYOffset);
    };
    if (currentScrollPostion < 10) {
      setIsScrolled(false);
    } else {
      setIsScrolled(true);
    }
  }, [currentScrollPostion]);

  const handleCategoriesClick = (values) => {
    setShowCategories(values);
  };
  //Send search value to url
  const handleSearch = () => {
    history.push(`/searchResult?${searchValue}`);
  };

  const handleLoginOnclick = () => {
    setShowModal(!showModal);
  };

  const handleCancelOnclick = (values) => {
    setShowModal(values);
  };

  const toggleUserMenu = () => {
    setisToggleLogginUser(!isToggleLogginUser);
  };

  return (
    /* Nav Wrapper */
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className=""
    >
      <div
        className={
          isScrolled
            ? "invisible border-b-2 border-gray-600 h-14 lg:h-auto lg:border-0"
            : "visible border-b-2 border-gray-600 h-14 lg:h-auto lg:border-0"
        }
      >
        <div className="flex lg:justify-center p-2 lg:p-7 lg:mt-6 lg:mb-5 h-8 lg:h-1/3 w-full lg:gap-96">
          {/*Social icons */}
          <div className="hidden lg:flex pb-4 pt-2 gap-2">
            <svg
              className="w-6 h-6 fill-current"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>

            {/* <!-- Search Section --> */}
            <div className="relative">
              {isSearching ? (
                <div className="flex flex-row">
                  {/* This help reduce component jumping when text box appear */}
                  <div className="invisible"> OO</div>
                  <motion.div
                    animate={{ x: 0, opacity: 1 }}
                    initial={{ x: -15, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-2 border-gray-600 rounded-sm shadow-sm absolute left-1"
                  >
                    {/* Search Box */}
                    <div className="relative flex flex-row">
                      {/* Input TextBox */}
                      <input
                        type="text"
                        className="px-1"
                        onInput={(e) => setSearchValue(e?.target.value)}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") handleSearch();
                        }}
                      />
                      {/* Search Icon in Text Box*/}
                      <svg
                        className="h-4 w-4 cursor-pointer absolute right-4 hover:text-blue-500 inset-y-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={() => handleSearch()}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      {/* Cancel Icon in Text Box */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 absolute right-0 cursor-pointer hover:text-red-500 inset-y-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={() => {
                          setIsSearching(false);
                          setSearchValue("");
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <>
                  {/* Search Icon */}
                  <svg
                    className="h-6 w-6 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => setIsSearching(true)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </>
              )}
            </div>
          </div>

          {/* <!-- Brand --> */}
          <div className="mr-auto lg:mr-0">
            <Link to="/" className="flex text-4xl uppercase font-bold">
              FPTU Blog
            </Link>
          </div>

          {/* <!-- User --> */}
          <div className="flex gap-2 pt-2 ml-auto lg:ml-0 relative">
            {/* Notification Icon */}
            <div>
              {/* <div className="relative">
                <span className="absolute rounded-full h-2 w-2 right-0 top-0 bg-red-500"></span>
                <span className="absolute rounded-full h-2 w-2 right-0 top-0 animate-ping bg-red-500"></span>
              </div> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => setIsToggleNotification(!isToggleNotification)}
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              {isToggleNotification ? <Notification /> : null}
            </div>
            {/* Social icons */}

            {/* <!-- User icon  --> */}
            {!isLoggedIn && !(adminLoggedIn.role === StorageKey.adminRole) && (
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
              </div>
            )}

            {/* User field after logged in */}
            {(isLoggedIn || adminLoggedIn.role === StorageKey.adminRole) && (
              /* User icon when logged in */
              <div className="cursor-pointer">
                <div onClick={toggleUserMenu}>
                  {userImg ? (
                    <div className="w-6 h-6">
                      <img
                        src={userImg}
                        alt="User's img"
                        className="rounded-full w-6 h-6 border-2 border-black"
                      />
                    </div>
                  ) : (
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
                  )}
                </div>

                {/* User Dropdown menu */}
                {isToggleLogginUser ? (
                  adminLoggedIn.role === StorageKey.adminRole ? (
                    <AdminDropDownMenu admin={adminLoggedIn} />
                  ) : (
                    <UserDropDownMenu userInfo={loggedInUser} />
                  )
                ) : null}

                {/* User Dropdown menu */}
              </div>
            )}
            {/* User field after logged in */}

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
            {/* <!-- Burger Icon --> */}
          </div>
          {/* <!-- User --> */}
        </div>
      </div>

      {/* Navigation bar */}
      <div
        className={
          isScrolled
            ? "navbarShow fixed -top-5 bg-white z-50 hidden lg:flex justify-center text-center lg:justify-around lg:mt-5 border-t-2 border-b-2 border-opacity-50 border-gray-300 w-full shadow-md"
            : "navbarShow hidden lg:flex justify-center text-center lg:justify-around lg:mt-5 border-t-2 border-b-2 border-opacity-50 border-gray-300 w-full shadow-md"
        }
      >
        <ul className="lg:flex lg:p-3 lg:gap-28 uppercase text-sm w-screen lg:w-auto">
          <li className="navItemPadding">
            <Link to="/" className="navItemsHover">
              Home
            </Link>
          </li>
          <li className="navItemPadding">
            <span
              className="navItemsHover cursor-pointer"
              onClick={() => handleCategoriesClick(!showCategories)}
            >
              Fields
            </span>
          </li>
          <li className="navItemPadding">
            <Link to="/about" className="navItemsHover">
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
        <CategoriesShow
          fieldList={fieldList}
          categoriesList={categoriesList}
          setShowCategories={handleCategoriesClick}
        />
      ) : null}
      {/* Category show */}

      {/* Login Dialog */}
      {showModal ? (
        <>
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-md">
              {/*content*/}
              <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold uppercase">Login</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 px-16 flex-auto">
                  <div
                    className="flex justify-center"
                    onClick={handleLoginOnclick}
                  >
                    <MyGoogleLogin />
                  </div>
                  <div className="my-4" onSubmit={() => setShowModal(false)}>
                    <Login onCancelClick={handleCancelOnclick} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* Login Dialog */}
    </motion.div>
  );
}

export default NavBar;
