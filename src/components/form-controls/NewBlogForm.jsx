import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import Select from "react-select";
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
import { storage } from "../../services/fireBase";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

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
  const { Ftitle, BlogNeedUpdate, isUpdate } = props;
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
  const [categories, setCategories] = useState([]);
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
  const minContentLength = 300;
  const minLength = 50;
  const maxLength = 200;
  var thumbnailUrl = null;

  //Rerender Textare when BlogneedUpdate arrived
  useEffect(() => {
    if (BlogNeedUpdate) {
      setContent(BlogNeedUpdate.content);
      setSelectedCategory(BlogNeedUpdate.categoryId); // Set category because update not allowed to set category
    }
  }, [BlogNeedUpdate]);

  /* Get list of categories */
  useEffect(() => {
    (async () => {
      try {
        const responseCategories = await categoryApi.getCategories();
        if (BlogNeedUpdate?.categoryId) {
          const rpBlogCate = await categoryApi.getCategoryById(
            BlogNeedUpdate?.categoryId
          );
          setThisBlogCategoy(rpBlogCate.data);
        }
        setCategories(responseCategories.data);
      } catch (error) {
        console.log("Failed to get categories: ", error);
      }
    })();
  }, [BlogNeedUpdate?.categoryId]);

  /* Create an categories options for Selector */
  const options = categories.map((category) => {
    return { value: category.id, label: category.name };
  });

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
        if (response.status === 200) {
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
          setSuccessPostDialog(true);
        }
      }
    } catch (error) {
      console.log("Failed to post Blog : ", error);
    }
  }

  /* Call api to post */
  const handleSubmit = async (e) => {
    /* Validate some field */
    e.preventDefault();
    if (title < minLength) {
      setTitleDialog(true);
      e.preventDefault();
    } else if (!selectedCategory) {
      setDialog(true);
      e.preventDefault();
    } else if (description > maxLength && description < minLength) {
      setDesDialog(true);
      e.preventDefault();
    } else if (content < minContentLength) {
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
    }
  };

  const responseFromPostBlogDialog = (isCancel) => {
    if (isCancel) {
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
              {/* Categories Select */}
              <div className="my-3">
                <p className="font-semibold">Categories</p>
                <Select
                  options={options}
                  value={
                    BlogNeedUpdate
                      ? {
                          label: thisBlogCategoy.name,
                          value: thisBlogCategoy.id,
                        }
                      : null
                  }
                  isDisabled={BlogNeedUpdate ? true : false}
                  onChange={(e) => setSelectedCategory(e?.value)}
                />
              </div>
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
              <div className="flex justify-end my-2">
                <button
                  className="py-2 px-4 shadow-md w-32 border border-gray-200 no-underline rounded-md bg-white text-black font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-black focus:outline-none active:shadow-none "
                  onClick={handleSubmit}
                >
                  Send Approve
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="flex justify-center my-9">
          <div className="font-bold text-2xl">
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
          description="Description need at least 50 chars and below 200 chars!!"
          icon="warning"
        />
      ) : null}
      {titleDialog ? (
        <MyDialog
          isCancel={responseFromDialog}
          title="Warning"
          description="Title need at least 50 chars!!"
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
