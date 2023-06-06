import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './themes/theme.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/main';
import Authlayout from './layouts/auth';
import AuthProtect from './components/AuthProtect';
import Login from './components/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
    
      <Routes>
    
        <Route path='/' element={<MainLayout />}>
          <Route path='home' element={<App />}/>
        </Route>
        <Route path='/auth' element={<Authlayout />}>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<>Đăng Ký</>}/>
        </Route>
    
      </Routes>
    
    </BrowserRouter>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
