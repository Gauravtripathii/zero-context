import TextCard from "./TextCard";
import axios from "axios";

import { useState, useEffect } from "react";

import Messages from "./Messages";

import toast from "react-hot-toast";

const Main = ({ isLoggedIn }: any) => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [openMessagePopUp, setOpenMessagePopUp] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");

  const getUserMessage = async () => {
    await axios
      .get("/api/isMessage")
      .then((response) => {
        // console.log("Response after fetching data from token : ", response);
        setUserMessage(response.data.message);
      })
      .catch((error) => console.log(error));
  };

  const addMessage = async () => {
    setOpenMessagePopUp(false);
    await axios
      .post("/api/addMessage", { message: newMessage })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    getUserMessage();
    toast.success("Message added successfully!");
  };

  useEffect(() => {
    getUserMessage();
  }, []);
  return (
    <div className="h-5/6 px-5 sm:px-10 lg:px-14 xl:px-24 py-5 flex gap-5">
      <Messages />
      {!isLoggedIn || userMessage ? (
        <div className="hidden"></div>
      ) : (
        <div onClick={() => setOpenMessagePopUp(true)} className="h-fit">
          <TextCard
            message="+"
            styles="text-[7vw] text-white bg-black border-2 border-black rounded-full w-10 h-10 hover:bg-white hover:text-black"
          />
        </div>
      )}

      {openMessagePopUp ? (
        <div className="popup bg-white border border-black rounded-md w-3/4 md:w-1/2 h-fit pb-5 md:pt-5 md:px-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="close-btn text-3xl md:text-5xl absolute top-0 right-3 cursor-pointer"
            onClick={() => setOpenMessagePopUp(false)}
          >
            &times;
          </div>

          <div className="p-5">
            <p>YOU CANNOT CHANGE THIS EVER :)</p>
            <input
              type="text"
              className="mt-5 px-3 md:px-5 py-2 md:py-4 outline-none w-full border rounded-xl md:text-xl"
              placeholder="your message"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
            />
            <button
              className="mt-5 px-3 py-2 outline-none w-full border border-black rounded-xl font-bold text-white bg-black hover:text-black hover:bg-white md:text-xl"
              onClick={addMessage}
            >
              SUBMIT
            </button>
          </div>
        </div>
      ) : (
        <div className="hidden"></div>
      )}
    </div>
  );
};

export default Main;
