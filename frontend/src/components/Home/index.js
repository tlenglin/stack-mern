import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import AuthService from '../../services/auth.service'
import withAuth from '../Authentication/withAuth'
const Auth = new AuthService()

class Home extends Component {
  handleLogout = () => {
    Auth.logout()
    this.props.history.replace('/login')
  }
  render() {
    return (
      <div>
        HOME
        <Button onClick={this.handleLogout}>Logout</Button>
      </div>
    )
  }
}

export default withAuth(Home)
