import React, { Component } from 'react'
import ChatService from '../../services/chat.service'
import { Grid, Paper, Input, Button } from '@material-ui/core'

export default class ChatroomCreate extends Component {
  constructor() {
    super()
    this.ChatService = new ChatService()
    this.state = {
      name: '',
      topic: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.ChatService.create(this.state)
      .then(res => {
        this.props.addRoom(res.chatroom)
        this.setState({
          name: '',
          topic: ''
        })
      })
      .catch(err => {
        alert(err)
      })
  }

  render() {
    return (
      <Grid container justify="center" alignItems="baseline">
        <Grid item style={{ width: '40%' }}>
          <Paper style={{ padding: '50px' }}>
            <form onSubmit={this.handleSubmit}>
              <Input
                fullWidth={true}
                id="name"
                placeholder="Room Name"
                onChange={this.handleChange}
                style={{ margin: '10px' }}
              />
              <br />
              <Input
                fullWidth={true}
                id="topic"
                placeholder="Room Topic"
                onChange={this.handleChange}
                style={{ margin: '10px' }}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: '20px', marginBottom: '50px' }}
              >
                Create Room
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}
