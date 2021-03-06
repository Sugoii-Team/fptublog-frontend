import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputDialog from "../../../../components/Dialog/InputDialog";
import SubmitForm from "./UpdateUserDialog/SubmitForm/SubmitForm";

DashboardDetail.propTypes = {
  userList: PropTypes.array,
  dataOfUserToUpdate: PropTypes.func,

  onRemoveClick: PropTypes.func,
  onBanClick: PropTypes.func,
};

function DashboardDetail({
  userList,
  dataOfUserToUpdate,
  onBanClick,
}) {
  const image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrxuTQy4EFUjUFpOayaHu2VhS_0ziyq5sEfQ&usqp=CAU";
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [dataNeedUpdate, setDataNeedUpdate] = useState({});
  const [userInBanning, setUserInBanning] = useState({});
  const [isBanning, setIsBanning] = useState(false);

  const handleShowSubmitForm = (values) => {
    setShowSubmitForm(values);
  };

  const handleEditClick = (userData) => {
    setShowSubmitForm(true);
    setDataNeedUpdate(userData);
  };

  const handleBanAccount = (message) => {
    onBanClick(userInBanning.id, message);
    setIsBanning(false);
  };

  const handleDataOfFrom = (data) => {
    // console.log(data);
    dataOfUserToUpdate(data);
  };

  return (
    <div className="mt-3 p-10">
      <p className="text-center text-2xl mb-5">
        LIST ACCOUNTS
      </p>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="pr-12 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Update
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ban Account
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-center">
                  {userList.map((user, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.avatarUrl ? user.avatarUrl : image}
                              alt=""
                            />
                          </div>
                          <div className="ml-4 px-6">
                            <Link
                              to={`/profile?${user.id}`}
                              className="font-medium text-gray-900"
                            >
                              {user.firstName} {user.lastName}
                            </Link>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.role}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          EDIT
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() => {
                            setUserInBanning(user);
                            setIsBanning(true);
                          }}
                          className="text-yellow-300 hover:text-red-600"
                        >
                          BAN
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isBanning ? (
                <InputDialog
                  isCancel={() => setIsBanning(false)}
                  title="Banning account"
                  onSubmitReason={handleBanAccount}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {showSubmitForm ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onSubmit={() => handleShowSubmitForm(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-md">
              {/*content*/}
              <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold uppercase">
                    UPDATE USER ROLE
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex justify-center">
                    <SubmitForm
                      userInfo={dataNeedUpdate}
                      onCancelClick={handleShowSubmitForm}
                      dataOfFrom={handleDataOfFrom}
                    />
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default DashboardDetail;
