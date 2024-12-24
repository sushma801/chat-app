import { createContext, useContext, useEffect, useState } from 'react';
// import { useAuthContext } from './AuthContext';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

export const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // const { authUser } = useAuthContext();
  const authUser = useSelector((state) => state.conversationUsers.loggedInUser);
  useEffect(() => {
    if (authUser) {
      const socket = io('https://chat-app-0tol.onrender.com', {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);
      socket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>
  );
};
