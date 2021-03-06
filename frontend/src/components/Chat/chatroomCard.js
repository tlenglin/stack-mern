import React, { Component } from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@material-ui/core'

export default class ChatroomCard extends Component {
  render() {
    return (
      <div>
        {/* {console.log(this.props)} */}
        <Card>
          <CardContent>
            <Typography variant="h5">{this.props.chatroom.name}</Typography>
            <Typography variant="h6">{this.props.chatroom.topic}</Typography>
            <Typography variant="h6">
              {this.props.chatroom.owner.username}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => this.props.joinRoom(this.props.chatroom)}>
              Join
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}
