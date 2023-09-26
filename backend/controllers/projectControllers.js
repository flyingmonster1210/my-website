const asyncHandler = require('express-async-handler')
const Project = require('../models/projectModel')

const { keysNotFound } = require('../tools')

// @desc    Show all the projects of the default user
// @route   GET /api/project/
const getAllProjects = asyncHandler(async (req, res) => {
  const allProjects = await Project.find()

  res.json({
    message: 'Get all projects.',
    project: allProjects,
  })
})

// @desc    Show all projects of a user with userId
const getAllProjectsByUserId = asyncHandler(async (req, res) => {
  const params = req.params
  const check = keysNotFound(params, ['id'])
  if (check.result) {
    res.status(400)
    throw new Error(check.message)
  }
  if (!params.id) {
    res.status(400)
    throw new Error('A required field is empty.')
  }

  const projects = await Project.find({ userId: params.id })

  res.json({
    message: 'Get all projects of user: ' + params.id + '.',
    project: projects,
  })
})

// @desc    Search the project with the project id
// @route   GET /api/project/:id
const getProject = asyncHandler(async (req, res) => {
  const params = req.params
  const check = keysNotFound(params, ['id'])
  if (check.result) {
    res.status(400)
    throw new Error(check.message)
  }
  if (!(params.id)) {
    res.status(400)
    throw new Error('A required field is empty.')
  }

  const project = await Project.findById(params.id)
  res.json({
    message: 'Get the project with id:' + req.params.id + '.',
    project: project,
  })
})

// @desc    Add a new project
// @route   POST /api/project/
const addProject = asyncHandler(async (req, res) => {
  const body = req.body
  const check = keysNotFound(body, ['name'])
  if (check.result) {
    res.status(400)
    throw new Error(check.message)
  }
  if (!(body.name)) {
    res.status(400)
    throw new Error('A required field is empty.')
  }

  const newProject = await Project.create(body)
  if (newProject) {
    res.json({
      message: 'Add a new project.',
      project: newProject,
    })
  }
  else {
    res.status(400)
    throw new Error('Fail to add this project.')
  }
})

// @desc    Update a project
// @route   PUT /api/project/:id
const updateProject = asyncHandler(async (req, res) => {
  const params = req.params
  const body = req.body
  const check = [keysNotFound(params, ['id']), keysNotFound(body, ['name'])]
  for (let i = 0; i < check.length; i++) {
    if (check[i].result) {
      res.status(400)
      throw new Error(check[i].message)
    }
  }
  if (!(params.id && body.name)) {
    res.status(400)
    throw new Error('A required field is empty.')
  }

  const project = await Project.findById(params.id)
  if (!project) {
    res.status(400)
    throw new Error('Project not found.')
  }

  const updatedProject = await Project.findByIdAndUpdate(
    params.id,
    body,
  )

  if (updatedProject) {
    res.json({
      message: 'Update the project with id:' + params.id + '.',
      project: body,
    })
  }
  else {
    res.status(400)
    throw new Error('Fail to update project.')
  }
})

// @desc    Delete a project
// @route   DELETE /api/project/:id
const deleteProject = asyncHandler(async (req, res) => {
  const params = req.params
  const check = keysNotFound(params, ['id'])
  if (check.result) {
    res.status(400)
    throw new Error(check.message)
  }
  if (!(params.id)) {
    res.status(400)
    throw new Error('A required field is empty.')
  }

  const project = await Project.findById(params.id)
  if (!project) {
    res.status(400)
    throw new Error('Project is not found.')
  }

  const deletedProject = await Project.findByIdAndRemove(params.id)
  if (deletedProject) {
    res.json({
      message: 'Delete the project with id:' + params.id + '.',
      project: deletedProject,
    })
  }
  else {
    res.status(400)
    throw new Error('Fail to delete project.')
  }
})

module.exports = {
  getAllProjects,
  getProject,
  addProject,
  deleteProject,
  updateProject,
  getAllProjectsByUserId,
}

