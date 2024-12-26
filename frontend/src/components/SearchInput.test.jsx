import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchInput from './SearchInput';
import { useSelector } from 'react-redux';

const mockUsers = [
  {
    _id: '6738bae5a089ba9174a89e17',
    fullName: 'test user 1',
    userName: 'testUser1',
    gender: 'female',
    profilePic: 'https://avatar.iran.liara.run/public/girl?username=Suman247',
    createdAt: '2024-11-16T15:31:49.326Z',
    updatedAt: '2024-11-16T15:31:49.326Z',
    __v: 0,
  },
  {
    _id: '6738c536a089ba9174a89e48',
    fullName: 'test user 2',
    userName: 'testuUser2',
    gender: 'female',
    profilePic: 'https://avatar.iran.liara.run/public/girl?username=diksha',
    createdAt: '2024-11-16T16:15:50.494Z',
    updatedAt: '2024-11-16T16:15:50.494Z',
    __v: 0,
  },
  {
    _id: '6765b5fc3a7d5683a90922c8',
    fullName: 'test user 3',
    userName: 'testUser3',
    gender: 'female',
    profilePic: 'https://avatar.iran.liara.run/public/girl?username=testUser1',
    createdAt: '2024-12-20T18:22:52.425Z',
    updatedAt: '2024-12-20T18:22:52.425Z',
    __v: 0,
  },
];

// vi.mock('axios', () => ({
//   default: {
//     get: vi.fn(),
//     post: vi.fn().mockResolvedValue({ data: { success: true } }),
//   },
// }));

vi.mock('../Hooks/useFetConversations');
const mockDispatch = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: vi.fn(),
  };
});

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

describe('Search Input', async () => {
  it('Render search Input box', async () => {
    let wrapper;
    useSelector.mockImplementation((callBack) =>
      callBack({
        conversationUsers: { users: mockUsers },
      }),
    );

    await act(() => {
      const { container } = render(<SearchInput />);
      wrapper = container;
    });
    expect(wrapper).toBeTruthy();
    const searchForm = wrapper.querySelector('form');
    expect(searchForm).toBeTruthy();
    const inputBox = searchForm.querySelector('input');
    expect(inputBox).toBeTruthy();
    const inputBtn = searchForm.querySelector('button');
    expect(inputBtn).toBeTruthy();
    await act(() => {
      fireEvent.change(inputBox, { target: { value: 'test user 1' } });
      fireEvent.submit(inputBtn);
    });
  });

  it('render the message when the user is not present', async () => {
    useSelector.mockImplementation((callBack) =>
      callBack({
        conversationUsers: { users: mockUsers },
      }),
    );

    // await act(() => {
    const { container } = render(<SearchInput />);
    // wrapper = container;
    // });

    expect(container).toBeTruthy();
    const searchForm = container.querySelector('form');
    expect(searchForm).toBeTruthy();
    const inputBox = searchForm.querySelector('input');
    expect(inputBox).toBeTruthy();
    const inputBtn = searchForm.querySelector('button');
    expect(inputBtn).toBeTruthy();
    await act(() => {
      fireEvent.change(inputBox, { target: { value: 'test user 4' } });
      fireEvent.submit(inputBtn);
    });
    screen.debug();
  });
});
