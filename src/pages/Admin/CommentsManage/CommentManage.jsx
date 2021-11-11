import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import CommentsItems from "./Components/CommentsItems";
import { db } from "../../../services/fireBase";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useSelector } from "react-redux";

CommentManage.propTypes = {};

function CommentManage(props) {
  const currentUser = useSelector((state) => state.admin.current);
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);

  //Get all comments sort by timestamp desc
  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "comments"),
      orderBy("postedDateTime", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const commentsFilter = [];
      querySnapshot.forEach((doc) => {
        commentsFilter.push(doc.data());
      });
      setCommentList(commentsFilter);
      setLoading(false);
    });
  }, []);

  console.log("bo warning cua loading", loading);
  return (
    <>
      {currentUser.role === "ADMIN" ? (
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: -20, opacity: 0 }}
          className="flex flex-col w-11/12 mx-auto max-w-full"
        >
          <div className="-my-2 overflow-x-auto ">
            <div className="py-2 align-middle inline-block min-w-full">
              <div className="overflow-hidden sm:rounded-lg">
                <table className="min-w-full border-separate mt-5 table-fixed">
                  <thead className="bg-gray-50">
                    <tr className="mb-4">
                      <th
                        scope="col"
                        className="w-3/12 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-md"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="w-5/12 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-md"
                      >
                        Comments Content
                      </th>
                      <th
                        scope="col"
                        className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-md"
                      >
                        Comment Date
                      </th>
                      <th scope="col" className="w-1/12 relative px-6 py-3">
                        <span className="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {commentList.map((comment) => (
                      <CommentsItems
                        key={comment.id}
                        commentObj={comment}
                        currentUser={currentUser}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <Pagination
    previousLabel={"Previous"}
    nextLabel={"Next"}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    onPageChange={changePage}
    containerClassName={"flex gap-1 justify-center my-4"}
    pageLinkClassName={
      "border-r-2 border-l-2 px-5 py-2 font-semibold hover:bg-gray-100 transision ease-in duration-200"
    }
    previousLinkClassName={"font-bold uppercase mr-2"}
    nextLinkClassName={"font-bold uppercase ml-2"}
    breakLinkClassName={"font-bold uppercase px-4 py-2"}
    activeLinkClassName={"bg-gray-100"}
  /> */}
        </motion.div>
      ) : (
        <div className="flex justify-center my-9">
          <div className="font-bold text-2xl uppercase">
            You don't have permission to access this!
          </div>
        </div>
      )}
    </>
  );
}

export default CommentManage;
