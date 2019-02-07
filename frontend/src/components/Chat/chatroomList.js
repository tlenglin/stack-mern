import React from 'react'
import ChatroomCard from './chatroomCard'
import { List } from '@material-ui/core'
const ChatroomList = props => {
  return (
    <div>
      <List>
        {props.chatrooms && props.chatrooms.length > 0
          ? props.chatrooms.map(room => (
              <div key={room._id}>
                <ChatroomCard chatroom={room} joinRoom={props.joinRoom} />
              </div>
            ))
          : null}
      </List>
    </div>
  )
}

export default ChatroomList
