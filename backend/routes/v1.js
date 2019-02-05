const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller')
const ChatroomController = require('../controllers/chatroom.controller')

const custom = require('./../middleware/custom')

const passport = require('passport')
const path = require('path')

require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    status: 'success',
    message: 'Parcel Pending API',
    data: { version_number: 'v1.0.0' }
  })
})

router.post('/users', UserController.create) // C
router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  UserController.get
) // R
router.put(
  '/users',
  passport.authenticate('jwt', { session: false }),
  UserController.update
) // U
router.delete(
  '/users',
  passport.authenticate('jwt', { session: false }),
  UserController.remove
) // D
router.post('/users/login', UserController.login)

router.post(
  '/chatroom',
  passport.authenticate('jwt', { session: false }),
  ChatroomController.create
)
router.get(
  '/chatroom',
  passport.authenticate('jwt', { session: false }),
  ChatroomController.getAll
)
router.get('/chatroom/:chatroom_id', custom.chatroom, ChatroomController.get)
router.put(
  '/chatroom/:chatroom_id',
  passport.authenticate('jwt', { session: false }),
  custom.chatroom,
  ChatroomController.update
)
router.delete(
  '/chatroom/:chatroom_id',
  passport.authenticate('jwt', { session: false }),
  custom.chatroom,
  ChatroomController.remove
)
router.post(
  '/chatroom/join/:chatroom_id',
  passport.authenticate('jwt', { session: false }),
  custom.chatroom,
  ChatroomController.join
)

module.exports = router
