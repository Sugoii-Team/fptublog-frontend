import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PageAlert from '../../../components/PageAlert/PageAlert';
import StorageKey from '../../../constant/storage-keys';
import adminApi from '../../../services/adminApi';
import categoryApi from "../../../services/categoryApi";
import fieldApi from "../../../services/fieldAPI";

function CategoryList(props) {
  const currentUser = useSelector((state) => state.admin.current);
  const [categoriesList, setCategoriesList] = useState([]);
  //Get list field to make user know which of field that category belong to.
  const [fieldList, setFieldList] = useState([]);
  const [reload, setReload] = useState();
  useEffect(() => {
    (async () => {
      try {
        const categoriesReponse = await categoryApi.getCategories();
        const fieldReponse = await fieldApi.getAllFields();
        setCategoriesList(categoriesReponse.data);
        setFieldList(fieldReponse.data);
      } catch (error) {
        console.log("Fail to load category list (nav bar component)", error);
      }
    })();
  }, [reload]);

  const handleFieldOfCategory = (fieldId) => {
    if (fieldList.length !== 0) {
      const field = fieldList.find((field) => field.id === fieldId);
      return field?.name;
    } else return;
  };

  const hadleDeleteCategory = async (categoryId) => {
    try {
      const deleteCategory = await adminApi.deleteCategoryByCategoryId(
        categoryId
      );
      if (deleteCategory.status === 200) {
        window.alert("Delete category successfully");
        setReload({});
      } else {
        window.alert("Delete category failed");
        setReload({});
      }
    } catch (error) {
      console.log("Fail to delete field (fieldList component)", error);
      window.alert("Delete field failed");
      setReload({});
    }
  };

  return (
    currentUser.role === StorageKey.adminRole ?
      (<div className="mt-4 rounded-md">
        <p className="text-center text-2xl">
          LIST OF CATEGORY
        </p>
        <div className="container flex justify-center mx-auto">
          <div className="flex flex-col">
            <div className="w-full">
              <div className="border-b border-gray-200 shadow">
                <table>
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        No.
                      </th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Category
                      </th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Field of category
                      </th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Delete
                      </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                  {categoriesList.map((category, idx) => (
                    <tr key={idx} className="whitespace-nowrap">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {idx + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 text-center">
                          {category?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 text-center">
                          {handleFieldOfCategory(category?.fieldId)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="px-4 py-1 text-sm text-white bg-red-300 hover:bg-red-400 rounded"
                          onClick={() => hadleDeleteCategory(category?.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <PageAlert
      title="Access Denied"
      description="You don't have permission to view this page!"
    />
  ));
}

export default CategoryList;
