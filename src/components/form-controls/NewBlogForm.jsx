import { CircularProgress } from "@mui/material";
//FireBase
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
//Mark down
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Select from "react-select";
//Addition Library
import { WithContext as ReactTags } from "react-tag-input";
import Showdown from "showdown";
//Components and API
import MyDialog from "../../components/Dialog/MyDialog";
import blogApi from "../../services/blogApi";
import categoryApi from "../../services/categoryApi";
import fieldApi from "../../services/fieldApi";
import { storage } from "../../services/fireBase";
import tagsApi from "../../services/tagsApi";
import "./postBlog.css";

NewBlogForm.propTypes = {
  Ftitle: PropTypes.string,
  BlogNeedUpdate: PropTypes.object,
  isUpdate: PropTypes.bool,
};

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

  const minTitleLength = 30;
  const minContentLength = 300;
  const minLength = 50;
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
        const responseField = await fieldApi.getAllField();
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
        //Call field only when field is selected
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
      (snapshot) => {},
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
    devideTagsToPostAPI();
    try {
      if (isUpdate) {
        // If update, send api for update
        const blog = {
          thumbnailUrl,
          title,
          content,
          description,
        };
        const response = await blogApi.updateBlog(BlogNeedUpdate.id, blog);
        const newBlogResponseId = response.data.id;
        const tagsrespose = await tagsApi.updateTagsOfABlog(
          newBlogResponseId,
          tagsReadyToCallApi
        );
        if (response.status === 200 && tagsrespose.status === 200) {
          setSuccessPostDialog(true);
        }
      } else {
        const blog = {
          authorId: userId,
          title,
          content,
          thumbnailUrl,
          description,
          categoryId: selectedCategory,
        };
        // else send api to post new blog
        const response = await blogApi.post(blog);
        if (response.status === 200) {
          const tagResponse = await tagsApi.addTagsToBlog(
            response.data.id,
            tagsReadyToCallApi
          );
          if (tagResponse.status === 200) {
            setSuccessPostDialog(true);
          }
        }
      }
    } catch (error) {
      console.log("Failed to post Blog : ", error);
      window.alert("Failed to post blog, please try again!");
      setSendingApprove(false);
    }
  }

  /* Call api to post */
  const handleSubmit = async (e) => {
    /* Validate some field */
    setSendingApprove(true); // Set this to disable approve button and show loading
    e.preventDefault();
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
      if (thumbNail) {
        //If file chosen then upload it then call api
        uploadAndGetUrl();
      } else {
        //Else upload without image
        callApiToPostBlog();
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

  const responseFromPostBlogDialog = (isCancel) => {
    if (isCancel) {
      setSendingApprove(false);
      setSuccessPostDialog(false);
      history.push("/ownBlog");
    }
  };

  return (
    <div>
      {isLoggedIn ? (
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
                      isDisabled={onFieldChanging}
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
              {/* Tags */}
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
              {/* Tags */}
              {/* thumbNail URL */}
              <div className=" my-2">
                <p className="font-semibold">Thumbnails:</p>
                <input
                  className="border border-gray-300 w-full p-2 rounded-md"
                  type="file"
                  onChange={(e) => setThumbNail(e.target.files[0])}
                />
              </div>
              {/* Description Field */}
              <div>
                <p className="font-semibold">Description:</p>
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
                <button
                  className="py-2 px-4 shadow-md w-32 border border-gray-200 no-underline rounded-md bg-white text-black font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-black focus:outline-none active:shadow-none "
                  onClick={handleSubmit}
                  disabled={sendingApprove}
                >
                  Send Approve
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="flex justify-center my-9">
          <div className="text-center text-2xl">
            You must be logged in before Post a Blog
          </div>
        </div>
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
          description="Description length from 50 to 200 chars only!!"
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
