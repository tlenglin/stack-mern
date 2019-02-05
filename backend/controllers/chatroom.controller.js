const { Chatroom } = require('../models')
const chatroomService = require('../services/chatroom.service')
const { to, ReE, ReS } = require('../services/util.service')

const create = async function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  const chatroomInfo = req.body
  const user = req.user
  let [err, chatroom] = await to(
    chatroomService.createChatroom({ user, chatroomInfo })
  )
  if (err) return ReE(res, err, 422)
  return ReS(
    res,
    {
      message: 'Successfully created new chatroom.',
      chatroom: chatroom.toWeb()
    },
    201
  )
}
module.exports.create = create

const getAll = async function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  let err, chatrooms, user
  user = req.user
  console.log(user)
  ;[err, chatrooms] = await to(user.Chatrooms())
  if (err) return ReE(res, err, 422)
  let chatrooms_json = []
  for (let i in chatrooms) {
    let chatroom = chatrooms[i]
    chatrooms_json.push(chatroom.toWeb())
  }
  return ReS(res, { chatrooms: chatrooms_json })
}
module.exports.getAll = getAll

const get = async function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  let chatroom = req.chatroom

  return ReS(res, { chatroom: chatroom.toWeb() })
}
module.exports.get = get

const update = async function(req, res) {
  let err, user, data, chatroom
  user = req.user
  data = req.body
  chatroom = req.chatroom
  chatroom.set(data)
  ;[err, chatroom] = await to(chatroom.save())
  if (err) {
    if (err.message.includes('E11000')) {
      if (err.message.includes('name')) {
        err = 'This chatroom name is already in use'
      }
    }

    return ReE(res, err)
  }
  return ReS(res, { message: 'Updated Chatroom: ' + chatroom.name })
}
module.exports.update = update

const remove = async function(req, res) {
  let chatroom, err
  chatroom = req.chatroom
  ;[err, chatroom] = await to(chatroom.destroy())
  if (err) return ReE(res, 'error occured trying to delete chatroom')

  return ReS(res, { message: 'Deleted chatroom' }, 204)
}
module.exports.remove = remove

const join = async function(req, res) {
  let err, user, chatroom_id, member, chatroom
  user = req.user
  chatroom = req.chatroom
  chatroom_id = chatroom._id
  member = { userId: user._id, username: user.username }

  chatroom.set({ members: [...chatroom.members, member] })
  user.set({ chatroomMember: [...user.chatroomMember, chatroom_id] })
  ;[err, chatroom] = await to(chatroom.save())
  if (err) return ReE(res, 'error occured trying to update chatroom')
  ;[err, user] = await to(user.save())
  if (err) return ReE(res, 'error occured trying to update user')

  return ReS(res, {
    message: 'Updated Chatroom: ' + chatroom.name + 'and ' + user.username
  })
}
module.exports.join = join
