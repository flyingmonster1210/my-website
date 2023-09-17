const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
  },
  email: {
    type: String,
    required: [true, 'Please add a Email'],
  },
  phone: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  github: {
    type: String,
  },
  introduction: {
    type: String,
  },
},
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema, 'users')