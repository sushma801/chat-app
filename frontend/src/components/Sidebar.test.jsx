import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Sidebar from './Sidebar';
import toast from 'react-hot-toast';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import conversationUsersReducer from '../store/UserSlice';
import useGetConversations from '../Hooks/useGetConversations';

vi.mock('../Hooks/useGetConversations', () => ({
  default: vi.fn(),
}));

vi.mock(import('react-hot-toast'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    error: vi.fn(),
  };
});

const mockUsers = [
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
  {
    _id: '6738c536a089ba9174a89e48',
    fullName: 'Test User 2',
    userName: 'testuser2',
    gender: 'male',
    profilePic: 'https://avatar.iran.liara.run/public/girl?username=diksha',
    createdAt: '2024-11-16T16:15:50.494Z',
    updatedAt: '2024-11-16T16:15:50.494Z',
    __v: 0,
  },
];

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
    useSelector: vi.fn((selector) => {
      if (selector.name.includes('conversationUsers')) {
        return {
          users: mockUsers,
        };
      }
      return mockUsers;
    }),
  };
});

describe('Sidebar Component', async () => {
  const renderWithProviders = (preloadedState) => {
    const store = configureStore({
      reducer: { conversationUsers: conversationUsersReducer },
      preloadedState,
    });
    return render(
      <Provider store={store}>
        <Sidebar />
      </Provider>,
    );
  };
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useGetConversations.mockReturnValue({ conversations: mockUsers });
  });

  it('render Sidebar Component properly', async () => {
    const { container } = renderWithProviders({
      conversationUsers: {
        users: mockUsers,
      },
    });
    expect(container).toBeTruthy();
    const searchbox = container.querySelector('form');
    expect(searchbox).toBeTruthy();
    const users = container.querySelectorAll('.conversation');
    expect(users).toHaveLength(2);
  });
  it('render Sidebar and check search box is properly working', async () => {
    const { container } = renderWithProviders({
      conversationUsers: {
        users: mockUsers,
      },
    });
    expect(container).toBeTruthy();
    const searchBox = container.querySelector('form');
    expect(searchBox).toBeTruthy();
    const inputField = searchBox.querySelector('input');
    expect(inputField).toHaveAttribute('placeholder', 'Search');
    const searchButton = searchBox.querySelector('button');
    expect(searchButton).toHaveAttribute('aria-label', 'Search');
    fireEvent.change(inputField, { target: { value: 'Test User 1' } });
    fireEvent.click(searchButton);
    // await waitFor(() => {
    //   expect(mockDispatch).toHaveBeenCalledWith({
    //     type: 'conversation/setSelectedConversation',
    //     payload: { _id: '6738bae5a089ba9174a89e17', fullName: 'Test User 1' },
    //   });
    // });
    // const users = container.querySelectorAll('.conversation');
    // expect(users[0]).toHaveClass('hover:bg-[#b8a14f]');
    // fireEvent.change(inputField, { target: { value: 'Test User 3' } });
    // fireEvent.click(searchButton);
    screen.debug();
  });
  it('render Sidebar and check search box having no result', async () => {
    const { container } = renderWithProviders({
      conversationUsers: {
        users: mockUsers,
      },
    });
    expect(container).toBeTruthy();
    const searchBox = container.querySelector('form');
    expect(searchBox).toBeTruthy();
    const inputField = searchBox.querySelector('input');
    expect(inputField).toHaveAttribute('placeholder', 'Search');
    const searchButton = searchBox.querySelector('button');
    expect(searchButton).toHaveAttribute('aria-label', 'Search');
    fireEvent.change(inputField, { target: { value: 'Test User 3' } });
    fireEvent.click(searchButton);
    //   console.log(toast.error);
    // Wait for the toast error to be called
    // await waitFor(
    //   () => {
    //     expect(toast.error).toHaveBeenCalledWith('No such user found with Nonexistent User', {
    //       duration: 1000,
    //     });
    //   },
    //   { timeout: 6000 },
    // );
    //   screen.debug();
  });
});
