import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Ensure you're using BrowserRouter if routing is involved
import { AuthContextProvider } from './context/AuthContext';
import { SocketContextProvider } from './context/SocketContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider> 
      <SocketContextProvider>
      <App />
      </SocketContextProvider>
           
           </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
  
);
