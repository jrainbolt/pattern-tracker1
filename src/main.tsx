import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';

const redirect = new URLSearchParams(window.location.search).get('redirect');
if (redirect) {
  window.history.replaceState(null, '', `${import.meta.env.BASE_URL}${redirect.replace(/^\//, '')}`);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.PROD ? '/pattern-tracker1' : '/'}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
