const express = require('express')
const router = express.Router()

const { getAllProjects, getProject, addProject, updateProject, deleteProject } = require('../controllers/projectControllers')

router.route('/').get(getAllProjects).post(addProject)
router.route('/:id').get(getProject).put(updateProject).delete(deleteProject)

module.exports = router