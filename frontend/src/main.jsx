import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SocketContextProvider } from './context/SocketContext.jsx';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './store/Store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SocketContextProvider>
          <App />
          <Toaster />
        </SocketContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
