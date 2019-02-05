const { Chatroom, User } = require('../models')
const { to, TE } = require('./util.service')

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

// const authUser = async function(userInfo) {
//   //returns token
//   let unique_key
//   let auth_info = {}
//   auth_info.status = 'login'
//   unique_key = getUniqueKeyFromBody(userInfo)

//   if (!unique_key) TE('Please enter an email or phone number to login')

//   if (!userInfo.password) TE('Please enter a password to login')

//   let user
//   if (validator.isEmail(unique_key)) {
//     auth_info.method = 'email'
//     ;[err, user] = await to(User.findOne({ email: unique_key }))
//     if (err) TE(err.message)

//     // }else if(validator.isMobilePhone(unique_key, 'any')){//checks if only phone number was sent
//     //     auth_info.method='phone';

//     //     [err, user] = await to(User.findOne({phone:unique_key }));
//     //     if(err) TE(err.message);
//   } else {
//     TE('A valid email or phone number was not entered')
//   }

//   if (!user) TE('Not registered')
//   ;[err, user] = await to(user.comparePassword(userInfo.password))

//   if (err) TE(err.message)

//   return user
// }
// module.exports.authUser = authUser
