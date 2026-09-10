import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Global Fetch Interceptor to reroute localhost and relative requests to Vercel Backend
const ORIGINAL_FETCH = window.fetch;
const BACKEND_URL = 'https://coop-finance-backend.vercel.app';

window.fetch = async (...args) => {
  let [resource, config] = args;

  if (typeof resource === 'string') {
    // 1. Replace localhost:5000 with production backend
    if (resource.includes('localhost:5000')) {
      resource = resource.replace('http://localhost:5000', BACKEND_URL);
    } 
    // 2. Prepend production backend to relative API calls
    else if (resource.startsWith('/api')) {
      resource = `${BACKEND_URL}${resource}`;
    }
  }

  return ORIGINAL_FETCH(resource, config);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);