const chatroomService = require('./chatroom.service')
const { to, ReE, ReS } = require('./util.service')

const handleRegister = function(userName, callback) {
  if (!clientManager.isUserAvailable(userNAme))
    return callback('user is not available')
  const user = clientManager.getUserByName(userName)
  clientManager.registerClient(client, user)
  return callback(null, user)
}

module.exports.handleRegister = handleRegister

const handleEvent = function(chatroomName, createEntry) {
  return ensureValidChatrooAndUserSelect(chatroonName).then(function({
    chatroom,
    user
  }) {
    const entry = { user, ...createEntry() }
    chatroom.broadcastMessage({ chat: chatroomName, ...entry })
  })
}
module.exports.handleEvent = handleEvent

const members = new Map()
let chatHistory = []

const broadcastMessage = function(message) {
  members.forEach(m => m.emit('message', message))
}

module.exports.broadcastMessage = broadcastMessage

const addEntry = function(entry) {
  chathistory = chatHistory.concat(entry)
}

module.exports.addEntry = addEntry

const getChatHistory = function() {
  return chatHistory.slice()
}

module.exports.getChatHistory = getChatHistory

const addUser = function(client) {
  members.set(client.id, client)
}

module.exports.addUser = addUser

const removeUser = function(client) {
  members.delete(client.id)
}

module.exports.removeUser = removeUser

const serialize = function() {
  return {
    name,
    image,
    numMembers: members.size
  }
}

module.exports.serialize = serialize

const handleJoin = function(chatroomName, callback) {
  const createEntry = () => ({ event: `joined ${chatroomName}` })

  handleEvent(chatroomName, createEntry)
    .then(function(chatroom) {
      chatroom.addUser(client)
      callback(null, chatroom.getChatHistory())
    })
    .catch(callback)
}

module.exports.handleJoin = handleJoin

//handlejoin, handleleave, handleregister, handlemessage, handlegetchatroom, hndlegetavailableusers

const handleDisconnect = function() {
  clientManager.removeClient(client)
  chatroomManager.removeClient(client)
}

module.exports.handleDisconnect = handleDisconnect

const handleRoom = async function(io, socket, data) {
  let err, message, content
  console.log(`${data.user.username} joined room : ${data.room.roomId}`)
  socket.join(data.room.roomId)
  content = `${data.user.username} joined the room ${data.room.roomId}`
  message = setMessage(data.user, data.room, content)
  ;[err, message] = await to(chatroomService.createMessage(message))
  if (err) socket.emit('error', err)
  else io.sockets.in(data.room.roomId).emit('updatechat', message)
}
module.exports.handleRoom = handleRoom

const setMessage = function(user, room, content) {
  const message = {
    creator: { userId: user.userId, username: user.username },
    content,
    chatroom: room.roomId
  }
  return message
}

const createMessage = async function(io, socket, data) {
  let err, message

  message = setMessage(data.user, data.room, data.content)
  ;[err, message] = await to(chatroomService.createMessage(message))
  if (err) socket.emit('error', err)
  else io.sockets.in(data.room.roomId).emit('updatechat', message)
}

module.exports.createMessage = createMessage
