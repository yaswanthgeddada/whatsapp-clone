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
      <div className="flex text-gray-400 md:space-x-10 space-x-2  md:px-5  px-4">
        <div className="cursor-pointer">
          <FaSmile size="25" />
        </div>
        <div className="cursor-pointer">
          <FaPaperclip size="25" />
        </div>
      </div>
      <div className="flex w-full md:px-10 px-2">
        {isAFriend && (
          <form onSubmit={sendMessageHandler} className="md:w-full w-64 ">
            <input
              type="text"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              placeholder="Type a message"
              className={` w-full text-lg rounded-full  py-3 bg-gray-700 border-none focus:ring-0 text-gray-200`}
            />
          </form>
        )}
      </div>
      <div
        onClick={sendMessageHandler}
        className="text-gray-400 pr-10 cursor-pointer hover:text-gray-300"
      >
        <FaPaperPlane size="25" />
      </div>
    </div>
  );
};

export default MessageSender;
