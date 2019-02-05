const { Chatroom } = require('../models')
const { to, ReE, ReS } = require('../services/util.service')

let chatroom = async function(req, res, next) {
  let chatroom_id, err, app
  chatroom_id = req.params.chatroom_id
  ;[err, chatroom] = await to(Chatroom.findOne({ _id: chatroom_id }))
  if (err) return ReE(res, 'err finding chatroom')

  if (!chatroom) return ReE(res, 'chatroom not found with id: ' + chatroom_id)
  // let user, users_array
  // user = req.user
  // users_array = company.users.map(obj => String(obj.user))

  // if (!users_array.includes(String(user._id)))
  //   return ReE(
  //     res,
  //     'User does not have permission to read app with id: ' + app_id
  //   )

  req.chatroom = chatroom
  next()
}
module.exports.chatroom = chatroom
