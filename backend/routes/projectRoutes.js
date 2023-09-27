const express = require('express')
const router = express.Router()

const { getDefaultProjects, getProject, addProject, updateProject, deleteProject, getAllProjectsByUserId } = require('../controllers/projectControllers')
const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(getDefaultProjects).post(protect, addProject)
router.route('/:id').get(getProject).put(protect, updateProject).delete(protect, deleteProject)
router.route('/projectsOfUser/:id').get(getAllProjectsByUserId)

module.exports = router