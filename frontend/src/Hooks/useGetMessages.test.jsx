import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useConversation } from '../zustant/useConversation';
import axios from 'axios';
import { renderHook, waitFor } from '@testing-library/react';
import useGetMessages from './useGetMessages';

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

describe('useGetMessages Hook', () => {
  let setMessagesMock;
  const mockSelectedConversation = { _id: 'conversation-id-123' };

  beforeEach(() => {
    setMessagesMock = vi.fn();
    useConversation.mockReturnValue({
      messages: [],
      setMessages: setMessagesMock,
      selectedConversation: mockSelectedConversation,
    });
    vi.clearAllMocks();
  });

  it('should set loading to true initially and false after fetching messages successfully', async () => {
    const mockResponse = { data: [{ id: 1, message: 'Hello' }] };
    axios.post.mockResolvedValueOnce(mockResponse);
    const { result } = renderHook(() => useGetMessages());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(setMessagesMock).toHaveBeenCalledWith(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      '/api/messages/conversation-id-123',
      {},
      { headers: { 'Content-Type': 'application/json' } },
    );
  });
});
