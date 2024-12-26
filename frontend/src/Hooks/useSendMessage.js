import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../store/ConversationSlice';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const conversationDetails = useSelector((state) => state.conversation);
  const { messages, selectedConversation } = conversationDetails;

  // const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (message) => {
    setLoading(true);
    console.log({ message }, { selectedConversation: selectedConversation._id });
    try {
      const headers = { 'Content-Type': 'application/json' };
      const res = await axios.post(
        `/api/messages/send/${selectedConversation._id}`,
        JSON.stringify({ message }),
        { headers },
      );
      console.log({ res });
      if (res.data.Error) throw new Error(res.data.Error);
      dispatch(setMessages([...messages, res.data]));
      // setMessages([...messages, res.data]);
    } catch (e) {
      // throw new Error(e.message);
      console.log(e);
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
