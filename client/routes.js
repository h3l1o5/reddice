import React from 'react'
import { Route, Switch } from 'react-router-dom'

import App from './components/App'
import Greetings from './components/Greetings'
import SignupPage from './components/signup/SignupPage'

export default (
  <Switch>
    <Route exact path="/" component={Greetings} />
    <Route exact path="/signup" component={SignupPage} />
  </Switch>
)