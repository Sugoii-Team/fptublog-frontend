import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import tagsApi from "../../services/tagsApi";

TagSuggest.propTypes = {
  
};

function TagSuggest() {

  const [topTagList, setTopTagList] = useState([]);

  useEffect(() => {
    (async ()=>{
      try {
        const topTagReponse = await tagsApi.getTopTagToSuggestOnLeftSide();
        // console.log("top tag ne: ", topTagReponse.data)
        if(topTagReponse.status === 200){
          setTopTagList(topTagReponse.data);
        }
      } catch (error) {
        console.log("Fail to load top tag to suggest (suggest tag component)", error);
      }
    })();
  }, []);
  return (

    <div className="mt-8">
      <div className="h-full">
        {/* <!-- First side Items --> */}
        {(topTagList !== null) ?
        <div className="w-full">
          <div className="text-center text-lg uppercase font-medium">
            <span className="">Popular Tag</span>
            <div className="border-t-2 border-gray-300 w-8 flex mx-auto"></div>
          </div>
          <div className="flex justify-center mt-4">
            <ul>             
               {topTagList.map((topTag, idx) => (
                <li key = {idx} className="w-80 my-1">
                  <div >
                  {/* Go to blog list based on top tag */}
                  <Link
                    to = {{
                      pathname: '/blogBaseOnTopTag',
                      state:{
                        topTag : {topTag},
                      }
                    }}
                    // className = "px-3"
                    className="py-3 text-center text-sm font-medium uppercase bg-gray-50 shadow-sm hover:bg-gray-200 
                    cursor-pointer transition ease-in-out duration-100 rounded-md mt-1 block"
                  >
                    {topTag.name}
                  </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        :null}
        {/* <!-- First side Items --> */}
      </div>
    </div>
  );
}

export default TagSuggest;