import React, { useEffect, useState, useRef, useCallback } from "react";
import { BsLaptop } from "react-icons/bs";
import ConversationHeader from "./ConversationHeader";
import Messages from "./Messages";
import MessageSender from "./MessageSender";

import { useUser } from "../../context/UserContext";
import { useConv } from "../../context/ConversationContext";
import { useOwnAuth } from "../../context/OwnAuthContext";

import { useSocket } from "../../context/SocketContext";

const Conversation = () => {
  const { getUser } = useUser();
  const { currentUser } = useOwnAuth();
  const {
    currentConversation,
    getMessagesByConvId,
    sendNewMessage,
    acceptFreindRequest,
    deleteConversation,
  } = useConv();

  const { socket } = useSocket();

  const [user, setUser] = useState();
  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [isAFriend, setIsAFriend] = useState(false);
  const [reqIsAccepted, setReqIsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const scrollRef = useRef();

  const friendId = currentConversation?.members.find(
    (m) => m !== currentUser?._id
  );

  const sendMessageHandler = async (e) => {
    // console.log(newMessage);
    e.preventDefault();

    if (newMessage) {
      socket.current.emit("sendMessage", {
        senderId: currentUser._id,
        receiverId: friendId,
        text: newMessage,
      });

      try {
        const meg = await sendNewMessage(
          currentConversation._id,
          currentUser._id,
          newMessage
        );
        setMessages([...messages, meg]);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    arrivalMessage &&
      currentConversation?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentConversation?.members]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [currentUser, socket]);

  //get friend details for conv header
  const getFrind = useCallback(async () => {
    const result = await getUser(friendId);
    setUser(result.data);

    const isFriend = result.data.friends.includes(currentUser._id);

    // console.log("is a friend :", isFriend);

    const reqispending = result.data.requests.includes(currentUser._id);

    // console.log("req is pending", reqispending);
    setReqIsAccepted(reqispending);
    setIsAFriend(isFriend);
    setIsLoading(false);
  }, [currentUser._id, friendId, getUser]);
  useEffect(() => {
    if (currentConversation) {
      getFrind();
    }
  }, [currentConversation, friendId, currentUser, getUser, getFrind]);

  //get all messages of a conv

  const getAllMessages = useCallback(async () => {
    const mess = await getMessagesByConvId(currentConversation?._id);
    // console.log(mess);
    setMessages(mess);
  }, [currentConversation?._id, getMessagesByConvId]);

  useEffect(() => {
    getAllMessages();
  }, [currentConversation, getAllMessages, getMessagesByConvId]);

  const deleteConv = async () => {
    try {
      await deleteConversation(currentConversation._id);

      // console.log(currentConversation);

      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  //scroll to view
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const AcceptTheFriendReq = async () => {
    const result = await acceptFreindRequest(currentUser._id, user?._id);
    getFrind();
    console.log(result);
  };

  return (
    <div>
      {!currentConversation ? (
        <div className="flex flex-col  justify-center items-center w-full h-screen select-none space-y-5">
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/chit-chat123.appspot.com/o/backgroundImage.JPG?alt=media&token=509415b1-8f1e-4076-9ce5-e59c10bfce35"
              alt=""
              className="h-56 w-56"
            />
          </div>
          <div className="text-3xl text-gray-100 font-light ">
            Keep your phone connected
          </div>
          <div className="text-sm text-gray-400 break-words text-center w-96 ">
            chit-chat will use your gmail address to sycn messages to Reduce
            data usage, connect to your gmail
            <hr className="my-10" />
            <div className="flex items-center justify-center ">
              <BsLaptop /> &nbsp; check out the code in github, pls give a 🌟
            </div>
          </div>
        </div>
      ) : (
        <div>
          {!isLoading && (
            <div className="flex flex-col h-screen">
              <div>
                <ConversationHeader user={user} deleteConv={deleteConv} />
              </div>
              <div className="bg-pale h-full overflow-y-scroll">
                <div className="">
                  {messages &&
                    messages.map((msg) => (
                      <div ref={scrollRef} key={msg._id}>
                        <Messages
                          text={msg.text}
                          currentUser={currentUser}
                          own={currentUser._id === msg.sender}
                        />
                      </div>
                    ))}

                  {reqIsAccepted && (
                    <div>
                      <div className="text-center w-3/5 mt-10 mx-auto bg-pale-light border-b-4 border-wgreen py-2 rounded-xl  text-gray-300 text-2xl sticky bottom-0">
                        you have sent a Friend Request to{" "}
                        <span className="text-wbgreen shadow">
                          {user?.username}
                        </span>
                      </div>
                    </div>
                  )}
                  {!reqIsAccepted && !isAFriend && (
                    <div className="text-center w-3/5 mt-10 mx-auto bg-pale-light border-b-4 border-wgreen py-2 rounded-xl  text-gray-300 text-2xl sticky bottom-0">
                      {user?.username} wants to be friends with you :{" "}
                      <button
                        onClick={AcceptTheFriendReq}
                        className="bg-wgreen hover:bg-wbgreen hover:text-gray-800 focus:outline-none px-8 py-2 mx-5 text-base rounded-lg "
                      >
                        Accept
                      </button>
                      <button className="bg-yellow-800 hover:bg-yellow-900 focus:outline-none px-8 py-2  text-base rounded-lg ">
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full">
                <MessageSender
                  setNewMessage={setNewMessage}
                  newMessage={newMessage}
                  sendMessageHandler={sendMessageHandler}
                  isAFriend={isAFriend}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Conversation;
