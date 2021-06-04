import React, { useContext } from "react";
import axios from "../api";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  async function getUser(userId) {
    const result = await axios.get("/user?userId=" + userId);
    return result;
  }

  async function getAllUsers() {
    try {
      const result = await axios.get("/user/allusers");
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function searchUser(searchTerm) {
    try {
      const result = await axios.get("/user/search/" + searchTerm);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    getUser,
    getAllUsers,
    searchUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
