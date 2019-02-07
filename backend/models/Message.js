const mongoose = require('mongoose')

let MessageSchema = mongoose.Schema(
  {
    creator: {
      userId: { type: mongoose.Schema.ObjectId },
      username: { type: String }
    },
    content: { type: String, default: '' },
    chatroom: { type: mongoose.Schema.ObjectId }
  },
  { timestamps: true }
)

MessageSchema.methods.toWeb = function() {
  let json = this.toJSON()
  json.id = this._id //this is for the front end
  return json
}

let Message = (module.exports = mongoose.model('Message', MessageSchema))
