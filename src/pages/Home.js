import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Conversation from "../components/conversation/Conversation";
import FriendProfile from "../components/sidebar/FriendProfile";

import { useUser } from "../context/UserContext";
import { AiOutlineClose, AiFillCaretRight } from "react-icons/ai";

const Home = () => {
  const { showFriendProfile } = useUser();
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <div className="flex w-screen h-screen justify-between">
      <div className="bg-pale sm:w-96 hidden md:block md:w-2/5 border-r-2 border-gray-400  border-opacity-25 overflow-y-scroll">
        <Sidebar
          setToggleSidebar={setToggleSidebar}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <div
        onClick={() => setToggleSidebar(!toggleSidebar)}
        className="absolute z-40 text-white right-0 top-5"
      >
        <div className="md:hidden block">
          {toggleSidebar ? (
            <div className="mr-2">
              <AiOutlineClose size="25" />
            </div>
          ) : (
            <div className="-mt-1 mr-2">
              {!showFriendProfile && <AiFillCaretRight size="30" />}
            </div>
          )}
        </div>
      </div>
      {toggleSidebar && (
        <div className="bg-pale w-screen h-screen  z-20 fixed md:hidden border-r-2 border-gray-400  border-opacity-25 overflow-y-scroll">
          <Sidebar
            setToggleSidebar={setToggleSidebar}
            toggleSidebar={toggleSidebar}
          />
        </div>
      )}
      <div className="w-full bg-pale-light ">
        <Conversation />
      </div>
      {showFriendProfile && (
        <React.Fragment>
          <div className="hidden md:block">
            <FriendProfile friend={showFriendProfile} />
          </div>
          <div className="w-screen h-screen  z-30 fixed md:hidden">
            <FriendProfile friend={showFriendProfile} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Home;
