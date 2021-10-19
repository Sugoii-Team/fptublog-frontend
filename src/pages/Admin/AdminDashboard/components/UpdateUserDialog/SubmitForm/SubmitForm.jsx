import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";

SubmitForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancelClick: PropTypes.func,
  userInfo: PropTypes.object,
  dataOfFrom: PropTypes.func,
};

function SubmitForm({ userInfo, onCancelClick, dataOfFrom}) {
  const { register, handleSubmit, setValue } = useForm();

  const onHandleSubmit = (data) => {
    console.log(data);
    dataOfFrom(data);
  }


  const handleCancleClick = (values) => {
    onCancelClick(values);
  }

  return (
    <div>
      {/* about form submit */}
      <form className="w-full max-w-lg" onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            {/* <p className="hidden" ref = {register}>{userInfo.id}</p> */}
            <input className="hidden" type="text" {...register("id")} />
            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" >
              First Name
            </label>
            <p className="appearance-none block w-full bg-gray-200 text-gray-700 
          border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
              {userInfo.firstName}
            </p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" >
              Last Name
            </label>
            <p className="appearance-none block w-full bg-gray-200 text-gray-700 
          border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              {userInfo.lastName}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" >
              Email
            </label>
            <p className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
          rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              {userInfo.email}
            </p>
            <p className="text-red-400 text-sm text-center italic"> Please check all field above carefully before update role</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">

          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking text-center text-gray-700 text-xl font-bold mb-2">
              Role
            </label>
            <div className="relative">
              <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" {...register("role")}>
                {userInfo.role === "STUDENT" ?
                  <option>LECTURER</option> : <option>STUDENT</option>}
                {userInfo.role === "LECTURER" ?
                  <option>LECTURER</option> : <option>STUDENT</option>}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

          <div className="flex-auto space-x-7 mt-4">
            <button type="button" className="bg-blue-200 hover:bg-blue-400 text-gray-700 font-bold py-2 px-4 rounded-full" onClick={() => handleCancleClick(false)}>
              Cancel
            </button>

            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" type="submit"
              onClick={() => setValue("id", userInfo.id)}>
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SubmitForm;
