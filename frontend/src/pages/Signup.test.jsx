import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Signup from './Signup';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from '../store/Store';

describe('Signup Page', () => {
  it('Render signup page', () => {
    const href = '/';
    const { container } = render(
      <MemoryRouter>
        <Provider store={Store}>
          <Signup />
        </Provider>
      </MemoryRouter>,
    );

    expect(container).toBeTruthy();
    expect(container.querySelector('h1')).toHaveTextContent('SignUp ChatApp');
    const formElemets = container.querySelector('form').querySelectorAll('input');
    expect(formElemets).toHaveLength(7);
    expect(container.querySelector('form a')).toHaveTextContent('Already have an account?');
    screen.debug();
    const signUpBtn = container.querySelector('form').querySelectorAll('button')[3];
    expect(signUpBtn).toHaveTextContent('Sign Up');
    fireEvent.click(signUpBtn);
    expect(window.location.pathname).toBe(href);
  });
});
