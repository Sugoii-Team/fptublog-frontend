import React, { useState } from "react";
import PropTypes from "prop-types";

InputDialog.propTypes = {
  title: PropTypes.string,
  isCancel: PropTypes.func,
};

function InputDialog(props) {
  const { title, isCancel, onSubmitReason } = props;
  const [reasonsContent, setReasonContent] = useState("");

  //If submit then send reason content to above components
  const handleSendReason = () => {
    onSubmitReason(reasonsContent);
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left w-full">
                <h3
                  className="text-lg uppercase font-bold text-center leading-6 text-gray-900"
                  id="modal-title"
                >
                  {title}
                </h3>
                <div className="mt-2">
                  <div>
                    <p className="font-semibold">Reason:</p>
                    <textarea
                      className="border border-gray-300 w-full p-2 rounded-md"
                      rows="12"
                      placeholder="Please input a reason!"
                      onInput={(e) => setReasonContent(e?.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-green-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={(e) => handleSendReason()}
            >
              Send
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                isCancel();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputDialog;
