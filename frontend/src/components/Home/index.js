import React, { Component } from 'react'
import withAuth from '../Authentication/withAuth'
// import io from 'socket.io-client'
import Chatroom from '../Chat/chatroom'

class Home extends Component {
  constructor(domain) {
    super()
    // this.domain = domain || 'http://localhost:4000' // API server domain
    // this.socket = io.connect(this.domain)
    // this.socket.on('error', err => {
    //   console.log('received socket error: ')
    //   console.log(err)
    // })
  }

  render() {
    return (
      <div>
        <Chatroom history={this.props.history} />
      </div>
    )
  }
}

export default withAuth(Home)
