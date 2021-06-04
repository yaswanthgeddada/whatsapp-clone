import React from "react";

const Messages = ({ own, text }) => {
  return (
    <div className="inline-block w-full">
      <div
        className={`rounded-xl  md:max-w-lg sm:max-w-xs ${
          own ? "float-right bg-wgreen" : "float-left bg-pale-light"
        } px-10 py-2 m-2  bg-auto  text-left break-all text-gray-100 `}
      >
        {text}
      </div>
    </div>
  );
};

export default Messages;
