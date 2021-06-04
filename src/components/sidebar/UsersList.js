import React from "react";

const UsersList = ({ friend, onSelectContact }) => {
  return (
    <div onClick={() => onSelectContact(friend)}>
      <div
        className={`flex justify-between cursor-pointer  px-4 py-3   ${"bg-pale"}  border-b border-gray-400 border-opacity-25   `}
      >
        <div className="flex space-x-5 items-center">
          <img
            src={friend.profilePicture || "/images/default-user.jpg"}
            className="h-12 w-12 cursor-pointer rounded-full"
            alt=""
          />
          <div className="flex flex-col ">
            <span className="text-gray-300 text-lg">{friend.email}</span>
            <span className="text-gray-400 text-sm">{friend.username}</span>
          </div>
        </div>
        <div className="text-gray-400 flex  text-sm space-x-5">
          {friend?.gender}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
