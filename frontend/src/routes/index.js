import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../components/Home/'
import Header from '../components/Header'
import Login from '../components/Authentication/login'
import Root from '../components/Root'
import Register from '../components/Authentication/register'
import AuthService from '../services/auth.service'

import Grid from '@material-ui/core/Grid'

export default class Routes extends Component {
  constructor() {
    super()
    this.state = {
      profile: {}
    }
    this.AuthService = new AuthService()
  }

  getProfile = () => {
    this.setState({
      profile: this.AuthService.getProfile()
    })
  }

  removeProfile = () => {
    this.setState({
      profile: {}
    })
  }

  componentWillMount() {
    if (this.AuthService.loggedIn()) this.getProfile()
  }

  render() {
    return (
      <BrowserRouter>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Header
              removeProfile={this.removeProfile}
              profile={this.state.profile}
            />
          </Grid>
          <Grid item xs={12}>
            <Switch>
              <Route exact={true} path="/home" component={Home} />
              <Route
                exact={true}
                path="/login"
                render={props => (
                  <Login {...props} getProfile={this.getProfile} />
                )}
              />
              <Route
                exact={true}
                path="/register"
                render={props => (
                  <Register {...props} getProfile={this.getProfile} />
                )}
              />
              <Route exact={true} path="/" component={Root} />
            </Switch>
          </Grid>
        </Grid>
      </BrowserRouter>
    )
  }
}
