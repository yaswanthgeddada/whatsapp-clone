import React, { useState, useEffect, useCallback } from "react";
import SidebarHeader from "./SidebarHeader";
import ConversationListItem from "./ConversationListItem";
import UsersList from "./UsersList";

import { useOwnAuth } from "../../context/OwnAuthContext";

import { useConv } from "../../context/ConversationContext";
import { useUser } from "../../context/UserContext";

import { useSocket } from "../../context/SocketContext";

const Sidebar = () => {
  //every time it is creating a new socket change it
  const { socket } = useSocket();
  const [currentConv, setCurrentConv] = useState();
  const [arrivalConversationsReq, setArrialConversationReq] = useState();

  const [loading, setLoading] = useState(false);
  // const [allusers, setAllusers] = useState(false);
  const [peopleFound, setPeopleFound] = useState();
  const [friends, setFriends] = useState();

  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState();

  const {
    getConverssation,
    newConversation,
    setCorrentConversation,
    currentConversation,
    sendFreindRequest,
  } = useConv();
  const { searchUser } = useUser();

  const { logout, currentUser } = useOwnAuth();

  // socket for connection and a friend request hav comes it will execute
  useEffect(() => {
    socket.current.on("convOnReq", (data) => {
      setArrialConversationReq({
        members: data.members,
      });
      console.log("arrived a new req");
    });
  }, [socket]);

  useEffect(() => {}, []);

  useEffect(() => {
    const conversation = async () => {
      try {
        const result = await getConverssation(currentUser._id);
        setCurrentConv(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    conversation();
    arrivalConversationsReq && conversation();
  }, [
    arrivalConversationsReq,
    currentConversation,
    currentUser,
    getConverssation,
  ]);

  const searchHandler = useCallback(
    async (searchTerm) => {
      if (searchTerm.length > 2) {
        setLoading(true);
        try {
          const result = await searchUser(searchTerm);
          console.log(result);
          const res = result.filter(
            (u) =>
              u._id !== currentUser._id && u.friends.includes(currentUser._id)
          );

          const otherUsers = result.filter(
            (u) =>
              u._id !== currentUser._id && !u.friends.includes(currentUser._id)
          );
          setFriends(res);
          setPeopleFound(otherUsers);
        } catch (error) {
          console.log(error);
        }
      } else {
        setFriends([]);
        setPeopleFound([]);
      }
      setLoading(false);
    },
    [currentUser, searchUser]
  );

  const onSelectContact = async (contact) => {
    if (contact) {
      console.log(contact);
      setSearchTerm("");

      const isFriend = contact.friends.includes(currentUser._id);

      try {
        //get all the conversation of the current USer
        const conversations = await getConverssation(currentUser._id);
        let isThereAConvAlredy = false;

        // check if the is alredy a conversation
        if (conversations.length > 0) {
          isThereAConvAlredy = conversations.some((c) =>
            c.members.includes(contact._id)
          );
        }

        // console.log(currentConversation);

        if (isFriend) {
          if (isThereAConvAlredy) {
            console.log(isThereAConvAlredy);

            // show the converion that alredy exists.
            setCorrentConversation(
              conversations.find((c) => c.members.includes(contact._id))
            );
          } else {
            // he is a friend and no cov , start a new one and show it
            const newConv = await newConversation(currentUser._id, contact._id);
            setCorrentConversation(newConv);
            console.log(newConv);
          }
        } else {
          //is not friends send a freidn request.
          console.log(isThereAConvAlredy);
          try {
            socket.current.emit("friendRequest", {
              senderId: currentUser._id,
              receiverId: contact._id,
            });

            const newConv = await newConversation(currentUser._id, contact._id);
            console.log(newConv);

            const result = await sendFreindRequest(
              currentUser._id,
              contact._id
            );
            console.log(result);
            window.alert(result);
            setCorrentConversation(newConv);
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full ">
      <SidebarHeader logout={logout} currentUser={currentUser} />
      <hr className="border-t-2 border-gray-400 border-opacity-25" />
      <div className="px-2 py-1 ">
        <input
          type="search"
          onChange={(e) => {
            searchHandler(e.target.value);
            setSearchTerm(e.target.value);
          }}
          value={searchTerm}
          placeholder={` 🔍 search or start new chat`}
          className=" px-3 py-2 text-gray-400 rounded-full bg-pale-light placeholder-gray-500 focus:placeholder-opacity-0 border-pale-light w-full  my-2 "
        />
        {searchTerm && friends.length > 0 && (
          <div>
            <span className="text-gray-300 flex justify-center items-center  ">
              <div className="border-t-2 w-full border-gray-500"> </div>
              friend
              <div className="border-t-2  w-full border-gray-500"></div>
            </span>
            {friends.map((friend) => (
              <UsersList
                key={friend._id}
                friend={friend}
                setSelected={setSelected}
                selected={selected}
                onSelectContact={onSelectContact}
              />
            ))}
          </div>
        )}

        {searchTerm && peopleFound.length > 0 && (
          <div>
            <span className="text-gray-300 flex justify-center items-center">
              <div className="border-t-2 w-full border-gray-500"> </div>
              users
              <div className="border-t-2  w-full border-gray-500"></div>
            </span>
            {peopleFound.map((friend) => (
              <UsersList
                key={friend._id}
                friend={friend}
                onSelectContact={onSelectContact}
              />
            ))}
          </div>
        )}
      </div>

      {loading && <p className="text-gray-300 text-center">loading</p>}
      {!searchTerm &&
        currentConv?.map((conv) => (
          <div key={conv._id}>
            <ConversationListItem
              conversation={conv}
              currentUser={currentUser}
              setCorrentConversation={setCorrentConversation}
            />
          </div>
        ))}
    </div>
  );
};

export default Sidebar;
