import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import "./postBlog.css";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import MyDialog from "../../components/Dialog/MyDialog";
import blogApi from "../../services/blogApi";
import categoryApi from "../../services/categoryApi";

PostBlog.propTypes = {};

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

function PostBlog() {
  /* Get current user for check if there is no user
  then can't post blog */
  const getUserState = useSelector((state) => state.user.current);
  /*  const isLoggedIn = !!getUserState.id; */
  const isLoggedIn = true;
  const userId = getUserState.id;

  /* State for some field */
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");
  const [dialog, setDialog] = useState(false);
  const [desDialog, setDesDialog] = useState(false);
  const [titleDialog, setTitleDialog] = useState(false);
  const [contentDialog, setContentDialog] = useState(false);
  const minContentLength = 300;
  const minLength = 50;
  const maxLength = 200;

  /* Get list of categories */
  useEffect(() => {
    (async () => {
      const responseCategories = await categoryApi.getCategories();
      setCategories(responseCategories.data);
    })();
  }, []);

  /* Create an categories options for Selector */
  const options = categories.map((category) => {
    return { value: category.id, label: category.name };
  });

  /* Call api to post */
  const handleSubmit = (e) => {
    /* If user didn't select categories then prevent them to post blog */
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
      const blog = {
        authorId: userId,
        title,
        content,
        image,
        description,
        categoryId: selectedCategory,
      };
      const response = blogApi.post(blog);
      console.log("Response sau khi post blog", response);
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

  return (
    <div>
      {isLoggedIn ? (
        <form className="w-3/4 mx-auto my-5 " onSubmit={handleSubmit}>
          <div className="p-4 border-2 rounded-md border-black">
            <h1 className="text-center text-3xl uppercase font-bold p-4">
              Post new Blog!
            </h1>
            {/* Title input */}
            <div className=" my-2">
              <input
                className="border border-gray-300 w-full p-2 rounded-md"
                type="text"
                placeholder="Title"
                value={title}
                onInput={(e) => setTitle(e?.target.value)}
              />
            </div>
            {/* Categories Select */}
            <div className="my-3">
              <Select
                options={options}
                onChange={(e) => setSelectedCategory(e?.value)}
              />
            </div>
            {/* Image URL */}
            <div className=" my-2">
              <input
                className="border border-gray-300 w-full p-2 rounded-md"
                type="text"
                placeholder="Image URL"
                onInput={(e) => setImage(e?.target.value)}
              />
            </div>
            {/* Description Field */}
            <div>
              <textarea
                className="border border-gray-300 w-full p-2 rounded-md"
                placeholder="Description (Max 200 character)"
                onInput={(e) => setDescription(e?.target.value)}
              />
            </div>
            {/* Rich Text Editor */}
            <div className="border border-gray-300 rounded-md">
              <div className="container">
                <ReactMde
                  value={content}
                  onChange={setContent}
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
                className="py-2 px-4 shadow-md w-32 border border-gray-200 no-underline rounded-full bg-white text-black font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-black focus:outline-none active:shadow-none "
                /* onClick={handleSubmit} */
              >
                Send Approve
              </button>
            </div>
          </div>
        </form>
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
        />
      ) : null}
      {desDialog ? (
        <MyDialog
          isCancel={responseFromDialog}
          title="Warning"
          description="Description need at least 50 chars and below 200 chars!!"
        />
      ) : null}
      {titleDialog ? (
        <MyDialog
          isCancel={responseFromDialog}
          title="Warning"
          description="Title need at least 50 chars!!"
        />
      ) : null}
      {contentDialog ? (
        <MyDialog
          isCancel={responseFromDialog}
          title="Warning"
          description="Min content length is 300 characters!"
        />
      ) : null}
    </div>
  );
}

export default PostBlog;
