import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Login from './Login'
import Dashboard from './Dashboard'
import Poll from './Poll'
import Control from './Control'
import Edit from './Edit'
import Afooter from './components/afooter'
import UserWs from './components/UserWs'

import reportWebVitals from './reportWebVitals'
import {Link, Route, BrowserRouter, Routes} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<UserWs/>} path="/">
        <Route element={<Dashboard/>} path="/"></Route>
        <Route element={<Poll/>} path="/Poll"></Route>
        {/* <Route Component={AdminLogin} path="/admin/login"></Route> */}
        <Route element={<Afooter/>} path="/admin/">
          <Route path='poll' exact element={<Control/>}/>
          <Route path='dashboard' exact element={<Edit/>}/>
        </Route>
      </Route>
      
      <Route element={<Login/>} path="/Login"></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
