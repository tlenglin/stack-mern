const { Chatroom, User, Message } = require('../models')
const { to, TE, ReE } = require('./util.service')

const createChatroom = async function({ user, chatroomInfo }) {
  let err, chatroom, dataChat, dataUser
  dataChat = {
    ...chatroomInfo,
    members: [{ userId: user._id, username: user.username }],
    owner: { userId: user._id, username: user.username }
  }
  ;[err, chatroom] = await to(Chatroom.create(dataChat))
  if (err) TE('chatroom already exists with that name')
  dataUser = {
    chatroomOwner: [...user.chatroomOwner, chatroom._id],
    chatroomMember: [...user.chatroomMember, chatroom._id]
  }
  user.set(dataUser)
  ;[err, user] = await to(user.save())
  if (err) {
    return ReE(res, err)
  }
  return chatroom
}
module.exports.createChatroom = createChatroom

const createMessage = async function(message) {
  ;[err, message] = await to(Message.create(message))
  if (err) TE('error occured trying to create message')
  return message
}
module.exports.createMessage = createMessage
