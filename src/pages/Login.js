import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// import { useAuth } from "../context/AuthContext";
import { useOwnAuth } from "../context/OwnAuthContext";
import CircularProgress from "@material-ui/core/CircularProgress";

const Login = () => {
  // const { login, resetPassword } = useAuth();
  const { login } = useOwnAuth();
  const histoy = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      try {
        setIsLoading(true);
        const result = await login(email, password);
        if (result) {
          setError(result + "! 🤦‍♂️ ");
        } else {
          histoy.push("/");
        }
        setIsLoading(false);
      } catch (error) {
        setError("Wrong Credentails! & stop testing me 🤦‍♂️");
      }
    } else {
      setError("Stop testing me 🤦‍♂️");
    }
  };

  // const resetPasswordHandler = async () => {
  //   if (email !== "") {
  //     try {
  //       await resetPassword(email);
  //       window.alert("check you mail");
  //     } catch (error) {
  //       setError("Email is Invalid");
  //     }
  //   } else {
  //     setError("Enter Email");
  //   }
  // };

  return (
    <div className=" h-screen w-screen bg-pale	">
      <div className="bg-wbgreen h-2/5 w-full absolute z-0">
        <div className="mt-5 mx-20 flex items-center space-x-3 text-lg text-gray-100 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="39"
            height="39"
            viewBox="0 0 39 39"
          >
            <path
              fill="#00E676"
              d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"
            ></path>
            <path
              fill="#FFF"
              d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"
            ></path>
          </svg>
          <div>WHATSAPP WEB</div>
        </div>
        <div className="w-4/5 h-96 mx-auto my-20 rounded-lg shadow-2xl bg-gray-100 flex justify-around px-10">
          <div className="md:flex flex-col space-y-3  justify-center  hidden">
            <p className="text-4xl font-thin mb-10">
              To use WhatsApp on your computer:
            </p>
            <p className="text-lg font-mono">1. Enter Gmail and Password</p>
            <p className="text-lg font-mono">
              2. Password should have min 6 characters
            </p>

            <p className="text-lg font-mono mt-10 text-wbgreen">
              Need any help ?
            </p>
          </div>

          <form className="flex flex-col space-y-3 w-80 mt-10 justify-center ">
            <p className="text-lg font-serif text-center text-wbgreen font-semibold filter drop-shadow-lg ">
              Login to WhatsApp
            </p>
            {error && (
              <p className=" text-center text-red-700 filter drop-shadow cursor-pointer ">
                {error}
              </p>
            )}
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder="email"
              className="rounded "
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="password"
              className="rounded "
            />
            <button
              type="submit"
              onClick={(e) => handleLogin(e)}
              className="bg-wbgreen rounded-full text-gray-100 hover:bg-wgreen  border-none focus:outline-none  py-2 "
            >
              <span className="pt-1 flex items-center justify-center space-x-3">
                {isLoading && <CircularProgress size={20} />}
                <p>Login</p>
              </span>
            </button>

            <hr />
            {/* <p
              className="cursor-pointer text-sm text-wbgreen text-center"
              onClick={resetPasswordHandler}
            >
              Forget passwrod
            </p> */}

            <hr />
            <Link
              to="/signup"
              className=" text-center text-wbgreen filter drop-shadow cursor-pointer "
            >
              don't Have an account , Signup
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
