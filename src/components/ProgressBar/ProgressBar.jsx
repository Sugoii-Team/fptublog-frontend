import React from "react";

const ProgressBar = (props) => {
  const { frombgColor, tobgColor, completed } = props;
  const ProgressBarStyle = `h-4  bg-gradient-to-r from-${frombgColor}-500 to-${tobgColor}-700`;

  const fillerStyles = {
    width: `${completed}%`,
    borderRadius: "inherit",
    textAlign: "right",
  };

  return (
    <div className="h-4 w-full bg-gray-300 rounded-full">
      <div style={fillerStyles} className={ProgressBarStyle}>
        <p className="pr-3 text-xs text-purple-50">{`${completed}%`}</p>
      </div>
    </div>
  );
};

export default ProgressBar;
