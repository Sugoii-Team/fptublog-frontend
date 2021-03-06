import PropTypes from "prop-types";
import React from "react";
import adminApi from "../../../../services/adminApi";

BannedAccountList.propTypes = {
  listBannedAccounts: PropTypes.array.isRequired,
};

function BannedAccountList({ listBannedAccounts }) {
  const image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrxuTQy4EFUjUFpOayaHu2VhS_0ziyq5sEfQ&usqp=CAU";

  const handleUnbanAccount = async (bannedAccount) => {
    try {
      let check = window.confirm("Unban this user?");
      if (check) {
        const unbanResponse = await adminApi.unbanUser(bannedAccount.id, {});
        if (unbanResponse.status === 200) {
          alert("Unban Successfully!");
        }
      }
    } catch (error) {
      console.log("Failed to ban account: ", error);
    }
  };

  return (
    <div className="mt-3">
      <div className="flex flex-col">
        <p className="text-center text-2xl my-10 uppercase">
          List banned accounts
        </p>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="pr-14 py-3 text-center  text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                      Unbanned
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {listBannedAccounts.map((bannedAccount, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="ml-6 flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={
                                bannedAccount.image
                                  ? bannedAccount.image
                                  : image
                              }
                              alt=""
                            />
                          </div>
                          <div className="ml-4 px-6">
                            <div className="font-medium text-gray-900 text-center">
                              {bannedAccount.firstName} {bannedAccount.lastName}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-500">
                          {bannedAccount.email}
                        </div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                        {bannedAccount.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          className="text-yellow-400"
                          onClick={() => handleUnbanAccount(bannedAccount)}
                        >
                          Unbanned
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
  );
}

export default BannedAccountList;
