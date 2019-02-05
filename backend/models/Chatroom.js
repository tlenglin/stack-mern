const mongoose = require('mongoose')

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
    topic: { type: String, default: '' },
    messages: [{ type: mongoose.Schema.ObjectId }]
  },
  { timestamps: true }
)

ChatroomSchema.methods.toWeb = function() {
  let json = this.toJSON()
  json.id = this._id //this is for the front end
  return json
}

let Chatroom = (module.exports = mongoose.model('Chatroom', ChatroomSchema))
