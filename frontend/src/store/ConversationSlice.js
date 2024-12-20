import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  selectedConversation: null,
};

const ConversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setSelectedConversation, setMessages } = ConversationSlice.actions;
export default ConversationSlice.reducer;
