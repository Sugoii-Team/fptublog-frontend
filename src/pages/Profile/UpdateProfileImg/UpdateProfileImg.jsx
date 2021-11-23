import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { storage } from "../../../services/fireBase";
import userApi from "../../../services/userApi";

UpdateProfileImg.propTypes = {};

function UpdateProfileImg(props) {
  const currentUser = useSelector((state) => state.user.current);
  const { isCancle } = props;
  const [outputImage, setOutputImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  //Upload to firestore and get image url
  const uploadAndGetUrl = (file) => {
    setIsUploading(true);
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    //Create storage References base on firebase
    let storageRef = ref(storage, "uploadimages/" + file.name);
    //Create an upload task
    let uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log("Failed to upload img: ", error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //Else return url to user
          setOutputImage(downloadURL);
          setIsUploading(false);
        });
      }
    );
  };

  const handleUpdateProfileImg = async () => {
    try {
      //If there is out put image then update
      if (outputImage) {
        const payload = {
          avatarUrl: outputImage,
        };
        const updateResponse = await userApi.updateAccountProfile(
          currentUser.id,
          payload
        );
        if (updateResponse.status === 200) {
          window.alert("Update successfully");
          window.location.reload();
        }
      } else {
        //Else cancel and do nothing
        isCancle();
      }
    } catch (error) {
      console.log("Failed to update profile img: ", error);
    }
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  className="text-lg uppercase font-bold text-center leading-6 text-gray-900"
                  id="modal-title"
                >
                  Change Profile Image
                </h3>
                <div className="mt-2">
                  <div>
                    <p className="font-semibold">Choose image:</p>
                    <div className="relative">
                      <input
                        type="file"
                        name="myImage"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => {
                          uploadAndGetUrl(e.target.files[0]);
                        }}
                      />
                      {isUploading ? (
                        <span className="absolute right-0 top-0">
                          {" "}
                          <CircularProgress size={20} />
                        </span>
                      ) : null}
                    </div>
                    {outputImage ? (
                      <div className="flex justify-center mt-2    ">
                        <img
                          src={outputImage ? outputImage : ""}
                          alt="Selected img"
                          className="w-40 h-40 rounded-full border-4 border-gray-700 border-opacity-70"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-green-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              disabled={isUploading}
              onClick={(e) => {
                handleUpdateProfileImg();
              }}
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => isCancle()}
              disabled={isUploading}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfileImg;
