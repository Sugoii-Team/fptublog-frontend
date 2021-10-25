import React from "react";

ScrollToTopButton.propTypes = {};

function ScrollToTopButton(props) {
  return (
    <div
      className="fixed z-30 bottom-10 right-14 -3/4 border rounded-full px-5 py-5 w-10 h-10 bg-gray-50 shadow-md flex items-center justify-center cursor-pointer animate-bounce"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>
    </div>
  );
}

export default ScrollToTopButton;
