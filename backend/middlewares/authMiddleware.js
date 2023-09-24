const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  // For each request we need put the authorization in the headers, 
  // so that we can verify if it is a acceptable jwt
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // We will use the Bearer token which looks like:
      // 'Bearer xxx', xxx is the token we want.
      token = req.headers.authorization.split(' ')[1]

      // Decode the token, and we will the the object: 
      // {id: userId} which is stored in the generateToken()
      const decodedObjectFromJWT = jwt.verify(token, process.env.JWT_SECRET)

      // Put the userObject into the reqest
      req.user = await User.findById(decodedObjectFromJWT.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Verify failed, request is not authorized.')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Token not found, request is not authorized.')
  }
})

module.exports = {
  protect,
}