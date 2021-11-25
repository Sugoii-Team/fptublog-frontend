import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import adminApi from "../../../../services/adminApi";
import fieldApi from "../../../../services/fieldAPI";

function NewCategory(props) {
  const [fieldList, setFieldList] = useState([]);
  const { register, handleSubmit } = useForm();

  const handleSubmitNewCategory = async (data) => {
    if (!data.name || data.name.length === 0) {
      window.alert("Category can not empty! Try again!");
      return;
    }
    try {
      const updateCategory = await adminApi.createCategory([data]);
      if (updateCategory.status === 200) {
        window.location.reload();
        window.alert("Create category successfully.");
      } else {
        window.alert("Create category failed.");
      }
    } catch (error) {
      window.alert("Category already exist! Try again!");
      console.log("Fail to create new category: ", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const fieldReponse = await fieldApi.getAllFields();
        setFieldList(fieldReponse.data);
      } catch (error) {
        console.log("Failed to get profile: ", error);
      }
    })();
  }, []);

  return (
    <div className="mx-5">
      <form onSubmit={handleSubmit(handleSubmitNewCategory)}>
        <div>
          {/* New Field */}
          <div className="w-full md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
              Field to add category
            </label>
            <select
              {...register("fieldId")}
              className="block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              {fieldList.map((field, idx) => (
                <option key={idx} value={field.id}>
                  {field.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* New category */}
        <div>
          <div className="w-full md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
              New Category Of Field
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              {...register("name")}
            />
          </div>
        </div>

        <div className="relative mt-3">
          <button
            type="submit"
            className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full absolute right-0"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewCategory;
