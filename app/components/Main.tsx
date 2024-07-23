import TextCard from "./TextCard";
import axios from "axios";

import { useState, useEffect } from "react";

const Main = ({ isLoggedIn }: any) => {
  const [userMessage, setUserMessage] = useState<string>("");

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
    await axios
      .post("/api/addMessage", { message: "Hello!!!" })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    getUserMessage();
  };

  useEffect(() => {
    getUserMessage();
  }, []);
  return (
    <div className="h-5/6 px-5 sm:px-10 lg:px-14 xl:px-24 py-5">
      {!isLoggedIn || userMessage ? (
        <div></div>
      ) : (
        <div onClick={addMessage}>
          <TextCard
            message="+"
            styles="text-[7vw] text-white bg-black border-2 border-black rounded-full w-10 h-10 hover:bg-white hover:text-black"
          />
        </div>
      )}
    </div>
  );
};

export default Main;
