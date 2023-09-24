const express = require('express')
const router = express.Router()

const { loginUser, updateUser, getMe, registerUser, deleteUser, getUser } = require('../controllers/userControllers')
const { protect } = require('../middlewares/authMiddleware')

router.route('/me').get(getMe)
router.route('/get/:id').get(getUser)
router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/delete/:id').delete(protect, deleteUser)
router.route('/update/:id').put(protect, updateUser)

module.exports = router