import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/app';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );

  reportWebVitals();
} else {
  console.error('Root element not found');
}
