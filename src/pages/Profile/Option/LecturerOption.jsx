import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import lecturerApi from '../../../services/lecturerApi';

LecturerOption.propTypes = {
};

function LecturerOption({ userProfile }) {

  const { register, handleSubmit } = useForm();
  const [lecturerUser, setLecturerUser] = useState({});
  const [fieldOfLecturer, setFieldOfLecturer] = useState([]);
  const [listOfField, setListOfField] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const lecturer = await lecturerApi.getLecturerById(userProfile.id);
        console.log("lecturer ne: ", lecturer);
        const lecturerField = await lecturerApi.getFieldOfLecturer(lecturer.data.id);
        const listOfField = await lecturerApi.getListOfField();

        setLecturerUser(lecturer.data);
        setFieldOfLecturer(lecturerField.data);
        console.log("field cua object ne: ", lecturerField.data);
        setListOfField(listOfField.data);
      } catch (error) {
        console.log("Failed to get profile: ", error);
      }
    })();
  }, [userProfile.id]);

  useEffect(() => {
    const lecturerOption = listOfField.map((field) => (
      {
        value: field.id,
        label: field.name,
      }
    ));
    console.log("lec option ne:", lecturerOption);
    setOptions(lecturerOption);
  }, [listOfField]);


  //Send data to API to update lecture profile: include data of lecturer and field of lecturer
  const handleLecturerDataToUpdate = async (data) => {
    if(userProfile.role === "LECTURER"){
      try {
        const lectureInfo = {
          firstName: data.firstName ? data.firstName : null,
          lastName : data.lastName ? data.lastName : null,
          alternativeEmail: data.alternativeEmail ? data.alternativeEmail : null,
          description: data.description ? data.description : null,
        }
        const reponseProfile = await lecturerApi.updateLecturerProfile(userProfile.id, lectureInfo);
        const fields = data.field.map((field) => (

          {
            id: field,
          }

        )
        );
        console.log("field ne: ", fields);
        const repsonseField = await lecturerApi.updateLecturerField(userProfile.id,fields);

        if(reponseProfile.status === 200 && repsonseField.status === 200){
          window.alert("Update Lecturer Profile successfully");
        }
      } catch (error) {
        console.log("Fail to update Lecturer profile", error);
      }
    }
  }

  //Check similarity between option and field of lecturer to check checkbox
  const handleChecked = (option) =>{
    let check = fieldOfLecturer.filter(field => {
      return field.name === option.label
    })

    return check.length > 0 ? true : false;
  }

  return (
    <form onSubmit={handleSubmit(handleLecturerDataToUpdate)}>
      {/* first name and last name row */}
      <div className="flex flex-wrap -mx-3 mb-6">
        {/* first name */}
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
            First Name
          </label>
          <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"  {...register("firstName")} placeholder={userProfile.firstName} />
          {/* <p className ="text-red-500 text-xs italic">Please fill out this field.</p> */}
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

      {userProfile.role === "LECTURER" ?
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
              FIELD OF LECTURER:
            </label>
            <div className="border-4 rounded-md mt-3">
              {options !== null ?
                options.map((option,idx) =>
                  <div key={idx} className="ml-11 text-xl my-3 center" >
                        {fieldOfLecturer && 
                        <div>
                          <input type="checkbox" 
                            value={option.value}
                            defaultChecked = {handleChecked(option)}
                            {...register("field")}/>
                          <span className="ml-7">{option.label}</span>
                        </div> }
                  </div>)
                :
                null
              }
            </div>

            {/* <Controller
              name="Checkbox"
              // control={control}
              render={({ field }) => (
                <Checkbox
                  onChange={(e) => field.onChange(e.target.checked)}
                  checked={field.value}
                />
              )}
            /> */}
          </div>
        </div>
        :
        null
      }

      <div className="flex flex-row-reverse">
          <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full" type="submit">
            Save
          </button>
      </div>
    </form>
  );
}

export default LecturerOption;