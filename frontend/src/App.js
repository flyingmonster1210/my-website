import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './pages/landingPage/LandingPage'
import ProjectsPage from './pages/projectsPage/ProjectsPage'
import UserPage from './pages/userPage/UserPage'

function App () {
  return (
    <>
      <Router>
        <div className='flex flex-col justify-between min-h-screen overflow-hidden bg-yellow-50'>
          <Header />
          <Routes>
            <Route path='/' element={<LandingPage />} />
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
