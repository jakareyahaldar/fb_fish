import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { styleSetup } from "./lib/Alert"
import { ClerkProvider } from '@clerk/react'

styleSetup()

const PUBLIS_HABLE_KEY = process.env.REACT_APP_PUBLISHABLE_KEY
console.log(PUBLIS_HABLE_KEY)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
     <ClerkProvider publishableKey={PUBLIS_HABLE_KEY}>
        <App />
    </ClerkProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
