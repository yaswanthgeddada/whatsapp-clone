import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { OwnAuthProvider } from "./context/OwnAuthContext";
import { UserProvider } from "./context/UserContext";
import { ConvProvider } from "./context/ConversationContext";

ReactDOM.render(
  <UserProvider>
    <OwnAuthProvider>
      <AuthProvider>
        <ConvProvider>
          <App />
        </ConvProvider>
      </AuthProvider>
    </OwnAuthProvider>
  </UserProvider>,

  document.querySelector("#root")
);
