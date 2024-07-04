import React, { useEffect, useState } from "react";
import { useConversation } from "../zustant/useConversation";
import axios from "axios";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const headers = { "Content-Type": "application/json" };
        const res = await axios.post(
          `/api/messages/${selectedConversation._id}`,
          {},
          { headers }
        );
        if (res.data.Error) throw new Error(res.data.Error);
        setMessages(res.data);
      } catch (e) {
        throw new Error(e.messages);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
