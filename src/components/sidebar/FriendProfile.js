import React from "react";

import { AiOutlineClose, AiOutlineGithub, AiOutlineMail } from "react-icons/ai";

import { useUser } from "../../context/UserContext";

const FriendProfile = ({ friend }) => {
  // console.log(friend);

  const { setShowFriendProfile } = useUser();

  return (
    <div>
      <div className="flex flex-col bg-pale w-screen md:w-96 sm:z-10 h-screen select-none ">
        <div className="bg-profileHead w-full h-20">
          <div
            onClick={() => setShowFriendProfile()}
            className="flex justify-start items-center space-x-10 pt-10 pb-5 px-10 text-gray-200 text-2xl font-semibold "
          >
            <span className=" transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110  cursor-pointer">
              <AiOutlineClose size="25" />
            </span>
            <div> {friend?.username} </div>
          </div>
        </div>
        <div className="flex hover:hidden justify-center items-center h-60 px-10 relative">
          <img
            src={friend?.profilePicture || "/images/default-user.jpg "}
            alt=""
            className="h-48 w-48 rounded-full cursor-pointer object-cover mt-5"
          />

          {/* <div className="w-40 h-40 bg-pale-light rounded-full absolute"> </div> */}
        </div>

        <div className="text-wgreen px-10">Name :</div>
        <div className="flex justify-between px-10 my-2">
          <div>
            <span className="text-lg text-gray-200 font-mono font-thin">
              {friend?.username}
            </span>
          </div>

          <span className="text-gray-200 cursor-pointer">
            <AiOutlineGithub size="25 " />
          </span>
        </div>
        <hr />

        <div className="text-wgreen px-10 mt-5">About :</div>
        <div className="flex justify-between px-10 mb-5">
          <div>
            <span className="text-gray-200 ">{friend?.bio}</span>

            <span className="text-gray-200 cursor-pointer">
              {/* <AiTwotoneEdit size="25 " /> */}
            </span>
          </div>
        </div>
        <hr />
        <div className="text-wgreen px-10 mt-5">Contact :</div>
        <div>
          <div className="flex justify-between items-center px-10 mb-5">
            <span className="text-gray-200 ">{friend?.email}</span>

            <span className="text-gray-200 cursor-pointer">
              <AiOutlineMail size="20 " />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;
