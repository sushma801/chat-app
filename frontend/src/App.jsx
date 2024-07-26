import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import { lazy, Suspense, useState } from 'react';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Home = lazy(() => import('./pages/Home'));

function App() {
  const { authUser } = useAuthContext();
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <Suspense fallback={<span className="loading" />}>
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
              <Suspense fallback={<span className="loading" />}>
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
              <Suspense fallback={<span className="loading" />}>
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
