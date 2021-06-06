import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Conversation from "../components/conversation/Conversation";
import FriendProfile from "../components/sidebar/FriendProfile";

import { useUser } from "../context/UserContext";

const Home = () => {
  const { showFriendProfile } = useUser();

  return (
    <div className="flex w-screen h-screen justify-between">
      <div className="bg-pale sm:w-96  md:w-2/5 border-r-2 border-gray-400  border-opacity-25 overflow-y-scroll">
        <Sidebar />
      </div>
      <div className="w-full bg-pale-light ">
        <Conversation />
      </div>
      {showFriendProfile && (
        <div>
          <FriendProfile friend={showFriendProfile} />
        </div>
      )}
    </div>
  );
};

export default Home;
