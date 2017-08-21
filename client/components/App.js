import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import NavigationBar from './NavigationBar'
import Greetings from './Greetings'
import routes from '../routes'

class App extends Component {
  render() {
    return (
        <Router>
          <div className="container">
            <NavigationBar />
            {routes}
          </div>
        </Router>
    )
  }
}

export default App