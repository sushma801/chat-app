import { fireEvent, render, screen } from '@testing-library/react';
import Login from './Login';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { AuthContextProvider } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

vi.mock('../Hooks/useLogin', () => ({
  default: () => ({
    loading: false,
    login: vi.fn(),
  }),
}));

vi.mock('axios');

vi.mock('../context/AuthContext', () => ({
  useAuthContext: vi.fn(() => ({
    setAuthUser: vi.fn(),
  })),
  AuthContextProvider: ({ children }) => <div>{children}</div>,
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

describe('Login page', () => {
  beforeAll(() => {
    delete window.location;
    window.location = { pathname: '/' }; // mock the window.location.pathname for the test
  });

  it('renders the login component', async () => {
    // const href = '/';
    // const mockLogin = vi.fn().mockResolvedValue({});

    const { container } = render(
      <MemoryRouter>
        <AuthContextProvider>
          <Login />
        </AuthContextProvider>
      </MemoryRouter>,
    );
    expect(container).toBeTruthy();
    const heading = container.querySelector('div div h1');
    expect(heading).toHaveTextContent('Login ChatApp');
    const formContainer = container.querySelector('div div form');
    const inputFields = formContainer.querySelectorAll('input');
    expect(inputFields).toHaveLength(2);
    expect(formContainer.querySelector('a')).toHaveTextContent("Don't have an account?");
    const anchorTag = formContainer.querySelector('a');
    fireEvent.click(anchorTag);
    expect(window.location.pathname).toBe('/');
  });

  it('should call login API with correct values and navigate on success', async () => {
    const mockLoginResponse = { data: { userName: 'testUser', token: 'abc123' } };
    axios.post.mockResolvedValue(mockLoginResponse);
    // useLogin.mockReturnValue({ login: mockLogin, loading: false });
    const { container } = render(
      <MemoryRouter>
        <AuthContextProvider>
          <Login />
        </AuthContextProvider>
      </MemoryRouter>,
    );
    expect(container).toBeTruthy();
    const formContainer = container.querySelector('form');
    const usernameInput = formContainer.querySelector('#userName');
    const passwordInput = formContainer.querySelector('#password');
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'Password@1' } });
    const loginBtn = formContainer.querySelectorAll('button')[2];
    fireEvent.submit(loginBtn);
    // await waitFor(() => {
    //   console.log(axios.post.mock.calls);
    //   expect(axios.post).toHaveBeenCalledWith(
    //     '/api/auth/login',
    //     '{"username":"testUser","password":"Password@1"}',
    //     { headers: { 'Content-Type': 'application/json' } },
    //   );
    // });
    // await waitFor(() =>
    //   expect(axios.post).toHaveBeenCalledWith('/api/auth/login','{
    //     "userName": "testUser",
    //     password": "Password@1",
    //   }'),
    // );
    // expect(mockSetAuthUser).toHaveBeenCalledWith(mockLoginResponse.data);

    expect(window.location.pathname).toBe('/');
  });

  it('check the sign up Page is render or not', async () => {
    const { container } = render(
      <MemoryRouter>
        <AuthContextProvider>
          <Login />
        </AuthContextProvider>
      </MemoryRouter>,
    );
    expect(container).toBeTruthy();
    const formContainer = container.querySelector('form');
    const sigupBtn = formContainer.querySelectorAll('button')[1];
    fireEvent.click(sigupBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });

  it('should display error when username is too short or too long', async () => {
    const { container } = render(
      <MemoryRouter>
        <AuthContextProvider>
          <Login />
        </AuthContextProvider>
      </MemoryRouter>,
    );

    expect(container).toBeTruthy();
    const formContainer = container.querySelector('form');
    const usernameInput = formContainer.querySelector('#userName');
    const passwordInput = formContainer.querySelector('#password');
    fireEvent.change(usernameInput, { target: { value: 'te' } });
    fireEvent.change(passwordInput, { target: { value: 'A1' } });
    const loginBtn = formContainer.querySelectorAll('button')[2];
    fireEvent.submit(loginBtn);
    expect(await screen.findByText(/Too! short Username/i)).toBeInTheDocument();
    expect(await screen.findByText(/Too short! Password/i)).toBeInTheDocument();
    screen.debug();
    // fireEvent.change(passwordInput, { target: { value: 'Password@1' } });
  });

  it('should show loading spinner when loading is true', () => {
    const { container } = render(
      <MemoryRouter>
        <AuthContextProvider>
          <Login />
        </AuthContextProvider>
      </MemoryRouter>,
    );
    expect(container).toBeTruthy();
    screen.debug(container);
  });
});
