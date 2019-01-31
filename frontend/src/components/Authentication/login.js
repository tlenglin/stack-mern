import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from '@material-ui/core'
import AuthService from '../../services/auth.service'

export default class Register extends Component {
  constructor() {
    super()
    this.AuthService = new AuthService()
  }
  state = {
    email: '',
    password: ''
  }

  componentWillMount() {
    if (this.AuthService.loggedIn()) this.props.history.replace('/')
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.AuthService.login(this.state.email, this.state.password)
      .then(res => {
        this.props.history.replace('/')
      })
      .catch(err => {
        alert(err)
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input id="email" placeholder="Email" onChange={this.handleChange} />
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
        <Link to="/register">Register</Link>
      </div>
    )
  }
}
