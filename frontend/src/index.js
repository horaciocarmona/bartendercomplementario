import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import reportWebVitals from './reportWebVitals';
import reportWebVitals from './reportWebVitals';

import Router from './screens/itemListContainer/Router';
//import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyCWF6Q_wqI3QHFDYHYOu7sOnJgf7_oVgnk",
//   authDomain: "ecomerce-bartender.firebaseapp.com",
//   projectId: "ecomerce-bartender",
//   storageBucket: "ecomerce-bartender.appspot.com",
//   messagingSenderId: "487666492988",
//   appId: "1:487666492988:web:88e31732b13e45b4388539"
// };
// initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
