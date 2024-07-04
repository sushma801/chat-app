import React, { useEffect, useState } from "react";
import axios from "axios";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/users");
        if (res.data.error) throw new Error(res.data.error);
        console.log(res);
        setConversations(res.data);
      } catch (e) {
        console.log("error while loading the users");
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
