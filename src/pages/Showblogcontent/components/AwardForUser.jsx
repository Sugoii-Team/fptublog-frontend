import React, { useState } from "react";
import PropTypes from "prop-types";
import awardApi from "../../../services/awardApi";

AwardForUser.propTypes = {
  length: PropTypes.number,
};

AwardForUser.defaultProps = {
  length: 12,
};

function AwardForUser({ allAwardAvailable, blogAuthor }) {
  const [onAwarding, setOnAwarding] = useState(false);

  const handleGiveAward = async (awardObj) => {
    setOnAwarding(true);
    alert("Awarding, please wait a sec!");
    try {
      const awardResponse = await awardApi.giveAwardToStudent(blogAuthor.id, {
        awardId: awardObj.id,
      });
      if (awardResponse.status === 200) {
        window.alert(awardResponse.data);
      }
    } catch (error) {
      console.log("Failed to give award: ", error);
      const check = error.message === "Award already given to this user";
      window.alert(
        check
          ? "Award already given to this user"
          : "Failed to give Award, please try again later!"
      );
    } finally {
      setOnAwarding(false);
    }
  };

  return (
    <>
      <div>
        <h1 className="flex justify-center uppercase text-sm font-bold">
          Is this student good ? Give him an award
        </h1>
        <div className="grid grid-cols-5 gap-3 mt-4">
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
    </>
  );
}

export default AwardForUser;
