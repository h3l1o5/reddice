import React, { Component } from 'react'

import NavigationBar from './NavigationBar'
import Greetings from './Greetings'
import routes from '../routes'
import FlashMessagesList from './flash/FlashMessagesList'

class App extends Component {
  render() {
    return (
      <div className="container">
        <NavigationBar />
        <FlashMessagesList />
        {routes}
      </div>
    )
  }
}

export default App