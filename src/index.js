import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/app';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';
import { ReduxProviders } from "./store/provider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProviders store={store}>
      <App />
    </ReduxProviders>
  </React.StrictMode>
);

reportWebVitals();
