const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const users = require('./routes/user')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(
  'mongodb://127.0.0.1:27017/MERN',
  { useNewUrlParser: true }
)
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

app.get('/', function(req, res) {
  res.send('hello')
})

app.use('/api/users', users)

app.listen(4000, () => {
  console.log('Server running on port 4000')
})
