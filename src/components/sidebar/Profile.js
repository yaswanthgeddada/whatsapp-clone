import { AiTwotoneEdit } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

export default function Profile({ isOpen, setIsOpen }) {
  return (
    <div className=" transform translate-x-full 10000">
      <div className="h-screen flex-col bg-pale w-full absolute overflow-y-scroll ">
        <div className="bg-profileHead w-full h-30">
          <div className="flex justify-start items-center space-x-10 pt-16 pb-5 px-10 text-gray-200 text-2xl font-semibold ">
            <span className="cursor-pointer" onClick={() => setIsOpen(false)}>
              <BiArrowBack size="35" />
            </span>
            <div> Profile </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-56 px-10">
          <img
            src="/images/default-user.jpg"
            alt=""
            className="h-40 w-40 rounded-full"
          />
        </div>
        <div className="text-wgreen px-10">Your Name</div>
        <div className="flex justify-between px-10">
          <span className="text-lg text-gray-200 font-mono font-thin">
            Yashu{" "}
          </span>
          <span className="text-gray-200 cursor-pointer">
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
          <span className="text-gray-200 ">
            Hi ther i'm using whatsapphis is your username which will be visible
            for the other people in the platform
          </span>
          <span className="text-gray-200 cursor-pointer">
            <AiTwotoneEdit size="25 " />
          </span>
        </div>
        <hr />
      </div>
    </div>
  );
}
