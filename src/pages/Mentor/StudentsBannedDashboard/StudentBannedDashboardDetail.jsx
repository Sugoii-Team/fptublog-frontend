import PropTypes from "prop-types";
import React from 'react';


StudentBannedDashboardDetail.propTypes = {
  userList: PropTypes.array,
  // onRemoveClick: PropTypes.func,
  onUnbanClick: PropTypes.func,
};



function StudentBannedDashboardDetail({ userList, onUnbanClick }) {
  const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrxuTQy4EFUjUFpOayaHu2VhS_0ziyq5sEfQ&usqp=CAU";
  let confirmToRemoveOrBan = false;


  // const handleRemoveClick = (user) => {
  //   confirmToRemoveOrBan = window.confirm("Are you sure to remove this user ?");
  //   if (confirmToRemoveOrBan === true) {
  //     onRemoveClick(user.id);
  //   } else return;
  // };

  const handleUnbanAccountClick = (user) => {
    confirmToRemoveOrBan = window.confirm("Are you sure to ban this user ?");
    if (confirmToRemoveOrBan === true) {
      onUnbanClick(user.id);
    } else return;
  };


  return (
    <div className="mt-3 p-10">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <p className="text-center text-2xl my-10">LIST BANNED STUDENTS</p>
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
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={user.image ? user.image : image} alt="" />
                          </div>
                          <div className="ml-4 px-6">
                            <div className="font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
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
                        <button onClick={() => handleUnbanAccountClick(user)} className="text-yellow-300 hover:text-red-600">
                          UNBAN
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


    </div>
  )
}

export default StudentBannedDashboardDetail;