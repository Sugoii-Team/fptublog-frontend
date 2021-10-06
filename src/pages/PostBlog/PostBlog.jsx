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
  const isLoggedIn = !!getUserState.id;
  const userId = getUserState.id;

  /* State for some field */
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");
  const [dialog, setDialog] = useState(false);

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
  const handleSubmit = async () => {
    if (!selectedCategory) {
      setDialog(true);
    }
    const blog = {
      authorId: userId,
      title,
      content,
      categoryId: selectedCategory,
    };
    const response = await blogApi.post(blog);
    console.log("Response sau khi post blog", response);
  };

  /* Dialog action */
  const responseFromDialog = (isCancel) => {
    if (isCancel) {
      setDialog(false);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="w-3/4 mx-auto my-5 ">
          <div className="p-4 border-2 rounded-md border-black">
            <h1 className="text-center text-3xl uppercase font-bold p-4">
              Post new Blog!
            </h1>
            <div className=" my-2">
              <input
                className="border border-gray-300 w-full p-2 rounded-md"
                type="text"
                placeholder="Title"
                value={title}
                onInput={(e) => setTitle(e?.target.value)}
              />
            </div>
            <div className="my-3">
              <Select
                options={options}
                onChange={(e) => setSelectedCategory(e?.value)}
              />
            </div>
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
                onClick={handleSubmit}
              >
                Send Approve
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center my-9">
          <div className="font-bold text-2xl">
            You must be logged in before Post a Blog
          </div>
        </div>
      )}
      {dialog ? <MyDialog isCancel={responseFromDialog} /> : null}
    </div>
  );
}

export default PostBlog;
