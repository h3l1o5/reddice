import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import jwtDecode from 'jwt-decode'

import App from './components/App'
import rootReducer from './rootReducer'
import setAuthorizationToken from './utils/setAuthorizationToken'
import { setCurrentUser } from './actions/authActions'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

// keep user login if jwt existed
if (localStorage.jwt) {
  setAuthorizationToken(localStorage.jwt)
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwt)))
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App/> 
    </Router>
  </Provider>,
  document.getElementById('app')
)