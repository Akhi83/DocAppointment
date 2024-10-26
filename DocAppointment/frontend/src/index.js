import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './Components/Login';
import SignupFormPatient from './Components/SignupPatient';
import SignUpDoctor from './Components/SignUpDoctor';
import Signup from './Components/Signup';
import Sample from './Components/Sample';
import App from './App';
import LogIn from './Pages/LogIn';
import DoctorAuth from './Components/SignUpDoctor';
import Admin from './Components/Admin'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Login /> */}
    {/* <Signup/> */}
    <Admin/>
    {/* <LogIn/> */}
    {/* <DoctorAuth/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
