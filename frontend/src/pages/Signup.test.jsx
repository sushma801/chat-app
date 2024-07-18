import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Signup from './Signup';
import { AuthContextProvider } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('Signup Page', () => {
  it('Render signup page', () => {
    const href = '/';
    const { container } = render(
      <MemoryRouter>
        <AuthContextProvider>
          <Signup />
        </AuthContextProvider>
      </MemoryRouter>,
    );

    expect(container).toBeTruthy();
    expect(container.querySelector('h1')).toHaveTextContent('SignUp ChatApp');
    const formElemets = container.querySelector('form').querySelectorAll('input');
    expect(formElemets).toHaveLength(7);
    expect(container.querySelector('form a')).toHaveTextContent('Already have an account?');
    const signUpBtn = container.querySelector('form button');
    expect(signUpBtn).toHaveTextContent('Sign Up');
    fireEvent.click(signUpBtn);
    expect(window.location.pathname).toBe(href);
  });
});
