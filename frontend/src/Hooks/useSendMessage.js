import React, { useState } from "react";
import { useConversation } from "../zustant/useConversation";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const headers = { "Content-Type": "application/json" };
      const res = await axios.post(
        `/api/messages/send/${selectedConversation._id}`,
        JSON.stringify({ message }),
        { headers }
      );
      console.log(res);
      if (res.data.Error) throw new Error(res.data.Error);
      setMessages([...messages, res.data]);
    } catch (e) {
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
