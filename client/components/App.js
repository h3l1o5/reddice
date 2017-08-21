import React, { Component } from 'react'

import NavigationBar from './NavigationBar'
import Greetings from './Greetings'
import routes from '../routes'

class App extends Component {
  render() {
    return (
      <div className="container">
        <NavigationBar />
        {routes}
      </div>
    )
  }
}

export default App