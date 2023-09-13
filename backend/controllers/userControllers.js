const asyncHandler = require('express-async-handler')

// @desc    User login and get the token
// @route   POST /api/user/login
const loginUser = asyncHandler(async (req, res) => {
  res.json({
    message: 'user login',
  })
})

// @desc    Update user info
// @route   PUT /api/user/update
const updateUser = asyncHandler(async (req, res) => {
  res.json({
    message: 'user update',
  })
})

// @desc    Get user info
// @route   GET /api/user/me
const getMe = asyncHandler(async (req, res) => {
  res.json({
    message: 'user getMe',
  })
})

module.exports = {
  loginUser,
  getMe,
  updateUser,
}