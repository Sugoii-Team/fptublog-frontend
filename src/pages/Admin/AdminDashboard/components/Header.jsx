import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserDropDownMenu from '../../../../components/Header/UserDropDownMenu';
import Login from '../../../../services/Auth/components/Login/Login';

function DashboardHeader(props) {

  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const userImg = loggedInUser.avatarUrl;

  const [showModal, setShowModal] = useState(false);
  const [isToggleLogginUser, setisToggleLogginUser] = useState(false);

  const handleLoginOnclick = () => {
    setShowModal(!showModal);
  };

  const toggleUserMenu = () => {
    setisToggleLogginUser(!isToggleLogginUser);
  };

  const handleCancelOnclick = (values) => {
    setShowModal(values);
  }

  return (
    <div>
      <div className="border-b-2 border-gray-600 lg:border-0 h-36">
        <div className="py-14 grid grid-cols-3">

          {/* <!-- Brand --> */}
          <div className="grid col-start-2 col-end-2 text-center">
            <Link to="/" className="text-4xl uppercase font-bold">
              FPTU Blog
            </Link>
          </div>

          {/* <!-- User --> */}
          <div className="gap-2 pt-2 lg:ml-0 justify-self-center ml-10">
            
            {/* <!-- User icon  --> */}
            {!isLoggedIn && (
              <div
                className="col-start-3 userIcon cursor-pointer"
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
            {isLoggedIn && (
              /* User icon when logged in */
              <div className="cursor-pointer">
                <div onClick={toggleUserMenu}>
                  {userImg ? (
                    <div className="w-6 h-6">
                      <img
                        src={userImg}
                        alt="User's img"
                        className="rounded-full border-2 border-black"
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
                  <UserDropDownMenu userInfo={loggedInUser} />
                ) : null}

                {/* User Dropdown menu */}
              </div>
            )}
            {/* User field after logged in */}

          </div>
          {/* <!-- User --> */}
        </div>
      </div>

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
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="my-4" onSubmit = {()=>setShowModal(false)}>
                    <Login onCancelClick = {handleCancelOnclick} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default DashboardHeader;