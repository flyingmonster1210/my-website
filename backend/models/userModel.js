const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
  },
  email: {
    type: String,
    required: [true, 'Please add an Email'],
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