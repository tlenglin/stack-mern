import React, { Component } from 'react'
import withAuth from '../Authentication/withAuth'
import ChatService from '../../services/chat.service'
import ChatroomCard from './chatroomCard'
import { List } from '@material-ui/core'
class ChatroomList extends Component {
  constructor(domain) {
    super()
    this.ChatService = new ChatService()
    this.state = {}
  }

  componentDidMount() {
    this.ChatService.get()
      .then(res => {
        this.setState({
          chatrooms: res.chatrooms
        })
        // console.log(res)
      })
      .catch(err => {
        alert(err)
      })
  }

  render() {
    return (
      <div>
        <List>
          {this.state.chatrooms && this.state.chatrooms.length > 0
            ? this.state.chatrooms.map(room => (
                <div key={room._id}>
                  <ChatroomCard chatroom={room} />
                </div>
              ))
            : null}
        </List>
      </div>
    )
  }
}

export default withAuth(ChatroomList)
