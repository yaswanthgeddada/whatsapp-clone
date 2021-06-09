import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "../api";
var CryptoJS = require("crypto-js");

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
    // console.log(result);
    if (result.data === "user not found" || result.data === "wrong password") {
      return result.data;
    }

    let cipherText = CryptoJS.AES.encrypt(
      JSON.stringify(result.data),
      "thisisimysecretkey"
    ).toString();

    // localStorage.setItem("currentUser", JSON.stringify(result.data));

    // console.log(cipherText);

    localStorage.setItem("user", cipherText);

    setCurrentUser(result.data);
  }

  function getCurrentUser() {
    // const user = JSON.parse(localStorage.getItem("currentUser"));

    const EncUser = localStorage.getItem("user");

    if (EncUser) {
      var bytes = CryptoJS.AES.decrypt(EncUser, "thisisimysecretkey");
      var DecriptedUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    // console.log("decripted text :", DecriptedUser);

    // console.log(user);
    setCurrentUser(DecriptedUser);
  }

  function updateCurrentUser(data, whichProp) {
    let user = currentUser;

    // localStorage.removeItem("currentUser");
    localStorage.removeItem("user");

    if (whichProp === "profilepic") {
      user.profilePicture = data;
    }

    if (whichProp === "username") {
      user.username = data;
    }

    if (whichProp === "bio") {
      user.bio = data;
    }
    // localStorage.setItem("currentUser", JSON.stringify(user));

    let cipherText = CryptoJS.AES.encrypt(
      JSON.stringify(user),
      "thisisimysecretkey"
    ).toString();

    localStorage.setItem("user", cipherText);

    setCurrentUser(user);
  }

  async function logout() {
    // await localStorage.removeItem("currentUser");
    await localStorage.removeItem("user");

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
