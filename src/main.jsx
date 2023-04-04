import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './app/store';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/SignIn';
import Layout from './components/layout/Layout';
import FourOFour from './pages/FourOFour';

import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './assets/css/grid.css';
import './assets/css/theme.css';
import './assets/css/index.css';
import './tailwind.css';
import Routers from './components/Routers';



ReactDOM.render(
  <Provider store={store}> 
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
          <Route element={<Layout />}>
            {Routers()}
          </Route>
          <Route
                path="*"
                element={
                  <FourOFour />
                }
            />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
