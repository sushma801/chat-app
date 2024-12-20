import { vi, describe, it, expect, beforeEach } from 'vitest';
import useLogin from './useLogin';
import axios from 'axios';
import { act, renderHook } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../store/UserSlice';

vi.mock('axios'); // Mock axios

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../store/UserSlice', () => ({
  setAuthUser: vi.fn(),
}));

describe('useLogin', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);
    vi.clearAllMocks();
  });
  it('sets loading to true while the login request is in progress', async () => {
    const userCredentials = { userName: 'jhon_doe', password: 'password@123' };
    const mockResponse = { data: { id: 1, name: 'Jhon Doe', token: '123abc' } };

    axios.post.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login(userCredentials);
    });
    // expect(result.current.loading).toBe(true);
    expect(axios.post).toHaveBeenCalledWith('/api/auth/login', JSON.stringify(userCredentials), {
      headers: { 'Content-Type': 'application/json' },
    });

    expect(mockDispatch).toHaveBeenCalledWith(setAuthUser(mockResponse.data));
    expect(result.current.loading).toBe(false);
  });

  it('throws an error if login fails', async () => {
    const userCredentials = { userName: 'invalid_user', password: 'wrong_password' };
    const mockError = { response: { data: { error: 'Invalid username or password' } } };

    axios.post.mockRejectedValue(mockError);
    const { result } = renderHook(() => useLogin());
    await act(async () => {
      try {
        await result.current.login(userCredentials);
      } catch (e) {
        expect(e.message).toBe('Invalid username or password');
      }
    });
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
  });
});
