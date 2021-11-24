import PropTypes from "prop-types";
import React, { useState } from "react";
import InputDialog from "../../../components/Dialog/InputDialog";

MentorDashboardDetail.propTypes = {
  userList: PropTypes.array,
  // onRemoveClick: PropTypes.func,
  onBanClick: PropTypes.func,
};

function MentorDashboardDetail({ userList, onBanClick }) {
  const image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrxuTQy4EFUjUFpOayaHu2VhS_0ziyq5sEfQ&usqp=CAU";

  const [isBanning, setIsBanning] = useState(false);
  const [banUser, setBanUser] = useState({});

  // const handleRemoveClick = (user) => {
  //   confirmToRemoveOrBan = window.confirm("Are you sure to remove this user ?");
  //   if (confirmToRemoveOrBan === true) {
  //     onRemoveClick(user.id);
  //   } else return;
  // };

  const handleBanAccountClick = (reason) => {   
    onBanClick(banUser.id, reason);
  };


  return (
    <div className="mt-3 p-10">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <p className="text-center text-2xl">LIST STUDENTS</p>
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="pr-10 py-3 text-center text-xs  font-medium text-gray-500 uppercase tracking-wider"
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
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Remove Account
                    </th> */}
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
                        <div className="flex items-center pl-9">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.avatarUrl ? user.avatarUrl : image}
                              alt=""
                            />
                          </div>
                          <div className="ml-4 px-6">
                            <div className="font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
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
                      {/* <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button onClick={() => handleRemoveClick(user)} className="text-red-400 hover:text-red-600">
                          REMOVE
                        </button>
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() => {
                            setBanUser(user);
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
            </div>
          </div>
        </div>
      </div>
      {isBanning ? 
      (<InputDialog
          isCancel = {()=>setIsBanning(false)}
          title = "Banning student"
          onSubmitReason={handleBanAccountClick}  
      />)
    :
      null
    }
    </div>
  );
}

export default MentorDashboardDetail;
