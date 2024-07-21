"use client";

import { useState, useEffect } from "react";

// DType of user
import { User } from "../types/User";

import axios from "axios";

import Logo from "./logo";

const Header = () => {
  const [popupState, setPopupState] = useState("hidden");
  const [authMode, setAuthMode] = useState("login");
  const [userData, setUserData] = useState<User | null>({
    username: "",
    email: "",
    password: "",
    message: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const loginBtnHandler = () => {
    console.log("Login Btn Clicked");
    setAuthMode("login");
    setPopupState("absolute");
  };
  const signupBtnHandler = () => {
    console.log("Signup Btn Clicked");
    setAuthMode("signup");
    setPopupState("absolute");
  };

  const getUserData = async () => {
    await axios
      .get("/api/me")
      .then((response) => {
        console.log("Response after fetching data from token : ", response);
        setIsLoggedIn(true);
      })
      .catch((error) => console.log(error));
  };
  const signUp = async () => {
    console.log(userData);
    await axios
      .post("/api/signup", {
        username: userData?.username,
        email: userData?.email,
        password: userData?.password,
      })
      .then((response) => {
        getUserData();
      })
      .catch((error) => console.log(error));

    setPopupState("hidden");
  };

  // useEffect(() => {

  //   getUserData();
  // }, []);
  return (
    <header className="bg-cyan-dark h-1/6 flex items-center justify-between px-5 sm:px-10 lg:px-14 xl:px-24">
      <Logo custom="text-3xl sm:text-5xl" />
      <div className="auth uppercase text-md sm:text-2xl font-semibold flex items-center gap-5 xl:gap-10">
        {!isLoggedIn ? (
          <div className="w-full h-full flex items-center gap-5 xl:gap-10">
            <div
              className="login text-white cursor-pointer"
              onClick={loginBtnHandler}
            >
              login
            </div>
            <div
              className="signup bg-white hover:bg-cyan-dark text-cyan-dark hover:text-white border-2 border-white rounded-xl px-3 md:px-4 py-2 md:py-3 cursor-pointer"
              onClick={signupBtnHandler}
            >
              signup
            </div>
          </div>
        ) : (
          <div className="logout bg-white hover:bg-cyan-dark text-cyan-dark hover:text-white border-2 border-white rounded-xl px-3 md:px-4 py-2 md:py-3 cursor-pointer">
            logout
          </div>
        )}
      </div>
      <div
        className={`popup-wrapper ${popupState} top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.4)]`}
      >
        <div className="popup bg-white border border-black rounded-md w-3/4 h-fit pb-5 relative">
          <div
            className="close-btn text-3xl absolute top-0 right-3 cursor-pointer"
            onClick={() => setPopupState("hidden")}
          >
            &times;
          </div>
          {authMode === "login" ? (
            <div>Login</div>
          ) : (
            <div className="p-5">
              <input
                type="text"
                className="mt-5 px-3 py-2 outline-none w-full border rounded-xl"
                placeholder="Username"
                value={`${userData?.username}`}
                onChange={(event) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    username: event.target.value,
                    email: prevUserData?.email || "",
                    password: prevUserData?.password || "",
                    message: prevUserData?.message || "",
                  }))
                }
              />
              <input
                type="email"
                className="mt-5 px-3 py-2 outline-none w-full border rounded-xl"
                placeholder="Email address"
                value={`${userData?.email}`}
                onChange={(event) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    email: event.target.value,
                    username: prevUserData?.username || "",
                    password: prevUserData?.password || "",
                    message: prevUserData?.message || "",
                  }))
                }
              />
              <input
                type="password"
                className="mt-5 px-3 py-2 outline-none w-full border rounded-xl"
                placeholder="Password"
                value={`${userData?.password}`}
                onChange={(event) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    password: event.target.value,
                    email: prevUserData?.email || "",
                    username: prevUserData?.username || "",
                    message: prevUserData?.message || "",
                  }))
                }
              />
              <button
                className="mt-5 px-3 py-2 outline-none w-full border border-black rounded-xl font-bold text-white bg-black hover:text-black hover:bg-white"
                onClick={signUp}
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
