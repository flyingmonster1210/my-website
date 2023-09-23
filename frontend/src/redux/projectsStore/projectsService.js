import axios from "axios"

const API_URL = '/api/project/'
// const LOCAL_STORAGE_KEY = 'projects'

// Get all the default projects
const loadDefaultProjectList = async () => {
  const { data } = await axios.get(API_URL)

  return (data && data.project) ? data.project : data
}

// TODO: Get all projects by userId
// const getAllProjects = async () => {

// }

// Get a project by id
const getProject = async (id) => {
  const { data } = await axios.get(API_URL + id)

  return (data && data.project) ? data.project : data
}

// Add a project
const addProject = async (projectData) => {
  const { data } = await axios.post(API_URL, projectData)

  return (data && data.project) ? data.project : data
}

// Delete a project
// TODO: After delete, update projects list in localStorage
const deleteProject = async (id) => {
  const { data } = await axios.delete(API_URL + id)

  return (data && data.project) ? data.project : data
}

// Update a project
const updateProject = async (id, projectData) => {
  const { data } = await axios.put(API_URL + id, projectData)

  return (data && data.project) ? data.project : data
}

const projectsService = {
  loadDefaultProjectList,
  getProject,
  addProject,
  deleteProject,
  updateProject,
}

export default projectsService