import React, { Component } from 'react'
import { Button, Input } from '@material-ui/core'
import AuthService from '../../services/auth.service'

export default class Register extends Component {
  constructor() {
    super()
    this.AuthService = new AuthService()

    this.state = {
      email: '',
      password: '',
      username: '',
      firstname: '',
      lastname: '',
      passwordCheck: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.AuthService.register(this.state)
      .then(res => {
        this.props.history.replace('/')
      })
      .catch(err => {
        alert(err)
      })
  }

  componentWillMount() {
    if (this.AuthService.loggedIn()) this.props.history.replace('/')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input id="email" placeholder="Email" onChange={this.handleChange} />
        <Input
          id="firstname"
          placeholder="firstname"
          onChange={this.handleChange}
        />
        <Input
          id="lastname"
          placeholder="lastname"
          onChange={this.handleChange}
        />
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
        <Input
          id="passwordCheck"
          placeholder="PasswordCheck"
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
