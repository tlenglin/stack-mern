const mongoose = require('mongoose')
const Message = require('./Message')
const { TE, to } = require('../services/util.service')

let ChatroomSchema = mongoose.Schema(
  {
    name: { type: String },
    private: { type: Boolean, default: false },
    owner: {
      userId: { type: mongoose.Schema.ObjectId },
      username: { type: String }
    },
    members: [
      { userId: { type: mongoose.Schema.ObjectId }, username: { type: String } }
    ],
    topic: { type: String, default: '' }
  },
  { timestamps: true }
)

ChatroomSchema.methods.toWeb = function() {
  let json = this.toJSON()
  json.id = this._id //this is for the front end
  return json
}

ChatroomSchema.methods.Messages = async function() {
  let err, messages
  ;[err, messages] = await to(Message.find({ chatroom: this._id }))
  if (err) TE('err getting messages')
  return messages
}

let Chatroom = (module.exports = mongoose.model('Chatroom', ChatroomSchema))
