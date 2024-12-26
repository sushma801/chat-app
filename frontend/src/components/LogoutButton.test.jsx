import { describe, expect, it, vi } from 'vitest';
import LogoutButton from './LogoutButton';
import { fireEvent, render } from '@testing-library/react';

import { Provider } from 'react-redux';
import Store from '../store/Store';

// Mock dependencies

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Logout Button', async () => {
  it('Render logout button', async () => {
    const { container } = await render(
      <Provider store={Store}>
        <LogoutButton />
      </Provider>,
    );
    expect(container).toBeTruthy();
    const logoutBtn = container.querySelector('button');
    expect(logoutBtn).toHaveAttribute('aria-label', 'Logout Button');
    fireEvent.click(logoutBtn);
  });
});
