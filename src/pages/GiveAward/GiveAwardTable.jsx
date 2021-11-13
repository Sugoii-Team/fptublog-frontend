import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageAlert from "../../components/PageAlert/PageAlert";
import StorageKey from "../../constant/storage-keys";
import awardApi from "../../services/awardApi";
import studentProfileApi from "../../services/studentProfileApi";
import GiveAwardItems from "./components/GiveAwardItems";

GiveAwardTable.propTypes = {};

function GiveAwardTable(props) {
  const currentUser = useSelector((state) => state.user.current);
  const [allAwardAvailable, setAllAwardAvailable] = useState([]);
  const [topStudentsOfMonth, setTopStudentsOfMonth] = useState([]);
  useEffect(() => {
    //If blog is deleted then not allow to load api
    (async () => {
      try {
        const awardResponse = await awardApi.getAllAward();
        const topStudent = await studentProfileApi.getTopContributorOfMonth();
        if (awardResponse.status === 200)
          setAllAwardAvailable(awardResponse?.data);
        if (topStudent.status === 200) setTopStudentsOfMonth(topStudent?.data);
      } catch (error) {
        console.log("Failed to fetch blog list: ", error);
      }
    })();
  }, []);

  return (
    <>
      {currentUser.role === StorageKey.lecturerRole ? (
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: -20, opacity: 0 }}
          className="flex flex-col w-11/12 mx-auto max-w-full"
        >
          <div className="-my-2 overflow-x-auto ">
            <div className="py-2 align-middle inline-block min-w-full">
              <div className="overflow-hidden sm:rounded-lg">
                <div className="flex justify-center mt-5">
                  <div className="font-bold text-lg uppercase">
                    -- Top contributor of of month --
                  </div>
                </div>
                <table className="min-w-full border-separate mt-5 table-fixed">
                  <thead className="bg-gray-50">
                    <tr className="mb-4">
                      <th
                        scope="col"
                        className="w-5/12 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-md"
                      >
                        Student
                      </th>
                      <th
                        scope="col"
                        className="w-5/12 px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider rounded-md"
                      >
                        Contribution
                      </th>
                      <th scope="col" className="w-2/12 relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {topStudentsOfMonth.map((student) => (
                      <GiveAwardItems
                        key={student.student.id}
                        allAward={allAwardAvailable}
                        studentObj={student}
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
        <PageAlert
          title="Access Denied"
          description="You don't have permission to view this page!"
        />
      )}
    </>
  );
}

export default GiveAwardTable;
