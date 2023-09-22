import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import Spinner from './components/Spinner'
import LandingPage from './pages/landingPage/LandingPage'
import ProjectsPage from './pages/projectsPage/ProjectsPage'
import UserPage from './pages/userPage/UserPage'
import { loadAndSetDefaultUserInfo, reset } from './redux/userStore/userSlice'

function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadAndSetDefaultUserInfo())

    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  const { isPending } = useSelector((state) => state.user)

  return (
    <>
      <Router>
        <div className='flex flex-col justify-between min-h-screen overflow-hidden bg-yellow-50'>
          <Header />
          {isPending ? <Spinner /> :
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/projects' element={<ProjectsPage />} />
              <Route path='/user' element={<UserPage />} />
            </Routes>
          }
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
