import React from 'react';
import Conversation from './Conversation';
import useGetConversations from '../Hooks/useGetConversations';
import { useDispatch } from 'react-redux';
import { setSelectedConversation } from '../store/ConversationSlice';

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const dispatch = useDispatch();
  const handleSelectedUser = (user) => {
    dispatch(setSelectedConversation(user));
  };

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
          selectedUser={handleSelectedUser}
        />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  );
};

export default Conversations;
