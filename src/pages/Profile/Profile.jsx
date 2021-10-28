import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import lecturerApi from "../../services/lecturerApi";
import awardApi from "../../services/awardApi";
import userApi from "../../services/userApi";
import NameSectionSkeleton from "./NameSectionSkeleton";
import Select from "react-select";
import moment from "moment";

Profile.propTypes = {};

function Profile(props) {
  const userId = useLocation().search.substr(1);
  const [userProfile, setUserProfile] = useState({});
  const [profileAward, setProfileAward] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, setValue } = useForm();

  const [options, setOptions] = useState([]);

  const [studentUser, setStudentUser] = useState({});
  const [majorOfStudent, setMajorOfStudent] = useState({});
  const [listOfMajor, setListOfMajor] = useState([]);

  const [lecturerUser, setLecturerUser] = useState({});
  const [fieldOfLecturer, setFieldOfLecturer] = useState({});
  const [listOfField, setListOfField] = useState([]);

  const [listPopularBlog, setListPopularBlog] = useState([]);

  const [optionObject, setOptionObject] = useState({});
  const defaultThumnail = "http://geniussys.com/img/placeholder/blogpost-placeholder-100x100.png";


  useEffect(() => {
    const studentOption = listOfMajor.map((major) => (
      {
        value: major.id,
        label: major.name
      }
    ));
    setOptions(studentOption);
  }, [listOfMajor]);


  useEffect(() => {
    const lecturerOption = listOfField.map((field) => (
      {
        value: field.id,
        label: field.name,
      }
    ));
    setOptions(lecturerOption);
  }, [listOfField]);


  const color = {
    frombgColor: "pink",
    tobgColor: "purple",
    completed: 57,
  };



  const onHandleSubmit = (data) => {
    if (userProfile.role === "STUDENT") {
      // console.log("data submit ne:", data);
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
      } if (data.description === "") {
        data.description = null;
      }
      userApi.updateStudentProfile(userProfile.id, data);
    }
    else if (userProfile.role === "LECTURER") {
      const dataOfLecturer = {
        firstName: null,
        lastName: null,
        alternativeEmail: null,
        description: null,
      }
      const fieldOfLecturer = {
        field: null,
      }
      if (data.firstName !== "") {
        dataOfLecturer.firstName = data.firstName;
      } if (data.lastName !== "") {
        dataOfLecturer.lastName = data.lastName;
      } if (data.alternativeEmail !== "") {
        dataOfLecturer.alternativeEmail = data.alternativeEmail;
      } if (data.field !== fieldOfLecturer) {
        fieldOfLecturer.field = data.field;
      }
      lecturerApi.updateLecturerProfile(userProfile.id, dataOfLecturer);
      lecturerApi.updateLecturerField(userProfile.id, fieldOfLecturer);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await userApi.viewProfile(userId);
        const popularBlog = await userApi.getPopularBlogOfUser(response.data.id);
        setUserProfile(response.data);
        setListPopularBlog(popularBlog.data);
        console.log("popular blog ne:", popularBlog.data);
        if (response.status === 200 && popularBlog.status === 200) {
          setLoading(false);
        }
      } catch (error) {
        console.log("Failed to get profile: ", error);
      }
    })();
  }, [userId]);


  //get Student information base on userProfile id
  const handleTakeStudentInformation = async (id) => {
    const student = await userApi.getStudentById(id);
    const studentMajor = await userApi.getStudentMajorByMajorId(student.data.majorId);
    const listOfMajor = await userApi.getMajorList();
    // console.log("student ne: ", student);
    setStudentUser(student.data);
    setMajorOfStudent(studentMajor.data);
    setListOfMajor(listOfMajor.data);
  }

  //get Lecturer information base on userProfile id
  const handleTakeLecturerInformation = async (id) => {
    const lecturer = await lecturerApi.getLecturerById(id);
    const lecturerField = await lecturerApi.getFieldOfLecturer(lecturer.data.id);
    const listOfField = await lecturerApi.getListOfField();
    setLecturerUser(lecturer.data);
    setFieldOfLecturer(lecturerField.data);
    setListOfField(listOfField.data);
  }

  return (
    <div className="my-24 w-11/12 relative mx-auto h-full">
      {/* Start */}
      <motion.div
        animate={{ x: 0, opacity: 1 }}
        initial={{ x: -50, opacity: 0 }}
      >
        {loading ?
          (<NameSectionSkeleton />)
          :
          (
            <div className="profileHeader border-2 border-gray-100 rounded-lg h-40 grid grid-cols-6 mt-5 shadow-lg"
              onLoad={userProfile.role === "STUDENT" ? () => handleTakeStudentInformation(userProfile.id) : () => handleTakeLecturerInformation(userProfile.id)}>
              <div className="profileInfoWrapper col-span-4 relative">
                <div className="profileInfo grid grid-cols-2">
                  <div className="absolute col-span-1 -top-7 left-10">
                    <img
                      className="w-40 h-40 rounded-full border-4 border-gray-700 border-opacity-70"
                      src={
                        userProfile.avatarUrl
                          ? userProfile.avatarUrl
                          : "https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                      }
                      alt="profile img"
                    />
                  </div>
                  <div className="col-span-1 absolute left-56 top-5">
                    <div className="profileNameNDes">
                      <span className="font-bold uppercase text-xl text-transparent filter drop-shadow-md bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
                        {userProfile.firstName + " " + userProfile.lastName}
                      </span>
                      <p className="text-lg">
                        {userProfile.description !== null
                          ? userProfile.description
                          : "AYoooooooo <3"}
                      </p>
                    </div>
                    <div className="mt-5 text-purple-600 font-bold uppercase">
                      Pro Blogger
                    </div>
                  </div>
                </div>
              </div>

              <div className="profileStatus col-span-2 ">
                <div className="flex flex-col items-end space-y-12 my-2 mx-10">
                  <div className="flex flex-row gap-7 text-center text-xs uppercase text-gray-400">
                    <div className="">
                      <p className="text-2xl font-bold text-black">9</p>
                      <p>Posted</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-black">0</p>
                      <p>Liked</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-black">0</p>
                      <p>Award</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 text-sm cursor-pointer">
                    <div className="text-green-500">Like</div>
                    <div className="text-blue-500">Share</div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </motion.div>

      {/* Below */}
      <div className="grid grid-cols-3 my-5 gap-3">
        {/* Left */}
        <div className="col-span-1">
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0.5 }}
            className="border-2 border-gray-100 rounded-lg shadow-lg min-h-0 mb-3 py-4 px-7"
          >
            <h1 className="font-bold text-xl text-center uppercase">Award</h1>
            <div className="">
              <p className="font-semibold text-md">Experience Point</p>
              <div>
                <ProgressBar
                  frombgColor={color.frombgColor}
                  tobgColor={color.tobgColor}
                  completed={color.completed}
                />
              </div>
              <div className="relative my-8">
                <div className="absolute bottom-0 left-0 uppercase text-sm font-semibold text-green-600">
                  Next Level:{" "}
                </div>
                <div className="absolute bottom-0 right-0 uppercase text-sm font-semibold text-pink-600">
                  Supper Blogger{" "}
                </div>
              </div>
            </div>
            <div className="">
              <h1 className="text-center font-bold uppercase">Badges Gained</h1>
              <div className="grid grid-cols-6 gap-4">
                {profileAward?.map((award, index) => (
                  <div className="col-span-1" key={index}>
                    <div className="p-1">
                      <img
                        src={award?.iconUrl}
                        className="w-12 mx-auto transition ease-in-out duration-150 transform hover:-translate-y-0.5 hover:scale-105"
                        alt="award"
                        title={award?.name}
                      />
                      <p className="flex justify-center font-semibold">1</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Infomation of user to edit */}
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0.5 }}
            transition={{ duration: 0.25 }}
            className="border-2 border-gray-100 rounded-lg shadow-lg h-100 py-4 px-7"
          >
            <h1 className="font-bold text-xl text-center uppercase">
              ABOUT
            </h1>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
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
                    <Select className="block appearance-none w-full bg-gray-100 border border-gray-100 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      options={options}
                      value={
                        {
                          label: majorOfStudent.name,
                          value: majorOfStudent.id,
                        }
                      }
                      onChange={(e) => setValue("majorId", e.value)}
                    />
                  </div>
                </div>
                :
                null
              }

              {userProfile.role === "LECTURER" ?
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
                      FIELD OF LECTURER:
                    </label>

                    {/* {options.map((field,idx) => <div key={idx} className="center" ><input type="checkbox" value={field.value} {...register("field")} />{field.label}</div>)} */}
                    {fieldOfLecturer != null ?
                      fieldOfLecturer.map((field) => <li> {field.name} </li>)
                      :
                      <p>isLoading....</p>
                    }


                  </div>
                </div>
                :
                null
              }

              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" type="submit">
                Save
              </button>
            </form>
          </motion.div>
        </div>

        {/* right */}
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 20, opacity: 0.5 }}
          className="col-span-2"
        >
          <div className=" border-2 border-gray-100 rounded-lg shadow-lg min-h-screen">
            {listPopularBlog.map((popularBlog) => (
              <div className="grid: grid-cols-5 flex bg-gray-50 shadow-md border rounded-md h-40 mx-4 mb-3 mt-3">
                <div className="grid col-span-2 mx-6 my-8">
                  <img className="h-24 w-24 rounded-lg flex items-center justify-center" src={popularBlog.thumbnailUrl ? popularBlog.thumbnailUrl : defaultThumnail} alt="" />
                </div>
                <div className="my-8">
                  <div className="font-bold text-xl ml-4 uppercase">{popularBlog.title}</div>
                  <div className="ml-5 text-sm">Created date: {moment(popularBlog.createdDateTime).format("LL")}</div>
                  <div className="ml-5" >{popularBlog.description}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;
