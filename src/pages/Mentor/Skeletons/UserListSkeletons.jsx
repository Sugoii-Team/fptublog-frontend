import { Skeleton } from "@mui/material";
import React from 'react';


UserListSkeletons.propTypes = {
  // userList: PropTypes.array,
  // dataOfUserToUpdate: PropTypes.func,

  // onRemoveClick: PropTypes.func,
  // onBanClick: PropTypes.func,
};



// function UserListSkeletons({ userList }) {
function UserListSkeletons() {
  return (
    <div className="mt-3 p-10">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="pr-12 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <Skeleton variant="text" className="w-16"/>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                    >
                      <Skeleton variant="text" className="w-16"/>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <Skeleton variant="text" className="w-16"/>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <Skeleton variant="text" className="w-16"/>
                    </th>
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <Skeleton variant="text" className="w-20"/>
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-center">
                 
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Skeleton animation="wave" variant="circular" width={40} height={40} />
                          </div>
                          <div className="ml-4 px-6">
                            <div className="font-medium text-gray-900"><Skeleton variant="text" className="w-52"/></div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500"> <Skeleton variant="text" className="w-56"/> </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                         <Skeleton variant="text" className="w-36"/>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <Skeleton variant="text" className="w-20"/>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <Skeleton variant="text" className="w-20"/>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <Skeleton variant="text" className="w-16"/>
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserListSkeletons;