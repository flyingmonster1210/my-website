import telephone from '../assets/telephone.png'
import email from '../assets/email.png'
import linkedin from '../assets/linkedin.png'
import github from '../assets/github.png'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function Footer() {
  let { user } = useSelector((state) => state.user)
  user = user
    ? user
    : {
        email: 'waynezeng1210@gmail.com',
        github: 'https://github.com/flyingmonster1210',
        linkedin: 'https://www.linkedin.com/in/weijie-zeng-18b31b212/',
        phone: '778-522-0441',
      }

  return (
    <div className="flex flex-col  bg-yellow-50 px-12 py-3 font-poppins justify-center items-center mb-2 md:flex-row md:justify-between">
      <div className="flex flex-row items-center space-x-1">
        <img src={telephone} alt="telephone" className="max-h-[16px]" />
        <p>{user.phone}</p>
      </div>

      <div className="flex flex-row items-center space-x-1">
        <img src={email} alt="telephone" className="max-h-[16px]" />
        <span className="break-all">{user.email}</span>
      </div>

      <div className="flex flex-row space-x-2 ">
        <div className="flex flex-row items-center space-x-1">
          <img src={linkedin} alt="telephone" className="max-h-[16px]" />
          <a
            className="hover:text-gray-500"
            href={user.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <div className="flex flex-row items-center space-x-1">
          <img src={github} alt="telephone" className="max-h-[16px]" />
          <a
            className="hover:text-gray-500"
            href={user.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
