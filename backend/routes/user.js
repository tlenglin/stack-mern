const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const User = require('../schemas/User')

router.post('/register', (req, res) => {
  console.log('TEST')
  console.log(req.body)
  res.send({ toto: 'heloo' })
})

module.exports = router
