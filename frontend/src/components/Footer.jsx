import telephone from '../assets/telephone.png'
import email from '../assets/email.png'
import linkedin from '../assets/linkedin.png'
import github from '../assets/github.png'

function Footer() {
  return (
    <div className="flex flex-col  bg-yellow-50 px-12 py-3 font-poppins justify-center items-center mb-2 md:flex-row md:justify-between">
      <div className="flex flex-row items-center space-x-1">
        <img src={telephone} alt="telephone" className="max-h-[16px]" />
        <p>778-522-0441</p>
      </div>

      <div className="flex flex-row items-center space-x-1">
        <img src={email} alt="telephone" className="max-h-[16px]" />
        <a className=" break-all" href="waynezeng1210@gmail.com">
          <span>waynezeng1210@gmail.com</span>
        </a>
      </div>

      <div className="flex flex-row space-x-2 ">
        <div className="flex flex-row items-center space-x-1">
          <img src={linkedin} alt="telephone" className="max-h-[16px]" />
          <a
            href="https://www.linkedin.com/in/weijie-zeng-18b31b212/"
            target="_blank"
          >
            LinkedIn
          </a>
        </div>
        <div className="flex flex-row items-center space-x-1">
          <img src={github} alt="telephone" className="max-h-[16px]" />
          <a href="" target="_blank">
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
