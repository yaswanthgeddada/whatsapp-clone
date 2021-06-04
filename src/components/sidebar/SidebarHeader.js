import React, { useState } from "react";
import { HiChatAlt } from "react-icons/hi";
import { FaEllipsisV } from "react-icons/fa";

// import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import Profile from "./Profile";

const SidebarHeader = ({ logout, currentUser }) => {
  let [isOpen, setIsOpen] = useState(true);
  // const { signOut } = useAuth();
  const history = useHistory();
  const logoutHandler = async () => {
    await logout();
    history.push("/login");
    // window.location.reload();
  };

  return (
    <div className="relative">
      {isOpen && <Profile setIsOpen={setIsOpen} isOpen={isOpen} />}

      <div className="flex justify-between items-center  px-4 py-3 bg-pale-light ">
        <img
          src={currentUser.profilePicture || "/images/default-user.jpg"}
          className="h-10 w-10 cursor-pointer rounded-full"
          onClick={() => setIsOpen(true)}
          alt=""
        />
        <div className="text-gray-400 flex items-center space-x-5">
          <span className="cursor-pointer">
            <HiChatAlt size="23" />
          </span>
          <span onClick={logoutHandler} className="cursor-pointer">
            <FaEllipsisV />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
