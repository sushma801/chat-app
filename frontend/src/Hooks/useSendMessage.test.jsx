import { renderHook } from '@testing-library/react';
import { beforeEach, describe, it, vi } from 'vitest';
import useSendMessage from './useSendMessage';
import { useSelector } from 'react-redux';
import { act } from 'react';
import axios from 'axios';

const mockLoggedInUser = {
  _id: '6738bae5a089ba9174a89e17',
  fullName: 'Test User 1',
  userName: 'testuser1',
  gender: 'male',
  profilePic: 'https://avatar.iran.liara.run/public/girl?username=diksha',
  createdAt: '2024-11-16T16:15:50.494Z',
  updatedAt: '2024-11-16T16:15:50.494Z',
  __v: 0,
};

const mockMessages = [
  {
    _id: '6738bc9aa089ba9174a89e3b',
    senderId: '6738bae5a089ba9174a89e17',
    receiverId: '6738c536a089ba9174a89e48',
    message: 'hello',
    createdAt: '2024-11-16T15:39:06.989Z',
    updatedAt: '2024-11-16T15:39:06.989Z',
    __v: 0,
  },
  {
    _id: '676596133a7d5683a90920e7',
    senderId: '6738c536a089ba9174a89e48',
    receiverId: '6738bae5a089ba9174a89e17',
    message: 'hey',
    createdAt: '2024-12-20T16:06:44.034Z',
    updatedAt: '2024-12-20T16:06:44.034Z',
    __v: 0,
  },
  {
    _id: '676598383a7d5683a909211e',
    senderId: '6738bae5a089ba9174a89e17',
    receiverId: '6738c536a089ba9174a89e48',
    message: 'how are you?',
    createdAt: '2024-12-20T16:15:52.041Z',
    updatedAt: '2024-12-20T16:15:52.041Z',
    __v: 0,
  },
];

const mockSelectedConversation = {
  _id: '6738c536a089ba9174a89e48',
  fullName: 'Test User 2',
  userName: 'testuser2',
  gender: 'male',
  profilePic: 'https://avatar.iran.liara.run/public/girl?username=diksha',
  createdAt: '2024-11-16T16:15:50.494Z',
  updatedAt: '2024-11-16T16:15:50.494Z',
  __v: 0,
};

vi.mock('axios', async (importOriginal) => {
  const actual = await importOriginal('axios');
  return {
    ...actual,
    default: {
      ...actual,
      post: vi.fn(),
      get: vi.fn(),
    },
  };
});

const mockDispatch = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: vi.fn(),
  };
});

describe('useSendMessage Hook', async () => {
  beforeEach(() => vi.clearAllMocks());
  it('render the hook properly', async () => {
    useSelector.mockImplementation((callBack) =>
      callBack({
        conversation: { messages: mockMessages, selectedConversation: mockSelectedConversation },
        conversationUsers: { loggedInUser: mockLoggedInUser },
      }),
    );
    axios.post.mockResolvedValueOnce({ data: [] });

    const { result } = renderHook(() => useSendMessage());
    await act(() => {
      result.current.sendMessage('Hello!! World');
    });
  });

  it('render the hook and send an error', async () => {
    useSelector.mockImplementation((callBack) =>
      callBack({
        conversation: { messages: mockMessages, selectedConversation: mockSelectedConversation },
      }),
    );
    axios.post.mockResolvedValueOnce({ message: 'Error while sending the message' });
    const { result } = renderHook(() => useSendMessage());
    await act(() => {
      result.current.sendMessage();
    });
  });
});
