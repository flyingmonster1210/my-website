import { createSlice } from "@reduxjs/toolkit"

const loginUser = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: loginUser ? loginUser : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state = {
        ...initialState,
        user: state.user,
      }
    }
  }
})

export const { reset } = userSlice.actions
export default userSlice.reducer
