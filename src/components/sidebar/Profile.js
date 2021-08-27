import React, { useState } from "react";

import { AiTwotoneEdit } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

import { useSpring, animated } from "react-spring";

import { addImageToStorageBucket } from "../../firebase/UploadImageService";
import { LinearProgress } from "@material-ui/core";
import { useUser } from "../../context/UserContext";
import { useOwnAuth } from "../../context/OwnAuthContext";

import Resizer from "react-image-file-resizer";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

export default function Profile({ setIsOpen, currentUser }) {
  const { updateUserDetails } = useUser();
  const { updateCurrentUser } = useOwnAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [showInputForUsername, setShowInputForUsername] = useState(false);
  const [showInputForBio, setShowInputForBio] = useState(false);

  const styles = useSpring({
    config: { duration: 500 },
    to: { x: 0 },
    from: { x: -1000 },
  });

  const onSelectProfilePic = async (e) => {
    if (e.target.files[0]) {
      // console.log(e.target.files[0]);
      let originalImage = e.target.files[0];
      let image;

      try {
        image = await resizeFile(originalImage);
        console.log(image);
      } catch (err) {
        console.log(err);
      }

      try {
        await addImageToStorageBucket(
          image,
          setIsLoading,
          setProgress,
          setImageUrl,
          "profilepics",
          updatePic
        ).then(() => {});
        // console.log(progress);
        // console.log(imageUrl);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updatePic = async (img) => {
    try {
      await updateUserDetails(currentUser._id, {
        userId: currentUser._id,
        profilePicture: img,
      });
      updateCurrentUser(img, "profilepic");
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  //update the username and change the current user in loaclstorage
  const updateUserName = async (e) => {
    e.preventDefault();
    // console.log(e.target.firstChild.value);

    await updateUserDetails(currentUser._id, {
      userId: currentUser._id,
      username: e.target.firstChild.value,
    });
    updateCurrentUser(e.target.firstChild.value, "username");

    // console.log(result);
    setShowInputForUsername(false);
  };

  //update the bio and change the current user in loaclstorage
  const updateBio = async (e) => {
    e.preventDefault();
    // console.log(e.target.firstChild.value);

    await updateUserDetails(currentUser._id, {
      userId: currentUser._id,
      bio: e.target.firstChild.value,
    });
    updateCurrentUser(e.target.firstChild.value, "bio");

    // console.log(result);
    setShowInputForBio(false);
  };

  // console.log(currentUser);

  return (
    <animated.div style={styles} className="">
      <div className="h-screen flex-col bg-pale w-full absolute overflow-y-scroll ">
        <div className="bg-profileHead w-full h-30">
          <div className="flex justify-start items-center space-x-10 pt-16 pb-5 px-10 text-gray-200 text-2xl font-semibold ">
            <span className="cursor-pointer" onClick={() => setIsOpen(false)}>
              <BiArrowBack size="35" />
            </span>
            <div> Profile </div>
          </div>
        </div>
        <div className="flex hover:hidden justify-center items-center h-56 px-10 relative">
          <label htmlFor="profilePic">
            <img
              src={
                imageUrl ||
                currentUser?.profilePicture ||
                "/images/default-user.jpg "
              }
              alt=""
              className="h-40 w-40 rounded-full cursor-pointer object-cover"
            />

            <input
              type="file"
              className=""
              id="profilePic"
              hidden
              accept="image/.jpg, image/.jpeg, image/.png "
              onChange={onSelectProfilePic}
            />
          </label>
          {/* <div className="w-40 h-40 bg-pale-light rounded-full absolute"> </div> */}
        </div>
        {isLoading && (
          <div className="my-2">
            <LinearProgress variant="determinate" value={progress} />
          </div>
        )}
        <div className="text-wgreen px-10">Your Name</div>
        <div className="flex justify-between px-10 my-2">
          <div>
            {!showInputForUsername ? (
              <span className="text-lg text-gray-200 font-mono font-thin">
                {currentUser?.username}
              </span>
            ) : (
              <form onSubmit={updateUserName}>
                <input
                  type="text"
                  name="un"
                  className="bg-pale border-0 border-b-2 focus:ring-0 text-gray-100 "
                />
              </form>
            )}
          </div>

          <span
            className="text-gray-200 cursor-pointer"
            onClick={() => setShowInputForUsername(!showInputForUsername)}
          >
            <AiTwotoneEdit size="25 " />
          </span>
        </div>
        <hr />
        <div className="text-gray-400 px-10 my-5 ">
          This is your username which will be visible for the other people in
          the platform
        </div>
        <div className="text-wgreen px-10">About</div>
        <div className="flex justify-between px-10">
          <div>
            {!showInputForBio ? (
              <span className="text-gray-200 ">{currentUser?.bio}</span>
            ) : (
              <form onSubmit={updateBio}>
                <input
                  type="text"
                  name="un"
                  className="bg-pale border-0 border-b-2 focus:ring-0 text-gray-100 "
                />
              </form>
            )}
          </div>
          <span
            className="text-gray-200 cursor-pointer"
            onClick={() => setShowInputForBio(!showInputForBio)}
          >
            <AiTwotoneEdit size="25 " />
          </span>
        </div>
        <hr />
      </div>
    </animated.div>
  );
}
