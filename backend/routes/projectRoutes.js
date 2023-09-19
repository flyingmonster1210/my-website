const express = require('express')
const router = express.Router()

const { getAllProjects, getProject, addProject, updateProject, deleteProject } = require('../controllers/projectControllers')
const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(getAllProjects).post(protect, addProject)
router.route('/:id').get(getProject).put(protect, updateProject).delete(protect, deleteProject)

module.exports = router