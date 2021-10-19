import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import adminApi from '../../../services/adminApi';
import DashboardDetail from './components/DashboardDetail';

DashboardPage.propTypes = {};

function DashboardPage(props) {
  const [user, setUser] = useState([]);
  const [reload, setReload] = useState();
  
  const [status, setStatus] = useState(false);
  const cancelButtonRef = useRef(null);

  const [responseObject, setResponseObject] = useState({});


  const handleUpdateUserRole = async (data) => {
    const updateUserRole = await adminApi.updateUserRole(data.id, data)
    console.log("UpdateUserRole ne: ", updateUserRole);
    if (updateUserRole.status === 200) {
      setStatus(true);
      setResponseObject(updateUserRole);
    }
    setReload({});
  }


  const handleRemoveClick = async (id) => {
    const deleteUser = await adminApi.removeAccountsById(id);
    console.log(deleteUser);
    if (deleteUser.status === 200) {
      setStatus(true);
      setResponseObject(deleteUser);
    }
    setReload({});
  };

  const handleBanAccountClick = async (id) => {
    const obj = { id: id };

    const banUser = await adminApi.banUser(id, obj);
    console.log(banUser);
    if (banUser.status === 200) {
      setStatus(true);
      setResponseObject(banUser);
    }
    setReload({});
  };

  useEffect(() => {
    (async () => {
      try {
        if (user.some) {
          setUser([]);
        }
        const accountsData = await adminApi.getAllAccounts();
        const allUser = accountsData.data;
        setUser(allUser);
      } catch (error) {
        console.log("Failed to fetch all user accounts: ", error);
      }
    })();
  }, [reload]);


  return (
    <div>
      {/* {isAdmin?  */}
      <DashboardDetail
        userList={user}
        dataOfUserToUpdate={handleUpdateUserRole}
        onRemoveClick={handleRemoveClick}
        onBanClick={handleBanAccountClick}
        />
       {/* : <p>You need permission to acces this page (ONLY FOR ADMIN !)</p> */}
    {/* } */}
      
      {/* Show annountment dialog */}
      {status ?
        <Transition.Root show={status} as={Fragment}>
          <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setStatus}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  {/* CONTENT OF THE ANNOUNMENT */}
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    
                    {responseObject.status === 200 ?
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full 
                          bg-green-200 sm:mx-0 sm:h-10 sm:w-10">
                          <CheckIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                        </div>
                        <div className="mt-5 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            {responseObject.data}
                          </Dialog.Title>
                        </div>
                      </div>

                      :

                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full 
                        bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-5 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            {responseObject.data}
                          </Dialog.Title>
                        </div>
                      </div>

                    }
                  </div>
                  {/* OK BUTTON */}
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 
                      bg-green-400 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 
                      focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setStatus(false)}
                    >
                      OK
                    </button>

                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        : null}
    </div>
  );
}

export default DashboardPage;