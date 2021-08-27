import React from "react";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";

const MessageSender = ({
  sendMessageHandler,
  setNewMessage,
  newMessage,
  isAFriend,
}) => {
  return (
    <div className="flex justify-around w-full items-center py-3 bg-pale-light">
      <div className="flex text-gray-400 md:space-x-10 space-x-1  md:px-5  px-2">
        <div className="cursor-pointer">
          <FaSmile size="25" />
        </div>
        <div className="cursor-pointer">
          <FaPaperclip size="25" />
        </div>
      </div>
      <div className="flex md:w-full  w-56 md:px-10 px-0">
        {isAFriend && (
          <form onSubmit={sendMessageHandler} className="md:w-full w-64 ">
            <input
              type="text"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              placeholder="Type a message"
              className={` md:w-full w-56 text-lg rounded-full  py-3 bg-gray-700 border-none focus:ring-0 text-gray-200`}
            />
          </form>
        )}
      </div>
      <div
        onClick={sendMessageHandler}
        className="text-gray-400 md:pr-10 pr-5  cursor-pointer hover:text-gray-300"
      >
        <FaPaperPlane size="25" />
      </div>
    </div>
  );
};

export default MessageSender;
