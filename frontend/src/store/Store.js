import { configureStore } from '@reduxjs/toolkit';
import ConversationReducer from './ConversationSlice';
import UsersReducer from './UserSlice';

export default configureStore({
  reducer: {
    conversation: ConversationReducer,
    conversationUsers: UsersReducer,
  },
});
