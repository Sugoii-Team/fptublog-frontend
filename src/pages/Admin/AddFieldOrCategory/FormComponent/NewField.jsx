import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { WithContext as ReactTags } from "react-tag-input";
import adminApi from '../../../../services/adminApi';

function NewField(props) {

  /* Tags Handler */
  const KeyCodes = {
    comma: 188,
    enter: [10, 13],
  };

  const [inpputedTags, setInpputedTags] = useState([]);

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
  const delimiters = [...KeyCodes.enter, KeyCodes.comma];

  const { register, handleSubmit } = useForm();

  const handleSubmitNewCategory = async (data) => {
    if (inpputedTags.length === 0) {
      window.alert("Please input 1 category for this field! Try again!");
      return;
    } else {
      try {
        const createNewFieldReponse = await adminApi.createField(data);
        if (createNewFieldReponse.status === 200) {
          const newFieldId = createNewFieldReponse.data.id;
          const requestObject = inpputedTags.map((inputed)=>(
            {
              name: inputed.text,
              fieldId: newFieldId
            }
          ))
          const createNewCategoryOfNewField = await adminApi.createCategory(requestObject);
          if (createNewCategoryOfNewField.status === 200) {
            window.alert("Create New Field Succesfully!")
            window.location.reload();
          }
          else {
            window.alert("Create New Field Failed!")
          }
        }
      } catch (error) {
        console.log("Fail to create new field (new field component: ", error);
      }
    }
  };

  return (
    <div className = "mx-5">
      <form onSubmit={handleSubmit(handleSubmitNewCategory)}>
        <div>
          {/* New Field */}
          <div className="w-full md:mb-0">
            <label className="block uppercase text-gray-700 text-lg font-bold mb-2">
              New Field
            </label>
            <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" {...register("name")} />
          </div>
        </div>

        {/* New category */}
        <div>
          <div className="w-full md:mb-0">
            <label className="block uppercase text-gray-700 text-lg font-bold mb-2">
              Category of field
            </label>
            <div className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
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
                handleDelete={handleDeleteTags}
                handleAddition={handleAddTags}
                delimiters={delimiters}
              />
            </div>
            <p className="text-xs text-red-500">"Enter" after input to save your category choice</p>
          </div>
        </div>

        <div className="relative">
          <button type="submit"
            className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full absolute right-0"
          >
            Add Field
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewField;