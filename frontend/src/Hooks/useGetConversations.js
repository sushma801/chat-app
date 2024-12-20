import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const getConversations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/users');
      if (res.data.error) throw new Error(res.data.error);
      setConversations(res.data);
    } catch (e) {
      console.log('Error while loading the users');
    } finally {
      setLoading(false);
    }
  }, [conversations]);

  useEffect(() => {
    // const getConversations = async () => {
    //   setLoading(true);
    //   try {
    //     const res = await axios.get('/api/users');
    //     if (res.data.error) throw new Error(res.data.error);
    //     setConversations(res.data);
    //   } catch (e) {
    //     console.log('error while loading the users');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
