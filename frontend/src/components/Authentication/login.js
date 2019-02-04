import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Paper, Typography, Grid } from '@material-ui/core'
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
    if (this.AuthService.loggedIn()) this.props.history.replace('/home')
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
        this.props.getProfile()
        this.props.history.replace('/home')
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
                id="email"
                placeholder="Email"
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: '20px', marginBottom: '50px' }}
              >
                Submit
              </Button>
            </form>
            <Link to="/register">
              <Typography variant="body2">Register</Typography>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}
