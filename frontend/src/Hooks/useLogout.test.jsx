import { renderHook, act, waitFor } from '@testing-library/react';
import axios from 'axios';

import { useAuthContext } from '../context/AuthContext';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useLogout from './useLogout';

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

describe('useLogout Hook', () => {
  let setAuthUserMock;

  beforeEach(() => {
    setAuthUserMock = vi.fn();
    useAuthContext.mockReturnValue({
      setAuthUser: setAuthUserMock,
    });
    vi.clearAllMocks();
    vi.spyOn(window.localStorage.__proto__, 'removeItem');
  });

  it.skip('should set loading to true initially and false after logout completes successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    const { result } = renderHook(() => useLogout());

    act(() => {
      result.current.logout();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(setAuthUserMock).toHaveBeenCalledWith(null);
    expect(localStorage.removeItem).toHaveBeenCalledWith('authUser');
    expect(axios.post).toHaveBeenCalledWith(
      '/api/auth/logout',
      {},
      { headers: { 'Content-Type': 'application/json' } },
    );
  });

  it.skip('should call setAuthUser with null on successful logout', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.logout();
    });

    expect(setAuthUserMock).toHaveBeenCalledWith(null);
  });

  it.skip('should remove authUser from localStorage on successful logout', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.logout();
    });

    expect(localStorage.removeItem).toHaveBeenCalledWith('authUser');
  });

  it.skip('should update loading state correctly on logout error', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.loading).toBe(false);
    expect(setAuthUserMock).not.toHaveBeenCalledWith(null);
  });
});
