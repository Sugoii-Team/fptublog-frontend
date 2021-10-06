import React from "react";
import { Link } from "react-router-dom";

Approval.propTypes = {};

function Approval(props) {
  return (
    <div className="flex justify-center my-4">
      <table className="border-collapse w-10/12">
        <thead>
          <tr>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell w-3/4">
              New Blog
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Author
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-left border border-b block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                New Blog
              </span>
              <Link to="/blogDetails" className="font-bold">
                Cach code JS
              </Link>
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Author
              </span>
              <Link to="/users">MrThanhZ</Link>
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Status
              </span>
              <span className="rounded bg-yellow-500 py-1 px-3 text-xs font-bold">
                pending
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Approval;
