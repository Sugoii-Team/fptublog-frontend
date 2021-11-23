import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import Select from "react-select";
//Addition Library
import { WithContext as ReactTags } from "react-tag-input";
//Mark down
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./postBlog.css";
//Components and API
import MyDialog from "../../components/Dialog/MyDialog";
import blogApi from "../../services/blogApi";
import categoryApi from "../../services/categoryApi";
//FireBase
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../services/fireBase";
import { collection, doc, setDoc } from "@firebase/firestore";
//Another
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import tagsApi from "../../services/tagsApi";
import fieldApi from "../../services/fieldAPI";
import PageAlert from "../PageAlert/PageAlert";
import moment from "moment";
import StorageKey from "../../constant/storage-keys";
import adminApi from "../../services/adminApi";

NewBlogForm.propTypes = {
  Ftitle: PropTypes.string,
  BlogNeedUpdate: PropTypes.object,
  isUpdate: PropTypes.bool,
};
//Converter for richtext input
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export default function NewBlogForm(props) {
  const { Ftitle, BlogNeedUpdate, isUpdate, TagsOfBlog } = props;
  /* Get current user for check if there is no user
  then can't post blog */
  const getUserState = useSelector((state) => state.user.current);
  const isLoggedIn = !!getUserState.id;
  const history = useHistory();
  /* const isLoggedIn = true; */
  const userId = getUserState.id;
  /* State for some field */
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [categories, setCategories] = useState([]);
  const [allField, setAllField] = useState([]);
  const [thisBlogCategoy, setThisBlogCategoy] = useState({});
  const [thumbNail, setThumbNail] = useState(null);
  const [isThumbNailSelected, setIsThumbNailSelected] = useState(false);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");
  const [dialog, setDialog] = useState(false);
  const [desDialog, setDesDialog] = useState(false);
  const [titleDialog, setTitleDialog] = useState(false);
  const [contentDialog, setContentDialog] = useState(false);
  const [sucessPostDialog, setSuccessPostDialog] = useState(false);
  const [sendingApprove, setSendingApprove] = useState(false);
  const [onFieldChanging, setOnFieldChanging] = useState(false);
  const [inpputedTags, setInpputedTags] = useState([]);
  var tagsReadyToCallApi = [];
  const suggestTags = [
    { id: "JavaScript", text: "JavaScript" },
    { id: "PHP", text: "PHP" },
    { id: "AI", text: "AI" },
  ];

  const minTitleLength = 5;
  const minContentLength = 300;
  const minLength = 5;
  const maxLength = 200;
  var thumbnailUrl = null;

  /* Tags Handler */
  const KeyCodes = {
    comma: 188,
    enter: [10, 13],
  };

  const delimiters = [...KeyCodes.enter, KeyCodes.comma];

  //Delete a tags on form
  const handleDeleteTags = (positon) => {
    let newTagsWithoutDeletedTag = inpputedTags.filter(
      (tag, index) => index !== positon
    );
    setInpputedTags(newTagsWithoutDeletedTag);
  };

  //Add more tags on form
  const handleAddTags = (tag) => {
    let newTags = inpputedTags;
    newTags.push(tag);
    setInpputedTags(newTags);
  };

  //Seperate tags from id to send post to back-end
  function devideTagsToPostAPI() {
    if (inpputedTags.length > 0) {
      inpputedTags.forEach((tag) => {
        let { text } = tag;
        tagsReadyToCallApi.push({ name: text });
      });
    }
  }

  /* Tags Handler */

  //Update value of everyfield when blogUpdateObj arrived
  useEffect(() => {
    if (BlogNeedUpdate) {
      setTitle(BlogNeedUpdate.title);
      setDescription(BlogNeedUpdate.description);
      setContent(BlogNeedUpdate.content);
      setSelectedCategory(BlogNeedUpdate.categoryId); // Set category because update not allowed to set category
      //Fix tags properties name to fit Input-tag library
      if (TagsOfBlog.length > 0) {
        const remadeTags = TagsOfBlog.map((tag) => {
          return {
            id: tag.id,
            text: tag.name,
          };
        });
        setInpputedTags(remadeTags);
      }
    }
  }, [BlogNeedUpdate, TagsOfBlog]);

  /* Get List of Fields */
  useEffect(() => {
    (async () => {
      try {
        const responseField = await fieldApi.getAllFields();
        setAllField(responseField.data);
      } catch (error) {
        console.log("Failed to get categories: ", error);
      }
    })();
  }, []);

  /* Filer for selector */
  const fieldOption = allField.map((field) => {
    return { value: field.id, label: field.name };
  });
  const handleCallCategoriesOnFieldChange = (selectedFieldId) => {
    setSelectedField(selectedFieldId);
    setOnFieldChanging(true);
  };

  /* Get list of categories */
  useEffect(() => {
    (async () => {
      try {
        //Call categories only when field is selected
        if (selectedField !== "") {
          const responseCategories = await categoryApi.getCategoryByFieldId(
            selectedField
          );
          if (responseCategories.status === 200) {
            setCategories(responseCategories.data);
            setOnFieldChanging(false);
          }
        }
        //Get specify categories when user update
        if (BlogNeedUpdate?.categoryId) {
          const rpBlogCate = await categoryApi.getCategoryById(
            BlogNeedUpdate?.categoryId
          );
          setThisBlogCategoy(rpBlogCate.data);
        }
      } catch (error) {
        console.log("Failed to get categories: ", error);
      }
    })();
  }, [BlogNeedUpdate?.categoryId, onFieldChanging, selectedField]);

  /* Create an categories options for Selector */
  var options;
  if (categories.length > 0) {
    options = categories.map((category) => {
      return { value: category.id, label: category.name };
    });
  }

  //Upload to firestore and get image url
  const uploadAndGetUrl = () => {
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "thumnails/" + thumbNail.name);
    const uploadTask = uploadBytesResumable(storageRef, thumbNail, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => { },
      (error) => {
        console.log("Failed to upload img: ", error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          thumbnailUrl = downloadURL;
          callApiToPostBlog();
        });
      }
    );
  };

  //Function to call api post a blog
  async function callApiToPostBlog() {
    devideTagsToPostAPI(); //Summary all tags inputted to post
    try {
      if (isUpdate) {
        // If update, send api for update
        const blog = {
          thumbnailUrl,
          title,
          content,
          description,
        };
        // Calling updating api
        const response = await blogApi.updateBlog(BlogNeedUpdate.id, blog);
        // Because update blog return new blog id so get new blogId from response to set tags
        const newBlogResponseId = response.data.id;
        //when update success then send tags
        const tagsrespose = await tagsApi.updateTagsOfABlog(
          newBlogResponseId,
          tagsReadyToCallApi
        );
        //After all is completed show dialog to user
        if (response.status === 200 && tagsrespose.status === 200) {
          //Also create new notification
          createNewNotification(newBlogResponseId);
          setSuccessPostDialog(true);
        }
      } else if (getUserState.role === "ADMIN") {
        //admin send api to post new announment
        const blog = {
          thumbnailUrl,
          title,
          content,
          description,
        }
        //sending api to admin to post blog
        const adminPostBlogReponse = await adminApi.adminPostBlog(blog);
        console.log("blog admin ne : ", adminPostBlogReponse);
        if(adminPostBlogReponse.status === 200){
          setSuccessPostDialog(true);
        }
      } else {
        //else send api to post new blog
        //preparing payload
        const blog = {
          authorId: userId,
          title,
          content,
          thumbnailUrl,
          description,
          categoryId: selectedCategory,
        };
        //sending api to post blog
        const response = await blogApi.post(blog);
        if (response.status === 200) {
          //If posted blog completed add tags to that blog
          const tagResponse = await tagsApi.addTagsToBlog(
            response.data.id,
            tagsReadyToCallApi
          );
          if (tagResponse.status === 200) {
            //After add tags succesfully show dialog post blog success to user
            //Also create new notification
            createNewNotification(response.data.id);
            setSuccessPostDialog(true);
          }
        }
      }
    } catch (error) {
      console.log("Failed to post Blog : ", error);
      window.alert("Failed to post blog, please try again!");
      setSendingApprove(false); //Set false to cancel approve buntton disabled
    }
  }

  //Create notification for every lecturer of field
  const createNewNotification = async (blogId) => {
    //Get all lecturer of selected field
    if (selectedField) {
      let isSuccess = false; //To check is all completed yet
      //Call Api to get All lecturer of selected field
      const lecturerResponse = await fieldApi.getLecturersOfField(
        selectedField
      );
      const lecturerList = lecturerResponse.data;
      let currentDate = moment().valueOf();
      //After get list then give notification to every lecturer
      lecturerList?.forEach(async (lecture) => {
        //Create notification when post or update blog
        const newNotiDocRef = doc(collection(db, "notifications")); // Create new doc to generate id
        const notiPayload = {
          id: newNotiDocRef.id, // Give field id by doc's id
          forUserId: lecture.id, //for each lecturer id
          fromUserId: getUserState.id, //from who posted this blog
          message: "",
          referenceId: blogId, // Give blog Id to reference to specify blog
          status: StorageKey.unviewStatus,
          date: currentDate,
          type: StorageKey.postNewBlog, // Get constrain value from storage key
        };
        await setDoc(newNotiDocRef, notiPayload); // Update doc with some field
      });
      //When all good set success true
      isSuccess = true;
      return isSuccess;
    }
  };

  /* Constrain some field */
  const handleSubmit = async (e) => {
    /* Validate some field */

    if (!isThumbNailSelected && BlogNeedUpdate?.thumbnailUrl !== null) {
      thumbnailUrl = BlogNeedUpdate?.thumbnailUrl;
    }
    setSendingApprove(true); // Set this to disable approve button and show loading
    e.preventDefault();
    if(getUserState.role === "ADMIN"){
      if (title.length < minTitleLength) {
        setTitleDialog(true);
        e.preventDefault();
      } else if (
        description.length > maxLength ||
        description.length < minLength
      ) {
        setDesDialog(true);
        e.preventDefault();
      } else if (content.length < minContentLength) {
        setContentDialog(true);
        e.preventDefault();
      } else {
        //if thumbnail is selected and thumbnail obj is not null then upload img before post blog
        if (thumbNail && isThumbNailSelected) {
          //If image file chosen then upload it and call api
          uploadAndGetUrl();
        } else {
          //Else upload without image or img existed from updating blog
          callApiToPostBlog();
        }
      }
    } else {
      if (title.length < minTitleLength) {
        setTitleDialog(true);
        e.preventDefault();
      } else if (!selectedCategory) {
        setDialog(true);
        e.preventDefault();
      } else if (
        description.length > maxLength ||
        description.length < minLength
      ) {
        setDesDialog(true);
        e.preventDefault();
      } else if (content.length < minContentLength) {
        setContentDialog(true);
        e.preventDefault();
      } else {
        //if thumbnail is selected and thumbnail obj is not null then upload img before post blog
        if (thumbNail && isThumbNailSelected) {
          //If image file chosen then upload it and call api
          uploadAndGetUrl();
        } else {
          //Else upload without image or img existed from updating blog
          callApiToPostBlog();
        }
      }
    }
  };

  /* Dialog action */
  const responseFromDialog = (isCancel) => {
    if (isCancel) {
      setDialog(false);
      setDesDialog(false);
      setTitleDialog(false);
      setContentDialog(false);
      setSendingApprove(false);
    }
  };

  /* After post success then push to another components */
  const responseFromPostBlogDialog = (isCancel) => {
    if (isCancel) {
      setSendingApprove(false);
      setSuccessPostDialog(false);
      history.push("/ownBlog");
    }
  };

  return (
    <div>
      {isLoggedIn || getUserState.role === "ADMIN" ? (
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 25, opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="w-3/4 mx-auto my-5 ">
          <div className="p-4 border-2 rounded-md border-black">
            <h1 className="text-center text-3xl uppercase font-bold p-4">
              {Ftitle}
            </h1>
            {/* Title input */}
            <div className=" my-2">
              <p className="font-semibold">Title:</p>
              <input
                className="border border-gray-300 w-full p-2 rounded-md"
                type="text"
                placeholder="Title"
                defaultValue={BlogNeedUpdate ? BlogNeedUpdate.title : ""}
                onInput={(e) => setTitle(e?.target.value)}
              />
            </div>

            {getUserState.role === "ADMIN" ? 
              <div>
                <div className="w-full grid grid-cols-2 gap-2">
                  <div className="my-3 col-span-1">
                    <p className="font-semibold">Field:</p>
                    <p className="appearance-none block w-full bg-gray-100  border border-gray-100 rounded py-3 px-4 leading-tight uppercase">announcement</p>
                  </div>
                  {/* Categories Select */}

                  <div className="my-3 col-span-1">
                    <p className="font-semibold">Categories:</p>
                    <p className="appearance-none block w-full bg-gray-100 border border-gray-100 rounded py-3 px-4 leading-tight uppercase">announcement</p>
                  </div>
                </div>
              </div>
              :
              <div>
                {/* Field Select */}
                <div className="w-full grid grid-cols-2 gap-2">
                  <div className="my-3 col-span-1">
                    <p className="font-semibold">Field:</p>
                    {BlogNeedUpdate === undefined ? (
                      <Select
                        options={fieldOption}
                        isDisabled={onFieldChanging}
                        onChange={(e) =>
                          handleCallCategoriesOnFieldChange(e?.value)
                        }
                      />
                    ) : (
                      <Select
                        options={fieldOption}
                        isDisabled={true}
                        onChange={(e) =>
                          handleCallCategoriesOnFieldChange(e?.value)
                        }
                      />
                    )}
                  </div>
                  {/* Categories Select */}

                  <div className="my-3 col-span-1">
                    <p className="font-semibold">Categories:</p>
                    {BlogNeedUpdate ? (
                      <Select
                        value={{
                          label: thisBlogCategoy.name,
                          value: thisBlogCategoy.id,
                        }}
                        isDisabled={true}
                      />
                    ) : (
                      <Select
                        options={options}
                        isDisabled={BlogNeedUpdate ? true : false}
                        onChange={(e) => setSelectedCategory(e?.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            }

            {getUserState.role === "ADMIN" ? 
            null
            :
            // Tags 
            <div>
                 <p className="font-semibold">Tags: </p>
                 <ReactTags
                   classNames={{
                     tags: "tagsClass",
                     tagInput: "tagInputClass",
                     tagInputField: "tagInputFieldClass",
                     selected: "selectedClass",
                     tag: "tagClass",
                     remove: "removeClass",
                     suggestions: "suggestionsClass",
                     activeSuggestion: "activeSuggestionClass",
                     editTagInput: "editTagInputClass",
                     editTagInputField: "editTagInputField",
                     clearAll: "clearAllClass",
                   }}
                   autofocus={false}
                   tags={inpputedTags}
                   suggestions={suggestTags}
                   handleDelete={handleDeleteTags}
                   handleAddition={handleAddTags}
                   delimiters={delimiters}
                 />
               </div>
               // Tags
          }

            {getUserState.role === "ADMIN" ? 
            null
            :
            // thumbNail URL 
            <div className=" my-2">
              <p className="font-semibold">Thumbnails:</p>
              {BlogNeedUpdate?.thumbnailUrl ? (
                <p className="text-green-400">
                  Thumbnails has been selected, you can skip this
                </p>
              ) : null}
              <input
                className="border border-gray-300 w-full p-2 rounded-md"
                type="file"
                onChange={(e) => {
                  setThumbNail(e.target.files[0]);
                  /* Set this in case update a blog can skip pick new thumbnail */
                  setIsThumbNailSelected(true);
                }}
              />
            </div>
            
          }
            {/* Description Field */}
            <div>
              <p className="font-semibold mt-2">Description:</p>
              <textarea
                className="border border-gray-300 w-full p-2 rounded-md"
                placeholder="Description (Max 200 character)"
                defaultValue={
                  BlogNeedUpdate ? BlogNeedUpdate.description : ""
                }
                onInput={(e) => setDescription(e?.target.value)}
              />
            </div>
            {/* Rich Text Editor */}
            <div className="">
              <p className="font-semibold">Blog Content:</p>
              <div className="container border border-gray-300 rounded-md">
                <ReactMde
                  value={content}
                  onChange={(e) => setContent(e)}
                  selectedTab={selectedTab}
                  onTabChange={setSelectedTab}
                  generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                  }
                />
              </div>
            </div>
            <div className="flex justify-end my-2 relative">
              {sendingApprove ? (
                <span className="absolute right-36 top-1">
                  {" "}
                  <CircularProgress size={30} />
                </span>
              ) : null}
              {getUserState.role === "ADMIN" ?
              <button
                className="py-2 px-4 shadow-md w-32 border border-gray-200 no-underline rounded-md bg-white text-black font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-black focus:outline-none active:shadow-none "
                onClick={handleSubmit}
                disabled={sendingApprove}
              >
                Post Blog
              </button>
              :
              <button
                className="py-2 px-4 shadow-md w-32 border border-gray-200 no-underline rounded-md bg-white text-black font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-black focus:outline-none active:shadow-none "
                onClick={handleSubmit}
                disabled={sendingApprove}
              >
                Send Approve
              </button>
            }
            </div>
          </div>
        </div>
      </motion.div>
      ) : (
        <PageAlert
          title="Loggin Required"
          description="Please login to use this feature!"
        />
      )}
      {/* Dialog for some field */}
      {dialog ? (
        <MyDialog
          isCancel={responseFromDialog}
          title="Warning"
          description="Please select a categories"
          icon="warning"
        />
      ) : null}
      {desDialog ? (
        <MyDialog
          isCancel={responseFromDialog}
          title="Warning"
          description={`Description length from ${minLength} to ${maxLength} chars only!!`}
          icon="warning"
        />
      ) : null}
      {titleDialog ? (
        <MyDialog
          isCancel={responseFromDialog}
          title="Warning"
          description={`Title need at least ${minTitleLength} chars!!`}
          icon="warning"
        />
      ) : null}
      {contentDialog ? (
        <MyDialog
          isCancel={responseFromDialog}
          title="Warning"
          description="Min content length is 300 characters!"
          icon="warning"
        />
      ) : null}
      {sucessPostDialog ? (
        <MyDialog
          isCancel={responseFromPostBlogDialog}
          title="Success"
          description="Your Blog is on pending now!"
          icon="success"
        />
      ) : null}
    </div>
  );
}
