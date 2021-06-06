import React, { useContext, useState } from "react";
import axios from "../api";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [showFriendProfile, setShowFriendProfile] = useState();

  async function getUser(userId) {
    const result = await axios.get("/user?userId=" + userId);
    return result;
  }

  // get all users in db
  async function getAllUsers() {
    try {
      const result = await axios.get("/user/allusers");
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  //search user by email
  async function searchUser(searchTerm) {
    try {
      const result = await axios.get("/user/search/" + searchTerm);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  //update user details (any details inn body)
  async function updateUserDetails(userId, data) {
    try {
      const result = await axios.put("user/" + userId, data);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    showFriendProfile,
    setShowFriendProfile,
    getUser,
    getAllUsers,
    searchUser,
    updateUserDetails,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
