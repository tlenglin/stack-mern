import React, { Component } from 'react'
import { Button, Input, Paper, Grid, Typography } from '@material-ui/core'
import AuthService from '../../services/auth.service'
import { Link } from 'react-router-dom'

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
        this.props.getProfile()
        this.props.history.replace('/home')
      })
      .catch(err => {
        alert(err)
      })
  }

  componentWillMount() {
    if (this.AuthService.loggedIn()) this.props.history.replace('/home')
  }

  render() {
    return (
      <Grid container justify="center" alignItems="baseline">
        <Grid item style={{ width: '40%' }}>
          <Paper style={{ padding: '50px' }}>
            <form onSubmit={this.handleSubmit}>
              <Input
                id="email"
                placeholder="Email"
                onChange={this.handleChange}
                fullWidth={true}
                style={{ margin: '10px' }}
              />
              <br />
              <Input
                fullWidth={true}
                id="firstname"
                placeholder="Firstname"
                onChange={this.handleChange}
                style={{ margin: '10px' }}
              />
              <br />
              <Input
                fullWidth={true}
                id="lastname"
                placeholder="Lastname"
                onChange={this.handleChange}
                style={{ margin: '10px' }}
              />
              <br />
              <Input
                fullWidth={true}
                id="username"
                placeholder="Username"
                onChange={this.handleChange}
                style={{ margin: '10px' }}
              />
              <br />
              <Input
                fullWidth={true}
                id="password"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
                style={{ margin: '10px' }}
              />
              <br />
              <Input
                fullWidth={true}
                id="passwordCheck"
                placeholder="PasswordCheck"
                onChange={this.handleChange}
                style={{ margin: '10px' }}
                type="password"
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: '20px', marginBottom: '50px' }}
              >
                Submit
              </Button>
            </form>
            <Link to="/login">
              <Typography variant="body2">Login</Typography>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}
