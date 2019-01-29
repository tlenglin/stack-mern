import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../components/Home/'
import Header from '../components/Header'
import Login from '../components/Authentication/login'
import Register from '../components/Authentication/register'

import Grid from '@material-ui/core/Grid'

const Routes = () => (
  <BrowserRouter>
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <Switch>
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/register" component={Register} />
          <Route exact={true} path="/" component={Home} />
        </Switch>
      </Grid>
    </Grid>
  </BrowserRouter>
)

export default Routes
