import React from 'react';
import { useSelector } from "react-redux";
import PageAlert from '../../../components/PageAlert/PageAlert';
import StorageKey from '../../../constant/storage-keys';
import NewCategory from './FormComponent/NewCategory';
import NewField from './FormComponent/NewField';


function AddFieldOrCategoryPage(props) {
  const currentUser = useSelector((state)=>state.admin.current);
  return (
    currentUser.role === StorageKey.adminRole ?
    <div className = "w-10/12 mx-auto mt-3">
      <div className = "grid grid-cols-2">
        <div className = "col-span-1 w-full mx-auto">
          <NewField />
        </div>
        <div className = "col-span-1 w-full mx-auto">
          <NewCategory />
        </div>
      </div>
    </div>
    :
    <PageAlert
          title="Access Denied"
          description="You don't have permission to view this page!"
    />
  );
}

export default AddFieldOrCategoryPage;