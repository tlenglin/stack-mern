import React, { Component } from 'react'
import { Button, Input } from '@material-ui/core'

export default class Register extends Component {
  state = {
    email: '',
    password: '',
    username: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('state : ', this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input id="email" placeholder="Email" onChange={this.handleChange} />
        <Input
          id="username"
          placeholder="username"
          onChange={this.handleChange}
        />
        <Input
          id="password"
          placeholder="Password"
          onChange={this.handleChange}
          type="password"
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    )
  }
}
