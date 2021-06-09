import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useConv } from "../../context/ConversationContext";
import { format } from "timeago.js";

const ConversationListItem = ({
  conversation,
  currentUser,
  setCorrentConversation,
  setToggleSidebar,
  toggleSidebar,
}) => {
  const { getUser } = useUser();
  const { getMessagesByConvId } = useConv();

  const [user, setUser] = useState();
  const [lastMsg, setLastMsg] = useState("");

  const friendId = conversation.members.find((m) => m !== currentUser._id);

  useEffect(() => {
    const getUserById = async () => {
      const result = await getUser(friendId);
      setUser(result.data);
    };

    getUserById();
  }, [conversation.members, currentUser._id, friendId, getUser]);

  useEffect(() => {
    const getLastMessage = async () => {
      const result = await getMessagesByConvId(conversation._id);
      setLastMsg(result[result.length - 1]);
      // console.log(result);
    };

    getLastMessage();
  }, [getMessagesByConvId, conversation]);

  return (
    <div
      onClick={() => {
        setCorrentConversation(conversation);
        setToggleSidebar(!toggleSidebar);
      }}
      className={`flex justify-between cursor-pointer  px-4 py-3 hover:bg-pale-light border-b border-gray-400 border-opacity-25   `}
    >
      <div className="flex space-x-5 items-center">
        <img
          src={user?.profilePicture || "/images/default-user.jpg"}
          className="h-12 w-12 cursor-pointer rounded-full"
          alt=""
        />
        <div className="flex flex-col ">
          <span className="text-gray-300 text-lg">{user?.username}</span>
          <span className="text-gray-400 text-sm">{lastMsg?.text}</span>
        </div>
      </div>
      <div className="text-gray-400 flex  text-sm space-x-5">
        {format(lastMsg?.createdAt)}
      </div>
    </div>
  );
};

export default ConversationListItem;
