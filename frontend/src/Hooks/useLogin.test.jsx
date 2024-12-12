import { vi, describe, it, expect } from 'vitest';
import useLogin from './useLogin';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import { act, renderHook } from '@testing-library/react';

vi.mock('axios'); // Mock axios
vi.mock('../context/AuthContext', () => ({
  useAuthContext: vi.fn(),
}));

describe('useLogin', () => {
  it('sets loading to true while the login request is in progress', async () => {
    const setAuthUser = vi.fn();
    useAuthContext.mockReturnValue({ setAuthUser });

    axios.post.mockResolvedValueOnce({ data: { userName: 'user', token: 'abcd' } });

    const { result } = renderHook(() => useLogin());

    expect(result.current.loading).toBe(false);

    act(() => {
      result.current.login({ userName: 'user', password: 'password' });
    });

    expect(result.current.loading).toBe(true); // Check if loading is set to true
  });

  it('throws an error if login fails', async () => {
    const setAuthUser = vi.fn();
    useAuthContext.mockReturnValue({ setAuthUser });

    const userData = { userName: 'user', password: 'wrongPassword' };
    axios.post.mockRejectedValueOnce({
      response: { data: { error: 'Invalid credentials' } },
    });

    const { result } = renderHook(() => useLogin());

    await expect(result.current.login(userData)).rejects.toThrow('Invalid credentials');
  });
});
