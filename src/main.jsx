import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import ThemeReducer from './redux/reducers/ThemeReducer';

import Layout from './components/layout/Layout'
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './assets/css/grid.css';
import './assets/css/theme.css';
import './assets/css/index.css';

const store = createStore(ThemeReducer)

store.dispatch({ type: 'counter/incremented' })

ReactDOM.render(
  <Provider store={store}> 
    <React.StrictMode>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
