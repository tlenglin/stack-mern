import React, { Component } from 'react'
import { Input, Button } from '@material-ui/core'

export default class Login extends Component {
  render() {
    return (
      <form>
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </form>
    )
  }
}
