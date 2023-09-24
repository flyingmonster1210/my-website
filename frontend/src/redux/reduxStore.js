import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userStore/userSlice'
import projectsSlice from './projectsStore/projectsSlice'

import axios from 'axios'

axios.interceptors.response.use(
  response => {
    return response
  },
  async (error) => {
    const { config } = error

    // Retry request 3 times
    if (config && config.retryTimes) {
      config.retryTimes -= 1
    }
    else if (!('retryTimes' in config)) {
      config.retryTimes = 2
    }
    else {
      return Promise.reject(error)
    }

    const delayRetryRequest = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Retrying the request: ', config.url, ', Times =', (3 - config.retryTimes) + '.')
          resolve()
        }, 1000)
      })
    }

    try {
      await delayRetryRequest()
      return await axios(config)
    } catch (err) {
      return err
    }
  }
)

export const reduxStore = configureStore({
  reducer: {
    user: userSlice,
    projects: projectsSlice,
  },
})
