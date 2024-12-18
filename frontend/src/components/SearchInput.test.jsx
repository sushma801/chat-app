import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchInput from './SearchInput';
import { act } from 'react';
import axios from 'axios';
import { useConversation } from '../zustant/useConversation';

vi.mock('axios');

vi.mock('../zustant/useConversation', () => ({
  useConversation: () => ({
    setSelectedConversation: vi.fn(),
  }),
}));

describe('Search Input Component', () => {
  it('Component Render', async () => {
    // const { setSelectedConversation } = useConversation();
    // const setSelectedConversation = vi.fn();
    // vi.mocked(useConversation).mockReturnValue({ setSelectedConversation });

    const { setSelectedConversation } = vi.mocked(useConversation)();

    let wrapper;
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          fullName: 'John Doe',
          userName: 'johndoe',
          gender: 'male',
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Doe',
          fullName: 'Jane Doe',
          userName: 'johndoe',
          gender: 'female',
        },
      ],
    });
    await act(async () => {
      const { container } = await render(<SearchInput />);
      wrapper = container;
    });
    expect(wrapper).toBeTruthy();
    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'jane' } });

    // Simulate form submission
    fireEvent.submit(screen.getByRole('button'));

    // await waitFor(() => {
    //   expect(setSelectedConversation).toHaveBeenCalledWith({ id: 2, fullName: 'Jane Doe' });
    // });
  });
  it('Component render check', async () => {
    let wrapper;
    await act(async () => {
      const { container } = await render(<SearchInput />);
      wrapper = container;
    });
    expect(wrapper).toBeTruthy();
  });
});
