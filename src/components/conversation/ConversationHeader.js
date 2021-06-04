import React from "react";
import { FaEllipsisV, FaSistrix } from "react-icons/fa";

const ConversationHeader = ({ user }) => {
  return (
    <div className="flex justify-between items-center  px-4 py-3 bg-pale-light">
      <div className="flex items-center space-x-5">
        <img
          src={user?.profilePicture || "/images/default-user.jpg"}
          className="h-10 w-10 cursor-pointer rounded-full"
          alt=""
        />
        <div className="text-xl text-gray-300 font-semibold">
          {user?.username}
        </div>
      </div>
      <div className="text-gray-400 flex items-center space-x-5">
        <span className="cursor-pointer">
          <FaSistrix size="22" />
        </span>
        <span className="cursor-pointer">
          <FaEllipsisV size="20" />
        </span>
      </div>
    </div>
  );
};

export default ConversationHeader;
