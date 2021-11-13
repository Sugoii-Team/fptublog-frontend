import React from "react";

PageAlert.propTypes = {};

function PageAlert({ title, description }) {
  return (
    <div className="flex justify-center my-9">
      <div className="flex flex-col text-center">
        <div className="font-bold text-2xl uppercase">- {title} -</div>
        <div>{description}</div>
      </div>
    </div>
  );
}

export default PageAlert;
