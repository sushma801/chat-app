import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import notificationSound from '../assets/sound/I_phone.mp3';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../store/ConversationSlice';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  // const { messages, setMessages } = useConversation();
  const dispatch = useDispatch();
  const conversationDetails = useSelector((state) => state.conversation);
  const { messages } = conversationDetails;

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      dispatch(setMessages([...messages, newMessage]));
      // setMessages([...messages, newMessage]);
    });
    return () => socket?.off('newMessage');
  }, [setMessages, messages, socket]);
};

export default useListenMessages;
