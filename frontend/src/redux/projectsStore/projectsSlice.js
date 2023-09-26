import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import projectsService from "./projectsService"


const initialState = {
  isError: false,
  isSuccess: false,
  isPending: false,
  projects: null,
  errorMessage: '',
}

export const deleteProject = createAsyncThunk('project/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token
    return await projectsService.deleteProject(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getAllProjectsWithUserId = createAsyncThunk('project/loadProjectsWithUserId', async (userId, thunkAPI) => {
  try {
    return await projectsService.getAllProjectsWithUserId(userId)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const loadDefaultProjectList = createAsyncThunk('project/loadDefaultProjectList', async (_, thunkAPI) => {
  try {
    return await projectsService.loadDefaultProjectList()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialState,
  reducers: {
    projectReset: (state) => {
      state = {
        ...initialState,
        projects: state.projects,
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // loadDefaultProjectList
      .addCase(loadDefaultProjectList.pending, (state) => {
        state.isError = false
        state.isSuccess = false
        state.isPending = true
        state.errorMessage = ''
      })
      .addCase(loadDefaultProjectList.fulfilled, (state, action) => {
        state.isError = false
        state.isSuccess = true
        state.isPending = false
        state.projects = action.payload
        state.errorMessage = ''
      })
      .addCase(loadDefaultProjectList.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.isPending = false
        state.errorMessage = action.payload
      })
      // getAllProjectsWithUserId
      .addCase(getAllProjectsWithUserId.pending, (state) => {
        state.isError = false
        state.isSuccess = false
        state.isPending = true
        state.errorMessage = ''
      })
      .addCase(getAllProjectsWithUserId.fulfilled, (state, action) => {
        state.isError = false
        state.isSuccess = true
        state.isPending = false
        state.projects = action.payload
        state.errorMessage = ''
      })
      .addCase(getAllProjectsWithUserId.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.isPending = false
        state.errorMessage = action.payload
      })
      // deleteProject
      .addCase(deleteProject.pending, (state) => {
        state.isError = false
        state.isSuccess = false
        state.isPending = true
        state.errorMessage = ''
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isError = false
        state.isSuccess = true
        state.isPending = false
        state.projects = (state.projects).filter((project) => (project._id !== action.payload._id))
        state.errorMessage = ''
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.isPending = false
        state.errorMessage = action.payload
      })
  }
})

export const { projectReset } = projectsSlice.actions
export default projectsSlice.reducer
