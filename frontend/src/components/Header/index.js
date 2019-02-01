import React, { PureComponent } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AuthService from '../../services/auth.service'

const Auth = new AuthService()
export default class Header extends PureComponent {
  handleLogout = () => {
    this.props.removeProfile()
    Auth.logout()
  }

  render() {
    return (
      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{ backgroundColor: '#2196f3', height: '75px' }}
      >
        <Grid item>
          <Typography variant="h4" style={{ color: 'white' }}>
            STACK MERN
          </Typography>
        </Grid>
        <Grid item>
          {!this.props.profile.user_id ? (
            <Link to="/login">
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleLogout}
              >
                Logout
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    )
  }
}
