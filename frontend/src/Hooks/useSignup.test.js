import { renderHook, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useSignup from './useSignup';

// Mock dependencies
vi.mock('../context/AuthContext', () => ({
  useAuthContext: vi.fn(),
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

describe('useSignup Hook', async () => {
  let setAuthUserMock;

  beforeEach(() => {
    setAuthUserMock = vi.fn();
    useAuthContext.mockReturnValue({
      setAuthUser: setAuthUserMock,
    });
    vi.clearAllMocks();
    vi.spyOn(localStorage, 'setItem');
  });
  it('should set loading to true initially and false after signup successfully', async () => {
    const mockResponse = { data: { id: 1, fullName: 'John Doe' } };
    axios.post.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useSignup());

    act(() => {
      result.current.signup({
        fullName: 'John Doe',
        userName: 'johndoe',
        password: 'password123',
        confirmPassword: 'password123',
        gender: 'male',
      });
    });

    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(setAuthUserMock).toHaveBeenCalledWith(mockResponse.data);
  });

  it('should handle errors correctly and stop loading', async () => {
    const mockError = { response: { data: { error: 'Signup failed' } } };
    axios.post.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useSignup());

    await act(async () => {
      await expect(
        result.current.signup({
          fullName: 'John Doe',
          userName: 'johndoe',
          password: 'password123',
          confirmPassword: 'password123',
          gender: 'male',
        }),
      ).rejects.toThrow('Signup failed');
    });

    expect(result.current.loading).toBe(false);
    expect(setAuthUserMock).not.toHaveBeenCalled();
  });
});
