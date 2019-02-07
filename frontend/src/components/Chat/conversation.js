import React, { Component } from 'react'
import io from 'socket.io-client'
import ChatService from '../../services/chat.service'
import withRouter from '../Authentication/withAuth'
import ChatHistory from './chatHistory'
import ChatInput from './chatInput'

class Conversation extends Component {
  constructor() {
    super()
    this.domain = 'http://localhost:4000' // API server domain
    this.socket = io.connect(this.domain)
    this.ChatService = new ChatService()
    this.state = { messages: [] }
  }

  componentDidMount() {
    this.setState(
      {
        room: {
          roomId: this.props.history.location.pathname.split('/')[2],
          roomName: this.props.history.location.pathname.split('/')[2]
        },
        user: {
          userId: this.props.user._id,
          username: this.props.user.username
        }
      },
      () => {
        this.ChatService.getHistory(this.state.room.roomId)
          .then(res => {
            this.setState({
              messages: res.history
            })
            console.log(res)
          })
          .catch(err => {
            alert(err)
          })

        this.socket.emit('room', {
          room: this.state.room,
          user: this.state.user
        })
      }
    )
  }

  componentWillUnmount() {
    this.socket.close()
  }

  createMessage = content => {
    this.socket.emit('message', {
      user: this.state.user,
      room: this.state.room,
      content
    })
    // this.ChatService.createMessage({
    //   chatroom: this.state.chatroomId,
    //   content
    // })
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     alert(err)
    //   })
  }

  render() {
    this.socket.on('error', err => {
      console.log('received socket error: ')
      console.log(err)
    })
    this.socket.on('updatechat', data => {
      console.log(data)
      if (
        this.state.messages.filter(message => message._id === data._id)
          .length === 0
      ) {
        this.setState({
          messages: [...this.state.messages, data]
        })
      }
    })
    return (
      <div>
        <ChatHistory messages={this.state.messages} />
        <ChatInput createMessage={this.createMessage} />
      </div>
    )
  }
}

export default withRouter(Conversation)
