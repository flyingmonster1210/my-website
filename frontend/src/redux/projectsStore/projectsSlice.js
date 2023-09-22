import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import projectsService from "./projectsService"


const initialState = {
  isError: false,
  isSuccess: false,
  isPending: false,
  projects: null,
  errorMessage: '',
}

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
  }
})

export const { projectReset } = projectsSlice.actions
export default projectsSlice.reducer
