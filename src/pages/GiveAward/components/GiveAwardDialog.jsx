import React, { useState } from "react";
import PropTypes from "prop-types";
import awardApi from "../../../services/awardApi";
import moment from "moment";
import StorageKey from "../../../constant/storage-keys";
//Firebase
import { collection, doc, setDoc } from "@firebase/firestore";
import { db } from "../../../services/fireBase";
import { useSelector } from "react-redux";

GiveAwardDialog.propTypes = {
  isCancel: PropTypes.func,
};

function GiveAwardDialog(props) {
  const currentUser = useSelector((state) => state.user.current);
  const { isCancel, allAwardAvailable, forStudentId } = props;
  const [onAwarding, setOnAwarding] = useState(false);

  //Handle give award for student
  const handleGiveAward = async (awardObj) => {
    setOnAwarding(true);

    try {
      let check = window.confirm("Give this award to student?");
      //If user confirm to award then start awarding
      if (check) {
        alert("Awarding, please wait a sec!");
        //Call api to award student
        const awardResponse = await awardApi.giveAwardToStudent(forStudentId, {
          awardId: awardObj.id,
        });
        //if success show dialog to user
        if (awardResponse.status === 200) {
          createNotiAfterAward(awardObj);
          window.alert(awardResponse.data);
        }
      }
    } catch (error) {
      console.log("Failed to give award: ", error);
      //If response is gived award then show dialog to user
      const check = error.message === "Already given award in last 30 days";
      window.alert(
        check
          ? "This award already given to this student in this month!"
          : "Failed to give Award, please try again later!"
      );
    } finally {
      setOnAwarding(false);
    }
  };

  const createNotiAfterAward = async (award) => {
    let currentDate = moment().valueOf();
    //Create notification when reply comments
    const newNotiDocRef = doc(collection(db, "notifications")); // Create new doc to generate id
    const notiPayload = {
      id: newNotiDocRef.id, // Give field id by doc's id
      forUserId: forStudentId, //for first comment author
      fromUserId: currentUser.id, //this is from admin
      message: award.name,
      referenceId: forStudentId, // Give award so set student id to view profile
      status: StorageKey.unviewStatus,
      date: currentDate,
      type: StorageKey.giveAward, // Get constrain value from storage key
    };
    await setDoc(newNotiDocRef, notiPayload); // Update doc with some field
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
                  Select an award to give
                </h3>
                <div className="mt-4 grid grid-cols-5 gap-7">
                  {allAwardAvailable?.map((award) => (
                    <button
                      key={award?.id}
                      className="col-span-1 cursor-pointer"
                      onClick={(e) => handleGiveAward(award)}
                      disabled={onAwarding}
                    >
                      <div className="p-1">
                        <img
                          src={award?.iconUrl}
                          className="w-16 mx-auto transition ease-in-out duration-150 transform hover:-translate-y-0.5 hover:scale-105"
                          alt="award"
                          title={award?.name}
                        />
                        <p className="flex justify-center font-semibold">
                          +{award?.point}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                isCancel();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiveAwardDialog;
