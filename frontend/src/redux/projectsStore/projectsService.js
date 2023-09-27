import axios from "axios"

const API_URL = '/api/project/'
// const LOCAL_STORAGE_KEY = 'projects'

// Get all the default projects
const loadDefaultProjectList = async () => {
  const { data } = await axios.get(API_URL)

  return (data && data.project) ? data.project : data
}

const getAllProjectsWithUserId = async (userId) => {
  const { data } = await axios.get(API_URL + 'projectsOfUser/' + userId)

  return (data && data.project) ? data.project : data
}

// Get a project by id
const getProject = async (id, token) => {
  const config = { headers: { authorization: `Bearer ${token}` } }
  const { data } = await axios.get(API_URL + id, config)

  return (data && data.project) ? data.project : data
}

// Add a project
const addProject = async (projectData, token) => {
  const config = { headers: { authorization: `Bearer ${token}` } }
  const { data } = await axios.post(API_URL, projectData, config)

  return (data && data.project) ? data.project : data
}

// Delete a project
const deleteProject = async (id, token) => {
  const config = { headers: { authorization: `Bearer ${token}` } }
  const { data } = await axios.delete(API_URL + id, config)

  return (data && data.project) ? data.project : data
}

// Update a project
const updateProject = async (id, projectData, token) => {
  const config = { headers: { authorization: `Bearer ${token}` } }
  const { data } = await axios.put(API_URL + id, projectData, config)

  return (data && data.project) ? data.project : data
}

const projectsService = {
  loadDefaultProjectList,
  getProject,
  addProject,
  deleteProject,
  updateProject,
  getAllProjectsWithUserId,
}

export default projectsService
