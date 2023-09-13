const express = require('express')
const router = express.Router()

const { getProjects, addProject, updateProject, deleteProject } = require('../controllers/projectControllers')

router.route('/').get(getProjects).post(addProject)
router.route('/:id').put(updateProject).delete(deleteProject)

module.exports = router