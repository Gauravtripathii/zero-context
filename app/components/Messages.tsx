// "use client";

import TextCard from "./TextCard";

import axios from "axios";
import { useState, useEffect } from "react";

const Messages = () => {
  const [messages, setMessages] = useState<any>([]);
  useEffect(() => {
    const getAllMessages = async () => {
      await axios
        .get("/api/getAllMessages")
        .then((response) => setMessages(response.data.messages))
        .catch((error) => console.log(error));
    };
    getAllMessages();
  }, []);

  return (
    <div className="h-fit flex flex-wrap gap-5">
      {messages.map((message: any) => (
        <TextCard
          key={message._id}
          message={message.message}
          styles="text-xl font-bold text-white bg-red-500 border-2 border-red-500 rounded-xl w-fit px-3 py-2"
        />
      ))}
    </div>
  );
};

export default Messages;
