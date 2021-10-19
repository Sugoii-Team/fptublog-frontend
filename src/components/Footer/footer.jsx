import React from "react";
import { Link } from "react-router-dom";

Footer.propTypes = {};

function Footer(props) {
  return (
    <div>
      <div className="mt-10 border-t-2 w-full">
        <footer className="text-gray-100 body-font bg-white">
          <div className="container px-5 py-5 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
            <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
              <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-white p-2 bg-red-700 rounded-full"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <span className="ml-3 text-xl text-black">DEV</span>
              </div>
              <p className="mt-2 text-sm text-black">
                Air plant banjo lyft occupy retro adaptogen indego
              </p>
            </div>
            <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
              <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-bold text-black tracking-widest text-md mb-3">
                  CATEGORIES
                </h2>
                <nav className="list-none mb-10">
                  <li>
                    <Link
                      to="#"
                      className="text-black hover:text-red-300"
                      href="#"
                    >
                      First Link
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-black hover:text-red-300"
                      href="#"
                    >
                      Second Link
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-black hover:text-red-300"
                      href="#"
                    >
                      Third Link
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-black hover:text-red-300"
                      href="#"
                    >
                      Fourth Link
                    </Link>
                  </li>
                </nav>
              </div>
            </div>
          </div>
          <div className="border-b-2 border-gray-400 w-8 flex mx-auto"></div>
          <div className="">
            <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col justify-center sm:flex-row">
              <p className="text-gray-400 text-sm text-center sm:text-left">
                © 2021 Dev —
                <a
                  href="https://twitter.com/knyttneve"
                  rel="noopener noreferrer"
                  className="text-gray-400 ml-1"
                  target="_blank"
                >
                  @DSC-FPTUBlog
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
