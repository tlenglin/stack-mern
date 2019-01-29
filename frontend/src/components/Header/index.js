import React, { PureComponent } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default class Header extends PureComponent {
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
          <Link to="/login">
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
        </Grid>
      </Grid>
    )
  }
}
