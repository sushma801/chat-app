import { renderHook, act, waitFor } from '@testing-library/react';
import axios from 'axios';

import { useAuthContext } from '../context/AuthContext';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useLogout from './useLogout';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../store/UserSlice';

// Mock dependencies

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../store/UserSlice', () => ({
  setAuthUser: vi.fn(),
}));

// Mock useNavigate correctly
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate, // Return the mock directly
  };
});

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

describe('useLogout Hook', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);
    vi.clearAllMocks();
    vi.spyOn(window.localStorage.__proto__, 'removeItem');
  });

  it('should set loading to true initially and false after logout completes successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    const { result } = renderHook(() => useLogout());

    act(() => {
      result.current.logout();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(localStorage.removeItem).toHaveBeenCalledWith('authUser');
    expect(axios.post).toHaveBeenCalledWith(
      '/api/auth/logout',
      {},
      { headers: { 'Content-Type': 'application/json' } },
    );
  });

  it('should call setAuthUser with null on successful logout', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.logout();
    });

    // expect(setAuthUserMock).toHaveBeenCalledWith(null);
    expect(mockDispatch).toHaveBeenCalledWith(setAuthUser(null));
    expect(localStorage.removeItem).toHaveBeenCalledWith('authUser');
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should update loading state correctly on logout error', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.loading).toBe(false);
    expect(mockDispatch).not.toHaveBeenCalledWith(null);
    // expect(setAuthUserMock).not.toHaveBeenCalledWith(null);
  });
});
