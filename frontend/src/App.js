import React from 'react'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage/LandingPage'

function App () {
  return (
    <div className='flex flex-col justify-between min-h-screen overflow-hidden bg-yellow-50'>
      <LandingPage />
      <Footer />
    </div>
  )
}

export default App
