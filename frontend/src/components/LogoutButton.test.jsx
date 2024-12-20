import { describe, expect, it, vi } from 'vitest';
import LogoutButton from './LogoutButton';
import { fireEvent, render, screen } from '@testing-library/react';
import { AuthContextProvider } from '../context/AuthContext';

// Mock dependencies
vi.mock('../context/AuthContext', () => ({
  useAuthContext: vi.fn(() => ({
    setAuthUser: vi.fn(),
  })),
  AuthContextProvider: ({ children }) => <div>{children}</div>,
}));

describe('Logout Button', async () => {
  it('Render logout button', async () => {
    const { container } = await render(
      <AuthContextProvider>
        <LogoutButton />
      </AuthContextProvider>,
    );
    expect(container).toBeTruthy();
    const logoutBtn = container.querySelector('button');
    expect(logoutBtn).toHaveAttribute('aria-label', 'Logout Button');
    screen.debug(logoutBtn);
    fireEvent.click(logoutBtn);
  });
});
