import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './pages/landingPage/LandingPage'
import ProjectsPage from './pages/projectsPage/ProjectsPage'
import UserPage from './pages/userPage/UserPage'
import { loadAndSetDefaultUserInfo, userReset } from './redux/userStore/userSlice'
import { loadDefaultProjectList, projectReset } from './redux/projectsStore/projectsSlice'
import Login from './pages/loginPage/Login'


function App () {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(loadAndSetDefaultUserInfo())
  //   dispatch(loadDefaultProjectList())

  //   return () => {
  //     dispatch(userReset())
  //     dispatch(projectReset())
  //   }
  // }, [])

  return (
    <>
      <Router>
        <div className='flex flex-col justify-between min-h-screen overflow-hidden bg-yellow-50'>
          <Header />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/projects' element={<ProjectsPage />} />
            <Route path='/user' element={<UserPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
