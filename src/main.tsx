import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <App />
        </Router>
      </SnackbarProvider>
  </React.StrictMode>,
);