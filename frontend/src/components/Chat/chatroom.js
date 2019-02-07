import React, { Component } from 'react'
// import io from 'socket.io-client'
import ChatroomList from '../Chat/chatroomList'
import ChatroomCreate from '../Chat/chatroomCreate'
import ChatService from '../../services/chat.service'

export default class Chatroom extends Component {
  constructor(domain) {
    super()
    // this.domain = domain || 'http://localhost:4000' // API server domain
    // this.socket = io.connect(this.domain)
    // this.socket.on('error', err => {
    //   console.log('received socket error: ')
    //   console.log(err)
    // })
    this.ChatService = new ChatService()
    this.state = {}
  }

  componentDidMount() {
    this.ChatService.get()
      .then(res => {
        this.setState({
          chatrooms: res.chatrooms
        })
      })
      .catch(err => {
        alert(err)
      })
  }

  addRoom = room => {
    this.setState({
      chatrooms: [...this.state.chatrooms, room]
    })
  }

  joinRoom = room => {
    this.ChatService.join(room)
      .then(res => {
        this.props.history.replace('/chatroom/' + room.id)
      })
      .catch(err => {
        alert(err)
      })
  }

  render() {
    return (
      <div>
        <ChatroomList
          chatrooms={this.state.chatrooms}
          joinRoom={this.joinRoom}
        />
        <ChatroomCreate addRoom={this.addRoom} />
      </div>
    )
  }
}
