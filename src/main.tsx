import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.tsx';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <App />
        </Router>
      </SnackbarProvider>
    </I18nextProvider>
  </React.StrictMode>,
);