import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MyDialog from "../../components/Dialog/MyDialog";
import blogApi from "../../services/blogApi";
import userApi from "../../services/userApi";
import OwnBlogItems from "./Components/OwnBlogItems";
import Pagination from "react-paginate";
import { motion } from "framer-motion";
import OwnBlogSkeleton from "./Components/OwnBlogSkeleton";
import PageAlert from "../../components/PageAlert/PageAlert";
import StorageKey from "../../constant/storage-keys";
import adminApi from "../../services/adminApi";

export default function MyOwnBlogTable(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  const loggedInAdmin = useSelector((state) => state?.admin?.current);
  const isLoggedIn = !!loggedInUser.id;

  const [isSending, setIsSending] = useState(false); // Set state for this to disable button when sending request
  const [deleteSuccessDialog, setDeleteSuccessDialog] = useState(false); // Set state for this to disable button when sending request
  const [blogList, setBlogList] = useState([]);
  const [reload, setReload] = useState();
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  // set isMounted to false when we unmount the component
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  console.log("logged in user", loggedInUser);
  //Get list of own blog by current user id
  useEffect(() => {
    (async () => {
      if (isLoggedIn || loggedInAdmin.role === StorageKey.adminRole) {
        // Only call api when user login
        try {
          setLoading(true);
          let isMounted = true;
          if (blogList.some) setBlogList([]); //Clear cache
          let response;
          //If admin then load blog of admin
          if (loggedInAdmin.role === StorageKey.adminRole) {
            response = await adminApi.getAdminOwnBlog();
          } else {
            //Else load as usual
            response = await userApi.getOwnBlog(loggedInUser.id);
          }
          if (isMounted && response.status === 200) {
            setBlogList(response.data);
            setLoading(false);
          }
          return () => {
            isMounted = false;
          };
        } catch (error) {
          console.log("Failed to fetch blog list: ", error);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  //Delete own blog
  const handleDeleteOwnBlog = async (blogId) => {
    if (isSending) return; // if sending request then do nothing
    setIsSending(true);
    let check = window.confirm("Are you sure wanted to delete a blog?");
    if (check) {
      try {
        let response;
        //if is admin delete by differ api
        if (loggedInAdmin?.role === StorageKey.adminRole) {
          response = await adminApi.deleteAdminOwnBlog(blogId);
        } else {
          //Else delete as usual
          response = await blogApi.removeBlog(loggedInUser.id, blogId);
        }
        if (response.status === 200) {
          setDeleteSuccessDialog(true);
          setIsSending(false); //only set false when component still mounted
        }
      } catch (error) {
        console.log("Failed to Delete Blog: ", error);
        alert("Failed to Delete Blog!", error);
        setIsSending(false);
      }
    } else {
      setIsSending(false);
    }
  };

  //Undo delete a blog
  const handleUndoDelete = async (blogId) => {
    if (isSending) return; // if sending request then do nothing
    setIsSending(true);
    let check = window.confirm(
      "This blog is on pending deleted so can't update, this action will UNDO DELETED! Do you wanted to continues?"
    );
    if (check) {
      try {
        const respone = await blogApi.undoDeleteBlog(blogId);
        if (respone.status === 200) {
          alert("Undo blog success!");
          setReload({}); //Trigger page to rerender
          setIsSending(false); //only set false when component still mounted
        }
      } catch (error) {
        console.log("Failed to Undo Delete Blog: ", error);
        alert("Failed to Undo Delete Blog!", error);
        setIsSending(false);
      }
    } else {
      setIsSending(false);
    }
  };

  //After delete show dialog and then if use click ok, rerender
  const responseFromSuccessDialog = (isCancle) => {
    if (isCancle) {
      setDeleteSuccessDialog(false);
      setReload({});
    }
  };

  //Handle Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const blogPerPage = 10;
  const pagesVisited = pageNumber * blogPerPage;
  const displayBlog = blogList?.slice(pagesVisited, pagesVisited + blogPerPage);
  const pageCount = Math.ceil(blogList?.length / blogPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    setReload({});
    window.scrollTo(0, 0);
  };

  return (
    <>
      {isLoggedIn || loggedInAdmin?.role === StorageKey.adminRole ? (
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
                        className="w-5/12 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-md"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="w-4/12 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-md"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-md"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-l-md"
                      >
                        Categories
                      </th>
                      <th scope="col" className="w-1/12 relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <OwnBlogSkeleton />
                    ) : (
                      displayBlog.map((blog, index) => (
                        <OwnBlogItems
                          key={index}
                          blogObj={blog}
                          onDeleteClick={handleDeleteOwnBlog}
                          isDisable={isSending}
                          onUndoDeleted={handleUndoDelete}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Pagination
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
          />
        </motion.div>
      ) : (
        <PageAlert
          title="Loggin Required"
          description="Please login to use this feature!"
        />
      )}
      {deleteSuccessDialog ? (
        <MyDialog
          isCancel={responseFromSuccessDialog}
          title="Success"
          description="Action success!"
          icon="success"
        />
      ) : null}
    </>
  );
}
