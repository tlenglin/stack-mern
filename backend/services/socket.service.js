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
