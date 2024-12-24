import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setUsers } from '../store/UserSlice';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  // const [conversations, setConversations] = useState([]);
  const conversations = useSelector((state) => state.conversationUsers.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const authUser = JSON.parse(localStorage.getItem('authUser'));
        const res = await axios.get('/api/users');
        console.log({ res });
        if (res.data.error) throw new Error(res.data.error);
        // setConversations(res.data);
        dispatch(setUsers(res.data));
        dispatch(setAuthUser(authUser));
      } catch (e) {
        console.log('error while loading the users');
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
