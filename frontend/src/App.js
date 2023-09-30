import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import ProjectsListPage from './pages/projectsListPage/ProjectsListPage'
import UserPage from './pages/userPage/UserPage'
import LoginPage from './pages/loginPage/LoginPage'
import ProjectPage from './pages/projectPage/ProjectPage'
import ProjectDetails from './pages/projectDetails/ProjectDetails'
import LandingPage from './pages/landingPage/LandingPage'


function App () {
  return (
    <Router>
      <div className='flex flex-col justify-between min-h-screen overflow-hidden bg-yellow-50'>
        <Header />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/projects' element={<ProjectsListPage />} />
          <Route path='project/description/:id' element={<ProjectDetails />} />
          <Route path='project' element={<ProjectPage />} />
          <Route path='project/:id' element={<ProjectPage />} />
          <Route path='/user' element={<UserPage />} />
          <Route path='/register' element={<UserPage />} />
          <Route path='/' element={<LandingPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
