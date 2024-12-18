import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({ fullName, userName, password, confirmPassword, gender }) => {
    console.log({ fullName, userName, password, confirmPassword, gender }, ' from sign up hook');
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
      // const res = await fetch("/api/auth/signup", {
      //   method: "POST",
      //   headers,
      //   body: JSON.stringify(userData),
      // });

      if (res.data.error) {
        throw new Error(res.data.error);
      }
      // store the value to the local storage
      localStorage.setItem('authUser', JSON.stringify(res.data));
      setAuthUser(res.data);
      return res;
    } catch (e) {
      console.log('error');
      throw new Error(e.response?.data?.error || `Something is Wrong`);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;
