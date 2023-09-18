const bcrypt = require('bcrypt')
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
      }
    })
  }
  else {
    res.status(400)
    throw new Error('Invlid register data.')
  }
})

// @desc    User login and get the token
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
      }
    })
  }
  else {
    res.status(400)
    throw new Error('Invlid email or password.')
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
    throw new Error('Invlid update data.')
  }
})

// @desc    Get user info
// @route   GET /api/user/me
const getMe = asyncHandler(async (req, res) => {
  res.json({
    message: 'user getMe',
  })
})

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUser,
}