const registerHandler = (socket, onMessageReceived) => {
  socket.on('message', onMessageReceived)
}

const unregisterHandler = socket => {
  socket.off('message')
}

const register = (socket, name, cb) => {
  socket.emit('register', name, cb)
}

const join = (socket, chatroomName, cb) => {
  socket.emit('join', chatroomName, cb)
}

const leave = (socket, chatroomName, cb) => {
  socket.emit('leave', chatroomName, cb)
}

const message = (socket, chatroomName, msg, cb) => {
  socket.emit('message', { chatroomName, message: msg }, cb)
}

const getChatrooms = (socket, cb) => {
  socket.emit('chatrooms', null, cb)
}

const getAvailableUsers = (socket, cb) => {
  socket.emit('availableUsers', null, cb)
}

export {
  registerHandler,
  unregisterHandler,
  register,
  join,
  leave,
  message,
  getChatrooms,
  getAvailableUsers
}
