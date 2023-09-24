import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import userService from "./userService"

const loginUser = JSON.parse(localStorage.getItem('user'))

const initialState = {
  isError: false,
  isSuccess: false,
  isPending: false,
  user: loginUser ? loginUser : null,
  errorMessage: '',
}

export const register = createAsyncThunk('user/register', async (userData, thunkAPI) => {
  try {
    return await userService.register(userData)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const login = createAsyncThunk('user/login', async (userData, thunkAPI) => {
  try {
    return await userService.login(userData)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// userDataWithId = { id: xxx, userData: {xxx} }
export const update = createAsyncThunk('user/update', async (userDataWithId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token
    const { id, userData } = userDataWithId
    return await userService.update(id, userData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    return await userService.logout()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getUserById = createAsyncThunk('user/getUserById', async (userId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token
    return await userService.getUserById(userId, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const loadAndSetDefaultUserInfo = createAsyncThunk('user/loadAndSetDefaultUserInfo', async (userData, thunkAPI) => {
  try {
    return await userService.loadAndSetDefaultUserInfo()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    userReset: (state) => {
      state = {
        ...initialState,
        user: state.user,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.isError = false
        state.isSuccess = false
        state.isPending = true
        state.errorMessage = ''
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isError = false
        state.isSuccess = true
        state.isPending = false
        state.user = action.payload
        state.errorMessage = ''
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.isPending = false
        state.errorMessage = action.payload
      })
      // login
      .addCase(login.pending, (state) => {
        state.isError = false
        state.isSuccess = false
        state.isPending = true
        state.errorMessage = ''
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false
        state.isSuccess = true
        state.isPending = false
        state.user = action.payload
        state.errorMessage = ''
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.isPending = false
        state.errorMessage = action.payload
      })
      // update
      .addCase(update.pending, (state) => {
        state.isError = false
        state.isSuccess = false
        state.isPending = true
        state.errorMessage = ''
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isError = false
        state.isSuccess = true
        state.isPending = false
        state.user = action.payload
        state.errorMessage = ''
      })
      .addCase(update.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.isPending = false
        state.errorMessage = action.payload
      })
      // logout
      .addCase(logout.pending, (state) => {
        state.isError = false
        state.isSuccess = false
        state.isPending = true
        state.errorMessage = ''
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isError = false
        state.isSuccess = true
        state.isPending = false
        state.user = action.payload
        state.errorMessage = ''
      })
      .addCase(logout.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.isPending = false
        state.errorMessage = action.payload
      })
      // getUserById
      .addCase(getUserById.pending, (state) => {
        state.isError = false
        state.isSuccess = false
        state.isPending = true
        state.errorMessage = ''
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isError = false
        state.isSuccess = true
        state.isPending = false
        state.user = action.payload
        state.errorMessage = ''
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.isPending = false
        state.errorMessage = action.payload
      })
      // loadAndSetDefaultUserInfo
      .addCase(loadAndSetDefaultUserInfo.pending, (state) => {
        state.isError = false
        state.isSuccess = false
        state.isPending = true
        state.errorMessage = ''
      })
      .addCase(loadAndSetDefaultUserInfo.fulfilled, (state, action) => {
        state.isError = false
        state.isSuccess = true
        state.isPending = false
        state.user = action.payload
        state.errorMessage = ''
      })
      .addCase(loadAndSetDefaultUserInfo.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.isPending = false
        state.errorMessage = action.payload
      })
  },
})

export const { userReset } = userSlice.actions
export default userSlice.reducer
