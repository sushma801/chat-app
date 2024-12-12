/* eslint-disable no-undef */
import { useSocketContext } from '../context/SocketContext';
import { useConversation } from '../zustant/useConversation';
import useListenMessages from './useListenMessages';
import notificationSound from '../assets/sound/I_phone.mp3';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

// Mock modules
vi.mock('../context/SocketContext', () => ({
  useSocketContext: vi.fn(),
}));

vi.mock('../zustant/useConversation', () => ({
  useConversation: vi.fn(),
}));

vi.mock('../assets/sound/I_phone.mp3', () => ({
  default: 'mocked-sound', // Provide a default export value
}));

// Mock Audio
global.Audio = vi.fn().mockImplementation(() => ({
  play: vi.fn(),
}));

describe('useListenMessages', () => {
  let setMessages;
  let socket;

  beforeEach(() => {
    // Setup mock socket and setMessages function
    setMessages = vi.fn();
    socket = { on: vi.fn(), off: vi.fn() };

    useSocketContext.mockReturnValue({ socket });
    useConversation.mockReturnValue({ messages: [], setMessages });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should register a listener for "newMessage" on mount', () => {
    renderHook(() => useListenMessages());

    // Check if the socket `on` method is called with the correct arguments
    expect(socket.on).toHaveBeenCalledWith('newMessage', expect.any(Function));
  });

  it('should add a new message and play sound when "newMessage" event is emitted', () => {
    const { result } = renderHook(() => useListenMessages());
    const newMessage = { text: 'Hello!', shouldShake: false };

    // Emit the 'newMessage' event
    const callback = socket.on.mock.calls[0][1]; // The callback function
    callback(newMessage);

    // Check if setMessages was called with the new message
    expect(setMessages).toHaveBeenCalledWith([newMessage]);

    // Check if the 'shouldShake' property is set on the new message
    expect(newMessage.shouldShake).toBe(true);

    // Check if the sound is played
    // eslint-disable-next-line no-undef
    expect(global.Audio).toHaveBeenCalledWith(notificationSound);
  });

  it('should clean up socket listener on unmount', () => {
    const { unmount } = renderHook(() => useListenMessages());

    unmount();

    // Ensure the socket `off` method is called to remove the listener
    expect(socket.off).toHaveBeenCalledWith('newMessage');
  });

  it('should add new messages to the existing message list', () => {
    const initialMessages = [{ text: 'Old message' }];
    useConversation.mockReturnValue({ messages: initialMessages, setMessages });

    const { result } = renderHook(() => useListenMessages());
    const newMessage = { text: 'New message' };

    // Emit the 'newMessage' event
    const callback = socket.on.mock.calls[0][1];
    callback(newMessage);

    // Check if setMessages is called with the correct new array
    expect(setMessages).toHaveBeenCalledWith([...initialMessages, newMessage]);
  });
});
