import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
// import { useAuthContext } from './context/AuthContext';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Home = lazy(() => import('./pages/Home'));

function App() {
  // const { authUser } = useAuthContext();
  // console.log(authUser);
  const isUserLoggedIn = useSelector((state) => state.conversationUsers.loggedInUser);
  const [authUser, setAuthUser] = useState(isUserLoggedIn);
  useEffect(() => {
    const userDetails = localStorage.getItem('authUser');
    if (userDetails) {
      setAuthUser(userDetails);
    } else {
      setAuthUser(isUserLoggedIn);
    }
  }, [isUserLoggedIn]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <Suspense fallback={<span className="loading loading-spinner loading-lg"></span>}>
                <Home />
              </Suspense>
            ) : (
              <Navigate to={'/login'} />
            )
          }
        />
        <Route
          path="/login"
          element={
            authUser ? (
              <Navigate to="/" />
            ) : (
              <Suspense fallback={<span className="loading loading-spinner loading-lg"></span>}>
                <Login />
              </Suspense>
            )
          }
        />
        <Route
          path="/signup"
          element={
            authUser ? (
              <Navigate to="/" />
            ) : (
              <Suspense fallback={<span className="loading loading-spinner loading-lg"></span>}>
                <Signup />
              </Suspense>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
