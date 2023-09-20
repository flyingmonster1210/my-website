import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userStore/userSlice'
import projectsSlice from './projectsStore/projectsSlice'


export const reduxStore = configureStore({
  reducer: {
    user: userSlice,
    projects: projectsSlice,
  },
})
