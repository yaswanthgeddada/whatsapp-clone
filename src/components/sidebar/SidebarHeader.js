import React, { useState } from "react";
import { HiChatAlt } from "react-icons/hi";

// import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import Profile from "./Profile";

import SidebarDropdown from "./SidebarDropdown";

const SidebarHeader = ({ logout, currentUser }) => {
  let [isOpen, setIsOpen] = useState(false);
  // const { signOut } = useAuth();
  const history = useHistory();
  const logoutHandler = async () => {
    await logout();
    history.push("/login");
    // window.location.reload();
  };

  return (
    <div className="relative">
      {isOpen && (
        <Profile
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          currentUser={currentUser}
        />
      )}

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
          <span className="cursor-pointer">
            <SidebarDropdown
              logoutHandler={logoutHandler}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
