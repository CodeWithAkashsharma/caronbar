import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// Suppress external browser extension noise (e.g., Jobright Autofill) in development
if (import.meta.env.DEV) {
  const origWarn = console.warn;
  const origLog = console.log;
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && (args[0].includes('[Autofill]') || args[0].includes('[jobright]'))) return;
    origWarn(...args);
  };
  console.log = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('[jobright]')) return;
    origLog(...args);
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
