"use client";

import { useState } from "react";

import Logo from "./logo";

const Header = () => {
  const [popupState, setPopupState] = useState("hidden");

  const loginBtnHandler = () => {
    console.log("Login Btn Clicked");
    setPopupState("absolute");
  };
  const signupBtnHandler = () => {
    console.log("Signup Btn Clicked");
    setPopupState("absolute");
  };
  return (
    <header className="bg-cyan-dark h-1/6 flex items-center justify-between px-5">
      <Logo custom="text-3xl" />
      <div className="auth uppercase text-md font-semibold flex items-center gap-5">
        <div
          className="login text-white cursor-pointer"
          onClick={loginBtnHandler}
        >
          login
        </div>
        <div
          className="signup bg-white hover:bg-cyan-dark text-cyan-dark hover:text-white border-2 border-white rounded-xl px-3 py-2 cursor-pointer"
          onClick={signupBtnHandler}
        >
          signup
        </div>
      </div>
      <div className={`popup-wrapper ${popupState} top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.4)]`} >
        <div className="popup bg-white border border-black rounded-md w-3/4 h-1/2 relative">
          <div
            className="close-btn text-3xl absolute top-0 right-3 cursor-pointer"
            onClick={() => setPopupState("hidden")}
          >
            &times;
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
