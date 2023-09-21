import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import userService from "./userService"

// TODO: Handle the localStorage(user) with token/id
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
    const { id, userData } = userDataWithId
    return await userService.update(id, userData)
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

export const loadAndSetDefaultUserInfo = createAsyncThunk('user/loadAndSetDefaultUserInfo', async (userData, thunkAPI) => {
  try {
    return await userService.loadAndSetDefaultUserInfo(userData)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    reset: (state) => {
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
        state = {
          ...initialState,
          isPending: true,
          user: state.user,
        }
      })
      .addCase(register.fulfilled, (state, action) => {
        state = {
          ...initialState,
          isSuccess: true,
          user: action.payload,
        }
      })
      .addCase(register.rejected, (state, action) => {
        state = {
          ...initialState,
          isError: true,
          user: state.user,
          errorMessage: action.payload,
        }
      })
      // login
      .addCase(login.pending, (state) => {
        state = {
          ...initialState,
          isPending: true,
          user: state.user,
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        state = {
          ...initialState,
          isSuccess: true,
          user: action.payload,
        }
      })
      .addCase(login.rejected, (state, action) => {
        state = {
          ...initialState,
          isError: true,
          user: state.user,
          errorMessage: action.payload,
        }
      })
      // update
      .addCase(login.pending, (state) => {
        state = {
          ...initialState,
          isPending: true,
          user: state.user,
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        state = {
          ...initialState,
          isSuccess: true,
          user: action.payload,
        }
      })
      .addCase(login.rejected, (state, action) => {
        state = {
          ...initialState,
          isError: true,
          user: state.user,
          errorMessage: action.payload,
        }
      })
      // logout
      .addCase(logout.pending, (state) => {
        state = {
          ...initialState,
          isPending: true,
          user: state.user,
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        state = {
          // TODO: Once the user logout, it should load the default user info
          ...initialState,
          isSuccess: true,
          user: null,
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state = {
          ...initialState,
          isError: true,
          user: state.user,
          errorMessage: action.payload,
        }
      })
      // loadAndSetDefaultUserInfo
      .addCase(loadAndSetDefaultUserInfo.pending, (state) => {
        state = {
          ...initialState,
          isPending: true,
          user: state.user,
        }
      })
      .addCase(loadAndSetDefaultUserInfo.fulfilled, (state, action) => {
        state = {
          ...initialState,
          isSuccess: true,
          user: action.payload,
        }
      })
      .addCase(loadAndSetDefaultUserInfo.rejected, (state, action) => {
        state = {
          ...initialState,
          isError: true,
          user: state.user,
          errorMessage: action.payload,
        }
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer
