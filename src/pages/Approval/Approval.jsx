import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageAlert from "../../components/PageAlert/PageAlert";
import StorageKey from "../../constant/storage-keys";
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

  console.log("Reviewing blog ne: ", reviewBlog);

  return (
    <div>
      {userRole === StorageKey.lecturerRole ? (
        <ApprovalTable listReviewBlogs={reviewBlog} />
      ) : (
        <PageAlert
          title="Access Denied"
          description="You don't have permission to view this page!"
        />
      )}
    </div>
  );
}

export default Approval;
