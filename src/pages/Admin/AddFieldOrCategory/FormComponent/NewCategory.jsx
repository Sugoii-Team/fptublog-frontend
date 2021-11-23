import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import adminApi from '../../../../services/adminApi';
import fieldApi from '../../../../services/fieldAPI';

function NewCategory(props) {

  const [fieldList, setFieldList] = useState([]);
  const { register, handleSubmit} = useForm();

  const handleSubmitNewCategory = async (data) => {
    try {
      const updateCategory = await adminApi.createCategory([data]);
      if(updateCategory.status === 200){
        window.alert("Create category successfully.");
      } else {window.alert("Create category failed.")}
    } catch (error) {
      console.log("Fail to create new category: ", error);
    }
  }

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
    <div>
      <form onSubmit={handleSubmit(handleSubmitNewCategory)}>
        <div className="flex flex-wrap mx-3 mb-6">
          {/* New Field */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
              Field to add category
            </label>
            <select className="block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              {fieldList.map((field, idx) =>
                <option key={idx} value={field.id} {...register("fieldId")}>{field.name}</option>
              )}
            </select>
          </div>
        </div>

        {/* New category */}
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
              New Category Of Field
            </label>
            <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" {...register("name")}/>
          </div>
        </div>

        <div className=" w-1/2 relative">
          <button type="submit"
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