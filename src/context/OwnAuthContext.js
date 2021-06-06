import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "../api";

const OwnAuthContext = createContext();

export function useOwnAuth() {
  return useContext(OwnAuthContext);
}

export function OwnAuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  async function signIn(email, password, username) {
    const body = {
      username: username,
      email: email,
      password: password,
    };

    const result = await axios.post("/auth/register", body);
    localStorage.setItem("currentUser", JSON.stringify(result.data));
    setCurrentUser(result.data);
  }

  async function login(email, password) {
    const body = {
      email: email,
      password: password,
    };
    try {
    } catch (error) {}
    const result = await axios.post("/auth/login", body);
    console.log(result);
    if (result.data === "user not found" || result.data === "wrong password") {
      return result.data;
    }
    localStorage.setItem("currentUser", JSON.stringify(result.data));
    setCurrentUser(result.data);
  }

  function getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    // console.log(user);
    setCurrentUser(user);
  }

  function updateCurrentUser(data, whichProp) {
    let user = currentUser;

    localStorage.removeItem("currentUser");

    if (whichProp === "profilepic") {
      user.profilePicture = data;
    }

    if (whichProp === "username") {
      user.username = data;
    }

    if (whichProp === "bio") {
      user.bio = data;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
  }

  async function logout() {
    await localStorage.removeItem("currentUser");
    setCurrentUser();
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    currentUser,
    updateCurrentUser,
    signIn,
    logout,
    login,
  };

  return (
    <OwnAuthContext.Provider value={value}>{children}</OwnAuthContext.Provider>
  );
}
