const asyncHandler = require('express-async-handler')
const Project = require('../models/projectModel')

const { isEmpty } = require('../tools')

// @desc    Show all the projects
// @route   GET /api/project/
const getAllProjects = asyncHandler(async (req, res) => {
  const allProjects = await Project.find()

  res.json({
    allProjects: allProjects
  })
})

// @desc    Add a new project
// @route   POST /api/project/
const addProject = asyncHandler(async (req, res) => {
  if (isEmpty(req.body, ['name', 'technology'])) {
    res.status(400)
    throw new Error('The request body is empty, or it does not contain the required field.')
  }

  const { name, technology, time, introduction, description, URL } = req.body
  const newProject = await Project.create({
    name: name,
    technology: technology,
    time: time,
    introduction: introduction,
    description: description,
    URL: URL,
  })

  res.json({
    newProject: newProject
  })
})

// @desc    Update a project
// @route   PUT /api/project/:id
const updateProject = asyncHandler(async (req, res) => {
  res.json({
    message: 'update a project',
  })
})

// @desc    Delete a project
// @route   DELETE /api/project/:id
const deleteProject = asyncHandler(async (req, res) => {
  res.json({
    message: 'delete a project',
  })
})

module.exports = {
  getAllProjects,
  addProject,
  deleteProject,
  updateProject,
}

