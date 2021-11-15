import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import adminApi from '../../../services/adminApi';
import lecturerApi from '../../../services/lecturerApi';

LecturerOption.propTypes = {
};

function LecturerOption({ userProfile, updateLecturerStatus }) {
  const idOfUserProfile = useLocation().search.substr(1);
  const currentUser = useSelector((state) => state.user.current);
  const { register, handleSubmit } = useForm();
  const [lecturerUser, setLecturerUser] = useState({});
  const [fieldOfLecturer, setFieldOfLecturer] = useState([]);
  const [listOfField, setListOfField] = useState([]);
  const [options, setOptions] = useState([]);
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const lecturer = await lecturerApi.getLecturerById(userProfile.id);
        const lecturerField = await lecturerApi.getFieldOfLecturer(lecturer.data.id);
        const listOfField = await lecturerApi.getListOfField();
        setLecturerUser(lecturer.data);
        setFieldOfLecturer(lecturerField.data);
        setListOfField(listOfField.data);
      } catch (error) {
        console.log("Failed to get profile: ", error);
      }
    })();
  }, [userProfile.id, editProfile, currentUser]);

  useEffect(() => {
    const lecturerOption = listOfField.map((field) => (
      {
        value: field.id,
        label: field.name,
      }
    ));
    setOptions(lecturerOption);
  }, [listOfField]);

  const handleEditProfileButtonClick = (values) => {
    setEditProfile(values);
  }

  //Send data to API to update lecture profile: include data of lecturer and field of lecturer
  const handleLecturerDataToUpdate = async (data) => {
    if (userProfile.role === "LECTURER") {
      try {
        if (currentUser.role === "ADMIN") {

          const fields = data.field.map((field) => (

            {
              id: field,
            }

          )
          );
          const repsonseField = await adminApi.updateLecturerField(userProfile.id, fields);
          if (repsonseField.status === 200) {
            window.alert("Update Lecturer field successfully");
            setEditProfile(!editProfile);
            updateLecturerStatus(true);
          } else {
            window.alert("Fail to update Lecturer field !!! Try again!");
          }

        } else {

          const lectureInfo = {
            firstName: data.firstName ? data.firstName : null,
            lastName: data.lastName ? data.lastName : null,
            alternativeEmail: data.alternativeEmail ? data.alternativeEmail : null,
            description: data.description ? data.description : null,
          }
          const reponseProfile = await lecturerApi.updateLecturerProfile(idOfUserProfile, lectureInfo);
          if (reponseProfile.status === 200) {
            window.alert("Update Lecturer Profile successfully");
            setEditProfile(!editProfile);
            updateLecturerStatus(true);
          } else {
            window.alert("Fail to update Lecturer Profile !!! Try again!");
          }
        }
      } catch (error) {
        console.log("Fail to update Lecturer profile", error);
      }
    }
  }

  //Check similarity between option and field of lecturer to check checkbox
  const handleChecked = (option) => {
    let check = fieldOfLecturer.filter(field => {
      return field.name === option.label
    })

    return check.length > 0 ? true : false;
  }

  return (
    <form onSubmit={handleSubmit(handleLecturerDataToUpdate)}>
      {(currentUser.id === userProfile.id && editProfile === true) || (currentUser.role === "ADMIN" && editProfile === true) ?
        <div>
          {/* first name and last name row */}
          <div className="flex flex-wrap -mx-3 mb-6">
            {/* first name */}
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                First Name
              </label>
              {/* ADMIN CANNOT CHANGE PROFILE OF USER (LECTURER ON THIS COMPONENT) */}
              {currentUser.role === "ADMIN" ?
                (<p className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text">
                  {lecturerUser.firstName}
                </p>)
                :
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"  {...register("firstName")} placeholder={lecturerUser.firstName} />
              }
            </div>

            {/* last name */}
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                Last Name
              </label>
              {/* ADMIN CANNOT CHANGE PROFILE OF USER (LECTURER ON THIS COMPONENT) */}
              {currentUser.role === "ADMIN" ?
                (<p className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text">
                  {lecturerUser.lastName}
                </p>)
                :
                (<input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" {...register("lastName")} placeholder={lecturerUser.lastName} />)
              }
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                Email
              </label>
              {currentUser.role === "ADMIN" ?
                <p className="h-11 appearance-none block w-full bg-gray-100 text-gray-600 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">{lecturerUser.email}</p>
                :
                <div>
                  <input className="h-11 appearance-none block w-full bg-gray-100 text-gray-600 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder={lecturerUser.email} disabled={true} />
                  <p className="text-red-500 text-xs italic">You can not change this field !</p>
                </div>
              }
            </div>
          </div>

          {/* Alternative email */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                ALTERNATIVE EMAIL
              </label>
              {/* ADMIN CANNOT CHANGE PROFILE OF USER (LECTURER ON THIS COMPONENT) */}
              {currentUser.role === "ADMIN" ?
                (<p className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" {...register("alternativeEmail")}>
                  {lecturerUser.alternativeEmail}
                </p>)
                :
                (<div>
                  <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" {...register("alternativeEmail")} placeholder={lecturerUser.alternativeEmail} />
                  <p className="text-red-500 text-xs italic">Please check this infomation carefully before update !</p>
                </div>)
              }
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div>
                <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                  DESCRIPTION
                </label>
                {/* ADMIN CANNOT CHANGE PROFILE OF USER (LECTURER ON THIS COMPONENT)*/}
                {currentUser.role === "ADMIN" ?
                  (<p className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    {lecturerUser.description}
                  </p>)
                  :
                  (lecturerUser.description != null ?
                    <textarea className="appearance-none h-24 block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" {...register("description")} placeholder={userProfile.description} >
                    </textarea>
                    :
                    <textarea className="appearance-none h-24 block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Input your description to update." {...register("description")} />
                  )
                }
              </div>
            </div>
          </div>

          {/*ONLY ADMIN CAN UPDATE FIELD OF LECTURER */}
          {currentUser.role === "ADMIN" ?
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                  FIELD OF LECTURER:
                </label>
                <div className="border-4 rounded-md mt-3">
                  {options !== null ?
                    options.map((option, idx) =>
                      <div key={idx} className="ml-11 text-xl my-3 center" >
                        {fieldOfLecturer &&
                          <div>
                            <input type="checkbox"
                              value={option.value}
                              defaultChecked={handleChecked(option)}
                              {...register("field")} />
                            <span className="ml-7">{option.label}</span>
                          </div>}
                      </div>)
                    :
                    null
                  }
                </div>
              </div>
            </div>
            :
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                  FIELD OF LECTURER:
                </label>
                <div>
                  {(fieldOfLecturer.length !== 0) ?
                    <ol className="ml-11 text-xl my-3 center">
                      {fieldOfLecturer.map((field, idx) =>
                        <li key={idx} className="mt-2">{field.name}</li>)}
                    </ol>
                    :
                    <p>This Lecturer not have field</p>
                  }
                </div>
              </div>
            </div>
          }
        </div>
        :
        // SHOW PROFILE FOR GUEST OR ANOTHER ACCOUNT
        <div>
          {/* first name and last name row */}
          <div className="flex flex-wrap -mx-3 mb-6">
            {/* first name */}
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                First Name
              </label>
              <p className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text">{lecturerUser.firstName}</p>
            </div>
            {/* last name */}
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                Last Name
              </label>
              <p className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text">{lecturerUser.lastName}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                Email
              </label>
              <p className="h-11 appearance-none block w-full bg-gray-100 text-gray-600 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">{lecturerUser.email}</p>
            </div>
          </div>

          {/* Alternative email */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                ALTERNATIVE EMAIL
              </label>
              <p className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">{lecturerUser.alternativeEmail}</p>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div>
                <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                  DESCRIPTION
                </label>
                <p className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">{lecturerUser.description}</p>
              </div>
            </div>
          </div>

          {userProfile.role === "ADMIN" ?
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                  FIELD OF LECTURER:
                </label>
                <div className="border-4 rounded-md mt-3">
                  {options !== null ?
                    options.map((option, idx) =>
                      <div key={idx} className="ml-11 text-xl my-3 center" >
                        {fieldOfLecturer &&
                          <div>
                            <input type="checkbox"
                              value={option.value}
                              defaultChecked={handleChecked(option)}
                              {...register("field")} />
                            <span className="ml-7">{option.label}</span>
                          </div>}
                      </div>)
                    :
                    null
                  }
                </div>
              </div>
            </div>
            :
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                  FIELD OF LECTURER:
                </label>
                <div>
                  {(fieldOfLecturer.length !== 0) ?
                    <ol className="ml-11 text-xl my-3 center">
                      {fieldOfLecturer.map((field, idx) =>
                        <li key={idx} className="mt-2">{field.name}</li>)}
                    </ol>
                    :
                    <p>This Lecturer not have field</p>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      }

      {/* ADMIN UPDATE FIELD, LECTURER UPDATE THEIR PROFILE */}
      {(currentUser.id === userProfile.id || currentUser.role === "ADMIN") ?
        <span>
          <div className="relative">
            <button type="button" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-full" onClick={() => handleEditProfileButtonClick(!editProfile)}>
              Edit Profile
            </button>
            {editProfile ?
              <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full absolute right-0" type="submit">
                Save
              </button>
              :
              null
            }
          </div>
        </span>
        :
        null
      }
    </form>
  );
}

export default LecturerOption;