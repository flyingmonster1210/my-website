const asyncHandler = require('express-async-handler')
const Project = require('../models/projectModel')

const { isEmpty } = require('../tools')

// @desc    Show all the projects
// @route   GET /api/project/
const getAllProjects = asyncHandler(async (req, res) => {
  const allProjects = await Project.find()

  res.json({
    message: 'Get all projects.',
    allProjects: allProjects,
  })
})

// @desc    Search the project with the project id
// @route   GET /api/project/:id
const getProject = asyncHandler(async (req, res) => {
  const params = req.params
  const check = isEmpty(params, ['id'])
  if (check.result) {
    res.status(400)
    throw new Error(check.message)
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
  const check = isEmpty(req.body, ['name'])
  if (check.result) {
    res.status(400)
    throw new Error(check.message)
  }

  const newProject = await Project.create(req.body)

  res.json({
    message: 'Add a new project.',
    newProject: newProject,
  })
})

// @desc    Update a project
// @route   PUT /api/project/:id
const updateProject = asyncHandler(async (req, res) => {
  const check = [isEmpty(req.params, ['id']), isEmpty(req.body, ['name'])]
  for (let i = 0; i < check.length; i++) {
    if (check[i].result) {
      res.status(400)
      throw new Error(check[i].message)
    }
  }

  const project = await Project.findById(req.params.id)
  if (!project) {
    res.status(400)
    throw new Error('Project not found.')
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
  )

  res.json({
    message: 'Update the project with id:' + req.params.id + '.',
    updatedProject: updatedProject,
  })
})

// @desc    Delete a project
// @route   DELETE /api/project/:id
const deleteProject = asyncHandler(async (req, res) => {
  const check = isEmpty(req.params, ['id'])
  if (check.result) {
    res.status(400)
    throw new Error(check.message)
  }

  const project = await Project.findById(req.params.id)
  if (!project) {
    res.status(400)
    throw new Error('Project is not found.')
  }

  const deletedProject = await Project.findByIdAndRemove(req.params.id)
  res.json({
    message: 'Delete the project with id:' + req.params.id + '.',
    deletedProject: deletedProject,
  })
})

module.exports = {
  getAllProjects,
  getProject,
  addProject,
  deleteProject,
  updateProject,
}

