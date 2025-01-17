import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser && authUser._id) { // Ensure _id is available
      const newSocket = io("http://localhost:5000", {
        query: { userId: authUser._id }, // Ensure userId is passed
      });
      
      setSocket(newSocket);
  
      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
  
      return () => {
        newSocket.off("getOnlineUsers");
        newSocket.close();
      };
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
