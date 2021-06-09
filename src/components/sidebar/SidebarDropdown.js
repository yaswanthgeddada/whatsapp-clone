import React from "react";
import { FaEllipsisV } from "react-icons/fa";

import { Menu } from "@headlessui/react";

const SidebarDropdown = ({ logoutHandler, setIsOpen, isOpen }) => {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2  text-sm font-medium text-gray-300  focus:outline-none"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <FaEllipsisV />
          </Menu.Button>
        </div>

        <Menu.Items
          className="origin-top-right border border-profileHead  absolute right-0 mt-2 w-56 shadow-xl text-gray-200 font-medium bg-pale-light rounded-lg "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className=" block px-4 py-2 text-sm hover:bg-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2"
            >
              Profile
            </div>

            <button
              className=" block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-3"
              onClick={logoutHandler}
            >
              Sign out
            </button>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default SidebarDropdown;
