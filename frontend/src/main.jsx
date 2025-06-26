import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import './styles/tailwind.css'
import AppRoutes from './routes';
import { Toaster } from 'react-hot-toast';

const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store} >
      <AppRoutes />
      <Toaster position="top-right" />
    </Provider>
  </React.StrictMode>
);