import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../store/UserSlice';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
      const headers = { 'Content-Type': 'application/json' };
      const res = await axios.post('/api/auth/logout', {}, { headers });
      if (res.data.error) throw new Error(res.data.error);
      localStorage.removeItem('authUser');
      // setAuthUser(null);
      dispatch(setAuthUser(null));
      navigate('/login');
    } catch (e) {
      console.log('error');
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
