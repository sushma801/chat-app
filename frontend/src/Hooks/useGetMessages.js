import { useCallback, useEffect, useState } from 'react';
import { useConversation } from '../zustant/useConversation';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../store/ConversationSlice';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  // const { messages, setMessages, selectedConversation } = useConversation();
  const dispatch = useDispatch();
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation);
  const messages = useSelector((state) => state.conversation.messages);

  const getMessages = useCallback(async () => {
    setLoading(true);
    try {
      const headers = { 'Content-Type': 'application/json' };
      const res = await axios.post(`/api/messages/${selectedConversation._id}`, {}, { headers });
      if (res.data.Error) throw new Error(res.data.Error);
      // setMessages(res.data);
      dispatch(setMessages(res.data));
    } catch (e) {
      throw new Error(e.messages);
    } finally {
      setLoading(false);
    }
  }, [selectedConversation?._id]);

  useEffect(() => {
    // const getMessages = async () => {
    //   setLoading(true);
    //   try {
    //     const headers = { 'Content-Type': 'application/json' };
    //     const res = await axios.post(`/api/messages/${selectedConversation._id}`, {}, { headers });
    //     if (res.data.Error) throw new Error(res.data.Error);
    //     setMessages(res.data);
    //   } catch (e) {
    //     throw new Error(e.messages);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
