const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const { isEmpty } = require('../tools')
const User = require('../models/userModel')

// @desc    Register a new user account
// @route   Post /api/user/register
const registerUser = asyncHandler(async (req, res) => {
  const body = req.body
  const check = isEmpty(body, ['username', 'password', 'email'])
  if (check.result) {
    res.status(400)
    throw new Error(check.message)
  }

  const isUserExist = await User.findOne({ email: body.email })
  if (isUserExist) {
    res.status(400)
    throw new Error('This email has been used, please use another one.')
  }

  const salt = await bcrypt.genSalt(Number(process.env.SALT))
  const hashPassword = await bcrypt.hash(body.password, salt)

  const newUser = await User.create({
    ...body,
    password: hashPassword,
  })

  if (newUser) {
    res.json({
      message: 'Create a new user.',
      newUser: {
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        linkedin: newUser.linkedin,
        github: newUser.github,
        introduction: newUser.introduction,
        _id: newUser.id,
        token: generateToken(newUser._id),
      }
    })
  }
  else {
    res.status(400)
    throw new Error('Fail to register.')
  }
})

// @desc    Authenticate a user and get the token
// @route   POST /api/user/login
const loginUser = asyncHandler(async (req, res) => {
  const body = req.body
  const check = isEmpty(body, ['email', 'password'])
  if (check.result) {
    res.status(400)
    throw new Error(check.message)
  }

  const user = await User.findOne({ email: body.email })
  if (user && (await bcrypt.compare(body.password, user.password))) {
    res.json({
      message: 'User login.',
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        linkedin: user.linkedin,
        github: user.github,
        introduction: user.introduction,
        _id: user.id,
        token: generateToken(user.id),
      }
    })
  }
  else {
    res.status(400)
    throw new Error('Fail to login.')
  }

})

// @desc    Update user info
// @route   PUT /api/user/update:id
const updateUser = asyncHandler(async (req, res) => {
  const body = req.body
  const params = req.params
  const check = [isEmpty(params, ['id']), isEmpty(body, ['username'])]
  for (let i = 0; i < check.length; i++) {
    if (check[i].result) {
      res.status(400)
      throw new Error(check[i].message)
    }
  }

  const user = await User.findById(params.id)
  if (!user) {
    res.status(400)
    throw new Error('User not found.')
  }

  const salt = await bcrypt.genSalt(Number(process.env.SALT))
  const hashPassword = await bcrypt.hash(body.password, salt)
  const updatedUser = await User.findByIdAndUpdate(
    params.id,
    {
      ...body,
      password: hashPassword,
    }
  )

  if (updatedUser) {
    res.json({
      message: 'User info updated.',
      updatedUser: {
        username: body.username,
        email: body.email,
        phone: body.phone,
        linkedin: body.linkedin,
        github: body.github,
        introduction: body.introduction,
        _id: params.id,
      },
    })
  }
  else {
    res.status(400)
    throw new Error('Fail to update user.')
  }
})

// @desc    Delete a user
// @route   DELETE /api/user/delete:id
const deleteUser = asyncHandler(async (req, res) => {
  const params = req.params
  const check = isEmpty(params, ['id'])
  if (check.result) {
    res.status(400)
    throw new Error(check.message)
  }

  const user = await User.findById(params.id)
  if (!user) {
    res.status(400)
    throw new Error('User not found.')
  }

  const deletedUser = await User.findByIdAndDelete(params.id)
  if (deletedUser) {
    res.json({
      message: 'Delete user with id:' + params.id + '.',
      deletedUser: deletedUser,
    })
  }
  else {
    res.status(400)
    throw new Error('Fail to delete user.')
  }
})

// @desc    Get user info
// @route   GET /api/user/me
const getMe = asyncHandler(async (req, res) => {
  const userId = '65076e3442427d2b8e90ca30'
  const user = await User.findById(userId)
  if (user) {
    res.json({
      message: 'Get default user info.',
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        linkedin: user.linkedin,
        github: user.github,
        introduction: user.introduction,
      }
    })
  }
  else {
    res.status(400)
    throw new Error('Fail to get dafault user info.')
  }

})

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' },
  )
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser,
}