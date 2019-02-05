import React, { Component } from 'react'
import withAuth from '../Authentication/withAuth'

class Home extends Component {
  render() {
    return <div>Chatroom CORE</div>
  }
}

export default withAuth(Home)
