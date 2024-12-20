import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../store/UserSlice';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  // const { setAuthUser } = useAuthContext();
  const dispatch = useDispatch();
  const signup = async ({ fullName, userName, password, confirmPassword, gender }) => {
    setLoading(true);
    try {
      const headers = { 'Content-Type': 'application/json' };
      const userData = {
        fullName,
        userName,
        password,
        confirmPassword,
        gender,
      };
      const res = await axios.post('/api/auth/signup', JSON.stringify(userData), { headers });
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      // store the value to the local storage
      localStorage.setItem('authUser', JSON.stringify(res.data));
      // setAuthUser(res.data);
      dispatch(setAuthUser(res.data));

      return res.status;
    } catch (e) {
      throw new Error(e.response?.data?.error || `Something is Wrong`);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;
