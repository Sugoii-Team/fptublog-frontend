import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PageAlert from '../../../components/PageAlert/PageAlert';
import adminApi from '../../../services/adminApi';
import fieldApi from '../../../services/fieldAPI';

function FieldList(props) {

  const [fieldList, setFieldList] = useState([]);
  const currentUser = useSelector((state) => state.admin.current);
  //reload component when delete complete
  const [reload, setReload] = useState();
  useEffect(() => {
    (async () => {
      try {
        const fieldReponse = await fieldApi.getAllFields();
        setFieldList(fieldReponse.data);
      } catch (error) {
        console.log("Fail to load category list (fieldList component)", error);
      }
    })();
  }, [reload]);


  //handle delete field
  const hadleDeleteField = async (fieldId) => {
    try {
      const deleteField = await adminApi.deleteFieldByFieldId(fieldId);
      console.log("delefield", deleteField);
      if (deleteField.status === 200) {
        window.alert("Delete field successfully");
        setReload({});
      } else {
        window.alert("Delete field failed");
        setReload({});
      }
    } catch (error) {
      console.log("Fail to delete field (fieldList component)", error);
      window.alert("Delete field failed");
      setReload({});
    }
  }

  return (
    currentUser.role === "ADMIN" ?
      (<div className="mt-4 rounded-md">
        <p className="text-center text-2xl">
          LIST OF FIELD
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
                        Field
                      </th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {fieldList.map((field, idx) =>
                      <tr key={idx} className="whitespace-nowrap">
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {idx + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 text-center">
                            {field.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button className="px-4 py-1 text-sm text-white bg-red-300 hover:bg-red-400 rounded"
                            onClick={() => hadleDeleteField(field.id)}>Delete</button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>)
      : (
        <PageAlert
          title="Access Denied"
          description="You don't have permission to view this page!"
        />
      )
  );
}

export default FieldList;