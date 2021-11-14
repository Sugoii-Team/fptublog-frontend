import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import Select from "react-select";
import userApi from '../../../services/userApi';

StudentOption.propTypes = {
};

function StudentOption({ userProfile, dataOfStudentToUpdate, studentProfile }) {

  const currentUser = useSelector((state) => state.user.current)
  const [studentUser, setStudentUser] = useState({});
  const [majorOfStudent, setMajorOfStudent] = useState({});
  const [listOfMajor, setListOfMajor] = useState([]);
  const { register, control, handleSubmit, setValue } = useForm();
  const [options, setOptions] = useState([]);
  const [editProfile, setEditProfile] = useState(false);

  const handleStudentDataToUpdate = (data) => {
    if (data.firstName === "") {
      data.firstName = null;
    } if (data.lastName === "") {
      data.lastName = null;
    } if (data.alternativeEmail === "") {
      data.alternativeEmail = null;
    } if (data.schoolYear === "") {
      data.schoolYear = null;
    } if (data.majorId === majorOfStudent) {
      data.majorId = null;
    }
    if (data.description === "") {
      data.description = null;
    }
    console.log("data ne:", data);
    dataOfStudentToUpdate(data);
    setEditProfile(false)
  }


  //get Student information base on userProfile id
  useEffect(() => {
    (async () => {
      try {
        const student = await userApi.getStudentById(userProfile.id);
        const studentMajor = await userApi.getStudentMajorByMajorId(student.data.majorId);
        const listOfMajor = await userApi.getMajorList();
        setStudentUser(student.data);
        studentProfile(student.data);
        setMajorOfStudent(studentMajor.data);
        setListOfMajor(listOfMajor.data);
      } catch (error) {
        console.log("Failed to get profile: ", error);
      }
    })();
  }, [userProfile.id, majorOfStudent.name]);

  useEffect(() => {
    const studentOption = listOfMajor.map((major) => (
      {
        value: major.id,
        label: major.name
      }
    ));
    setOptions(studentOption);
  }, [listOfMajor]);

  const handleEditProfileButtonClick = (values) => {
    setEditProfile(values);
  }

  return (
    <div>

      <form onSubmit={handleSubmit(handleStudentDataToUpdate)}>
        {(currentUser.id === userProfile.id && editProfile === true) ?
          <div>
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* first name */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                  First Name
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"  {...register("firstName")} placeholder={userProfile.firstName} />
              </div>
              {/* last name */}
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                  Last Name
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" {...register("lastName")} placeholder={userProfile.lastName} />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                  Email
                </label>
                <input className="h-11 appearance-none block w-full bg-gray-100 text-gray-600 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder={userProfile.email} disabled={true} />
                <p className="text-red-500 text-xs italic">You can not change this field !</p>
              </div>
            </div>

            {/* Alternative email */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                  ALTERNATIVE EMAIL
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" {...register("alternativeEmail")} placeholder={userProfile.alternativeEmail} />
                <p className="text-red-500 text-xs italic">Please check this infomation carefully before update !</p>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <div>
                  <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                    DESCRIPTION
                  </label>
                  {userProfile.description != null ?
                    <textarea className="appearance-none h-24 block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" {...register("description")} placeholder={userProfile.description} >
                    </textarea>
                    :
                    <textarea className="appearance-none h-24 block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Input your description to update." {...register("description")} />
                  }
                </div>
              </div>
            </div>

            {/* Major of student */}
            {userProfile.role === "STUDENT" ?
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    SCHOOL YEAR
                  </label>
                  <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" {...register("schoolYear")} placeholder={studentUser.schoolYear} />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    MAJOR OF STUDENT:
                  </label>
                  {majorOfStudent != null ?

                    <Controller
                      control={control}
                      // defaultValue={default_value}
                      name="field_name_product"
                      render={(value) => (
                        <Select
                          classNamePrefix="StudentOption"
                          options={options}
                          control={control}
                          value={options.find(option => option.value === value)}
                          onChange={(e) => setValue("majorId", e.value)}
                          placeholder={majorOfStudent.name}
                        />
                      )}
                    />

                    :
                    null
                  }

                </div>
              </div>
              :
              null
            }
          </div>
          :
          <div>
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* first name */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                  First Name
                </label>
                <p className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text">{userProfile.firstName}</p>
              </div>
              {/* last name */}
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                  Last Name
                </label>
                <p className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text">{userProfile.lastName}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                  Email
                </label>
                <p className="h-11 appearance-none block w-full bg-gray-100 text-gray-600 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">{userProfile.email} </p>
              </div>
            </div>

            {/* Alternative email */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                  ALTERNATIVE EMAIL
                </label>
                <p className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" {...register("alternativeEmail")}>{userProfile.alternativeEmail}</p>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <div>
                  <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                    DESCRIPTION
                  </label>
                  <p className="appearance-none h-24 block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    {userProfile.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Major of student */}
            {userProfile.role === "STUDENT" ?
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    SCHOOL YEAR
                  </label>
                  <p className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" {...register("schoolYear")}>{studentUser.schoolYear}</p>
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    MAJOR OF STUDENT:
                  </label>
                  <p className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" {...register("schoolYear")}>{majorOfStudent.name}</p>

                </div>
              </div>
              :
              null
            }
          </div>

        }

        {currentUser.id === userProfile.id ?
          <span>
            <div className= "relative">
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

    </div>
  );
}

export default StudentOption;