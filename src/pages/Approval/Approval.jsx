import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import lecturerApi from "../../services/lecturerApi";
import ApprovalTable from "./components/ApprovalTable";

Approval.propTypes = {};

function Approval(props) {
  const userData = useSelector((state) => state.user.current);
  const userRole = userData.role;
  const [reviewBlog, setReviewBlog] = useState([]);
  

  useEffect(() => {
    (async () => {
      try {
        const response = await lecturerApi.getReviewingBlog(userData.id);
        setReviewBlog(response.data);
      } catch (error) {
        console.log("Failed to get Reviewing Blog: ", error);
      }
    })();
  }, [userData.id]);

  return (
    <div>
      {userRole === "LECTURER" ? (
        <ApprovalTable listReviewBlogs={reviewBlog} />
      ) : (
        <div>
          <span className="flex justify-center my-10 font-bold text-2xl">
            You don't have Permission to view this page!
          </span>
        </div>
      )}
    </div>
  );
}

export default Approval;
