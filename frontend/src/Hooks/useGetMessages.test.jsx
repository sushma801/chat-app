import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useConversation } from '../zustant/useConversation';
import axios from 'axios';
import { renderHook, waitFor } from '@testing-library/react';
import useGetMessages from './useGetMessages';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages, setSelectedConversation } from '../store/ConversationSlice';
import { act } from 'react';

vi.mock('axios', async (importOriginal) => {
  const actual = await importOriginal('axios');
  return {
    ...actual,
    default: {
      ...actual,
      post: vi.fn(),
    },
  };
});

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../store/ConversationSlice', () => ({
  setMessages: vi.fn(),
}));

describe('useGetMessages Hook', () => {
  let mockDispatch;
  // let setMessagesMock;
  const mockSelectedConversation = { _id: 'conversation-id-123' };

  beforeEach(() => {
    mockDispatch = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);
    vi.clearAllMocks();
  });

  it.only('should fetch messages successfully and store them in the Redux store', async () => {
    const mockMessages = [
      { id: 1, text: 'hello' },
      { id: 2, text: 'world' },
    ];
    const mockResponse = { data: mockMessages };
    useSelector.mockImplementation((callback) =>
      callback({ conversation: { selectedConversation: mockSelectedConversation, messages: [] } }),
    );
    axios.post.mockResolvedValueOnce(mockResponse);
    const { result } = renderHook(() => useGetMessages());
    console.log(result);
    await act(async () => {
      await result.current.loading;
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/api/messages/conversation-id-123',
      {},
      { headers: { 'Content-Type': 'application/json' } },
    );

    expect(result.current.loading).toBe(false);
    expect(mockDispatch).toHaveBeenCalledWith(setMessages(mockMessages));
  });

  // it.only('should set loading to true initially and false after fetching messages successfully', async () => {
  //   const mockResponse = { data: [{ id: 1, message: 'Hello' }] };
  //   axios.post.mockResolvedValueOnce(mockResponse);
  //   const { result } = renderHook(() => useGetMessages());

  //   expect(axios.post).toHaveBeenCalledWith(
  //     '/api/messages/conversation-id-123',
  //     {},
  //     { headers: { 'Content-Type': 'application/json' } },
  //   );

  //   expect(result.current.loading).toBe(false);

  //   // await waitFor(() => {
  //   //   expect(result.current.loading).toBe(false);
  //   // });

  //   // expect(setMessagesMock).toHaveBeenCalledWith(mockResponse.data);
  // });
});
