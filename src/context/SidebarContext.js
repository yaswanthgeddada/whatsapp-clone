import React, { useContext } from "react";

const SideBarContext = React.createContext();

export function useSideBar() {
  return useContext(SideBarContext);
}

export function SideBarProvider({ children }) {}
