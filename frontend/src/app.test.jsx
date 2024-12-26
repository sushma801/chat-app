import { configureStore } from '@reduxjs/toolkit';
import conversationUsersReducer from './store/UserSlice';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';

describe('App Component', () => {
  const renderWithProviders = (preloadedState) => {
    const store = configureStore({
      reducer: { conversationUsers: conversationUsersReducer },
      preloadedState,
    });
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );
  };

  it('renders the login page when the user is not logged in', () => {
    const { container } = renderWithProviders({ conversationUsers: { loggedInUser: null } });
    expect(container).toBeTruthy();
    const loading_spinner = container.querySelector('.loading');
    expect(loading_spinner).toBeTruthy();
  });
  it('navigate to home when the user is logged in', async () => {
    const { container } = renderWithProviders({ conversationUsers: { loggedInUser: true } });
    expect(container).toBeTruthy();
    expect(window.location.pathname).toBe('/');
  });
});
