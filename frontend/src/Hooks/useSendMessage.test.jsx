import { renderHook, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import useSendMessage from './useSendMessage';
import { useConversation } from '../zustant/useConversation';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock dependencies
vi.mock('../zustant/useConversation', () => ({
  useConversation: vi.fn(),
}));

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

describe('useSendMessage Hook', () => {
  let setMessagesMock;
  let selectedConversationMock;

  beforeEach(() => {
    setMessagesMock = vi.fn();
    selectedConversationMock = { _id: '12345' };
    useConversation.mockReturnValue({
      messages: [],
      setMessages: setMessagesMock,
      selectedConversation: selectedConversationMock,
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.skip('should set loading to true initially and false after message is sent successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Hello' } });

    const { result } = renderHook(() => useSendMessage());

    act(() => {
      result.current.sendMessage('Hello');
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/api/messages/send/12345',
      JSON.stringify({ message: 'Hello' }),
      { headers: { 'Content-Type': 'application/json' } },
    );
  });

  it.skip('should call setMessages with the new message on successful message send', async () => {
    const newMessage = { message: 'Hello' };
    axios.post.mockResolvedValueOnce({ data: newMessage });

    const { result } = renderHook(() => useSendMessage());

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(setMessagesMock).toHaveBeenCalledWith([newMessage]);
  });

  it.skip('should throw an error if API response contains an error', async () => {
    axios.post.mockResolvedValueOnce({ data: { Error: 'Something went wrong' } });

    const { result } = renderHook(() => useSendMessage());

    await expect(async () => {
      await act(async () => {
        await result.current.sendMessage('Hello');
      });
    }).rejects.toThrow('Something went wrong');
  });

  it.skip('should throw an error if the API request fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useSendMessage());

    await expect(async () => {
      await act(async () => {
        await result.current.sendMessage('Hello');
      });
    }).rejects.toThrow('Network error');
  });

  it.skip('should call the API with the correct URL, headers, and message payload', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Hello' } });

    const { result } = renderHook(() => useSendMessage());

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/api/messages/send/12345',
      JSON.stringify({ message: 'Hello' }),
      { headers: { 'Content-Type': 'application/json' } },
    );
  });
});
