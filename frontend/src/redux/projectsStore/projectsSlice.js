import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  projects: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state = initialState
    }
  }
})

export const { reset } = projectsSlice.actions
export default projectsSlice.reducer
