import { useContext, createContext, useState } from "react";

import axios from "../api";

const ConvContext = createContext();

export function useConv() {
  return useContext(ConvContext);
}

export function ConvProvider({ children }) {
  const [currentConversation, setCorrentConversation] = useState();

  async function getConverssation(currentUserId) {
    try {
      const result = await axios.get(`conversation/${currentUserId}`);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function newConversation(currentUserId, friendId) {
    try {
      const result = await axios.post(`conversation/`, {
        senderId: currentUserId,
        receiverId: friendId,
      });
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getMessagesByConvId(conversationId) {
    try {
      const result = await axios.get(`message/${conversationId}`);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function sendNewMessage(conversationId, senderId, text) {
    try {
      const result = await axios.post("message/", {
        conversationId: conversationId,
        sender: senderId,
        text: text,
      });
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function sendFreindRequest(userId, friendId) {
    try {
      const result = await axios.put(`user/friendrequest/${userId}`, {
        userId: userId,
        friendId: friendId,
      });
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function acceptFreindRequest(userId, friendId) {
    try {
      const result = await axios.put(`user/acceptrequest/${userId}`, {
        userId: userId,
        friendId: friendId,
      });
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    currentConversation,
    setCorrentConversation,
    getConverssation,
    getMessagesByConvId,
    sendNewMessage,
    newConversation,
    sendFreindRequest,
    acceptFreindRequest,
  };

  return <ConvContext.Provider value={value}>{children}</ConvContext.Provider>;
}
