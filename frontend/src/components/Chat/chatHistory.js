import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'

const ChatHistory = props => {
  return (
    <div>
      {/* {console.log(props)} */}
      <List>
        {props.messages
          ? props.messages.map(message => (
              <ListItem key={message._id}>
                <ListItemText>{message.creator.username} :</ListItemText>
                <ListItemText>{message.content}</ListItemText>
              </ListItem>
            ))
          : null}
      </List>
    </div>
  )
}

export default ChatHistory
