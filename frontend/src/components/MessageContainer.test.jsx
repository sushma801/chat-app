import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import MessageContainer from './MessageContainer';
import { useSelector } from 'react-redux';
import useGetMessages from '../Hooks/useGetMessages';
import useSendMessage from '../Hooks/useSendMessage';

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

vi.mock('../Hooks/useGetMessages');
vi.mock(import('../Hooks/useSendMessage'), async (importoriginal) => {
  const actual = await importoriginal();
  return {
    ...actual,
  };
});

vi.mock('../context/SocketContext', () => ({
  useSocketContext: vi.fn(() => ({
    onlineUsers: [
      {
        _id: '6738bae5a089ba9174a89e17',
        fullName: 'Test User 1',
        userName: 'testuser1',
        gender: 'female',
        profilePic: 'https://avatar.iran.liara.run/public/girl?username=Suman247',
        createdAt: '2024-11-16T15:31:49.326Z',
        updatedAt: '2024-11-16T15:31:49.326Z',
        __v: 0,
      },
      { _id: 'user2', name: 'User Two' },
    ],
  })),
}));

vi.mock(import('react-redux'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
    // useSelector: vi.fn((selector) => {
    //   if (selector.name.includes('conversationUsers')) {
    //     return {
    //       loggedInUser: mockLogedInUser,
    //     };
    //   }
    //   return mockLogedInUser;
    // }),
  };
});

describe('Message Container', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('render properly Message Container', () => {
    // useSelector.mockImplementation((callback)=>callback({
    //     conversationUsers: { loggedInUser: { fullName: 'John Doe' } },
    //     conversation: { selectedConversation: null },
    //   })})
    useSelector.mockImplementation((callBack) =>
      callBack({
        conversationUsers: { loggedInUser: mockLoggedInUser },
        conversation: { selectedConversation: null },
      }),
    );
    const { container } = render(<MessageContainer />);
    expect(container).toBeTruthy();
    const screenContent = container.querySelectorAll('p');
    expect(screenContent[0]).toHaveTextContent('Welcome Test User 1');
  });

  it('render properly message container and start chat with a user', () => {
    useSelector.mockImplementation((callBack) =>
      callBack({
        conversationUsers: { loggedInUser: mockLoggedInUser },
        conversation: { messages: mockMessages, selectedConversation: mockSelectedConversation },
      }),
    );
    useGetMessages.mockReturnValue({
      messages: mockMessages,
      loading: false,
    });
    const { container } = render(<MessageContainer />);
    expect(container).toBeTruthy();
    const receiverDetails = container.querySelector('div .receiver');
    expect(receiverDetails).toHaveTextContent('Test User 2');
    const chatContents = container.querySelectorAll('div .chat');
    expect(chatContents).toHaveLength(3);
  });

  it('render  message container and start a new conversation', () => {
    useSelector.mockImplementation((callBack) =>
      callBack({
        conversationUsers: { loggedInUser: mockLoggedInUser },
        conversation: { messages: [], selectedConversation: mockSelectedConversation },
      }),
    );
    useGetMessages.mockReturnValue({
      messages: [],
      loading: false,
    });
    const { container } = render(<MessageContainer />);
    expect(container).toBeTruthy();
    const startNewMessage = container.querySelector('div p');
    expect(startNewMessage).toHaveTextContent('Send a message to start conversation');
  });

  it('render  message container and show the skeleton', () => {
    useSelector.mockImplementation((callBack) =>
      callBack({
        conversationUsers: { loggedInUser: mockLoggedInUser },
        conversation: { messages: mockMessages, selectedConversation: mockSelectedConversation },
      }),
    );
    useGetMessages.mockReturnValue({
      messages: mockMessages,
      loading: true,
    });

    const { container } = render(<MessageContainer />);
    expect(container).toBeTruthy();
    const mockSkeleton = container.querySelectorAll('div .chat-bubble');
    expect(mockSkeleton).toHaveLength(3);
    expect(mockSkeleton[0]).toHaveClass('skeleton');
  });

  it.skip('render message Input component', () => {
    useSelector.mockImplementation((callBack) =>
      callBack({
        conversationUsers: { loggedInUser: mockLoggedInUser },
        conversation: { messages: [], selectedConversation: mockSelectedConversation },
      }),
    );
    useGetMessages.mockReturnValue({
      messages: [],
      loading: false,
    });
    // useSendMessage.mockReturnValue({
    //   sendMessage: vi.fn(),
    // });
    const { container } = render(<MessageContainer />);
    expect(container).toBeTruthy();
    const startNewMessage = container.querySelector('div p');
    expect(startNewMessage).toHaveTextContent('Send a message to start conversation');
    const messageInputComponent = container.querySelector('div form');
    expect(messageInputComponent).toBeTruthy();
    const input = messageInputComponent.querySelector('input');
    expect(input).toHaveAttribute('placeholder', 'Send a message');
    const button = messageInputComponent.querySelector('button');
    expect(button).toBeTruthy();
    fireEvent.change(input, { target: { value: 'Hey! there' } });
    fireEvent.submit(button);
  });
});
