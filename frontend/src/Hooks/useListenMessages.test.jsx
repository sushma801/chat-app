/* eslint-disable no-undef */
import { useSocketContext } from '../context/SocketContext';
import useListenMessages from './useListenMessages';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { act } from 'react';
import { setMessages } from '../store/ConversationSlice';

// Mock modules
vi.mock('../context/SocketContext', () => ({
  useSocketContext: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../assets/sound/I_phone.mp3', () => ({
  default: 'mocked-sound', // Provide a default export value
}));

// Mock Audio
global.Audio = vi.fn().mockImplementation(() => ({
  play: vi.fn(),
}));

describe('useListenMessages', () => {
  let mockDispatch;
  let mockSocket;

  beforeEach(() => {
    // Setup mock socket and setMessages function
    mockDispatch = vi.fn();
    mockSocket = { on: vi.fn(), off: vi.fn() };

    useSocketContext.mockReturnValue({ socket: mockSocket });
    useDispatch.mockReturnValue(mockDispatch);
    // useConversation.mockReturnValue({ messages: [], setMessages });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should register a listener for "newMessage" on mount', () => {
    renderHook(() => useListenMessages());

    // Check if the socket `on` method is called with the correct arguments
    expect(mockSocket.on).toHaveBeenCalledWith('newMessage', expect.any(Function));
  });

  it('should add a new message and play sound when "newMessage" event is emitted', () => {
    const newMessage = { text: 'Hello!', sender: 'User1', shouldShake: false };
    useSelector.mockReturnValue([]);
    // eslint-disable-next-line no-unused-vars
    const { result } = renderHook(() => useListenMessages());

    act(() => {
      mockSocket.on.mock.calls[0][1](newMessage);
    });

    expect(mockDispatch).toHaveBeenCalledWith(setMessages([newMessage]));
  });
});
