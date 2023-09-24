import axios from 'axios'

const API_URL = '/api/user/'
const LOCAL_STORAGE_KEY = 'user'

// User register
const register = async (userData) => {
  const { data } = await axios.post(API_URL + 'register/', userData)

  if (data && data.user) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.user))
  }

  return (data && data.user) ? data.user : data
}

// User login
const login = async (userData) => {
  const { data } = await axios.post(API_URL + 'login/', userData)

  if (data && data.user) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.user))
  }

  return (data && data.user) ? data.user : data
}

// User logout
const logout = async () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY)
  return await loadAndSetDefaultUserInfo()
}

// User update profile
const update = async (userId, userData, token) => {
  const config = { headers: { authorization: `Bearer ${token}` } }
  const { data } = await axios.put(API_URL + 'update/' + userId, userData, config)

  if (data && data.user) {
    console.log('set user to local: ', data.user)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.user))
  }

  return (data && data.user) ? data.user : data
}

// Get and set the default user info into the localStorage
const loadAndSetDefaultUserInfo = async () => {
  const { data } = await axios.get(API_URL + 'me/')

  if (data && data.user) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.user))
  }

  return (data && data.user) ? data.user : data
}

const getUserById = async (userId, token) => {
  const config = { headers: { authorization: `Bearer ${token}` } }
  const { data } = await axios.get(API_URL + '/get/' + userId, config)

  if (data && data.user) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.user))
  }

  return (data && data.user) ? data.user : data
}

// Get default user profile
const getMe = async () => {
  const { data } = await axios.get(API_URL + 'me/')
  return (data && data.user) ? data.user : data
}

const userService = {
  register,
  login,
  logout,
  update,
  getMe,
  getUserById,
  loadAndSetDefaultUserInfo,
}

export default userService
