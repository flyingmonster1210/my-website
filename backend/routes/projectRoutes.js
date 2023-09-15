const express = require('express')
const router = express.Router()

const { getAllProjects, addProject, updateProject, deleteProject } = require('../controllers/projectControllers')

router.route('/').get(getAllProjects).post(addProject)
router.route('/:id').put(updateProject).delete(deleteProject)

module.exports = router