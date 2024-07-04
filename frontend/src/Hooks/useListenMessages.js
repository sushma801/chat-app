import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useConversation } from "../zustant/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
      console.log("inside the useEffect");
    });
    return () => socket?.off("newMessage");
  }, [setMessages, messages]);
};

export default useListenMessages;
