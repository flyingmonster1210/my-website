const asyncHandler = require('express-async-handler')

// @desc    Show all the projects
// @route   GET /api/project/
const getProjects = asyncHandler(async (req, res) => {
  res.json({
    message: 'get all projects',
  })
})

// @desc    Add a new project
// @route   POST /api/project/
const addProject = asyncHandler(async (req, res) => {
  res.json({
    message: 'add a new project',
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
  getProjects,
  addProject,
  deleteProject,
  updateProject,
}

