import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Conversation from "../components/conversation/Conversation";

const Home = () => {
  return (
    <div className="flex w-screen h-screen justify-between">
      <div className="bg-pale sm:w-96  md:w-2/5 border-r-2 border-gray-400  border-opacity-25 ">
        <Sidebar />
      </div>
      <div className="w-full bg-pale-light ">
        <Conversation />
      </div>
    </div>
  );
};

export default Home;
