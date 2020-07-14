import React, { Component } from 'react'

import Example1 from './example-1'
import Example2 from './example-2'
import Example4 from './example-4'
import Example5 from './example-5'

export default class App extends Component {
  render() {
    return (
      <div className="container">
          <Example1/>
          <Example2/>
          <Example4/>
          <Example5/>
      </div>
    )
  }
}
