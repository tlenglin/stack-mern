import React, { Component } from 'react'
import withAuth from '../Authentication/withAuth'

class Home extends Component {
  render() {
    return <div>HOME</div>
  }
}

export default withAuth(Home)
