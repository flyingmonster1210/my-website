import avatar from '../../assets/avatar.jpg'
import star from '../../assets/pointed-star.png'
import telephone from '../../assets/telephone.png'
import email from '../../assets/email.png'
import linkedin from '../../assets/linkedin.png'
import github from '../../assets/github.png'

function LandingPage() {
  return (
    <div
      id="landing-page"
      className="flex flex-col items-center bg-yellow-50 px-12 py-3 font-poppins"
    >
      <div
        id="section1"
        className="flex flex-col h-[50%] w-[90%] items-center justify-center p-5 md:p-10 xl:p-20 md:flex-row md:mt-14"
      >
        <div
          id="left"
          className="flex flex-col w-full items-start justify-center  md:w-[50%]"
        >
          <p className=" font-black text-[80px] mt-2 w-full text-center md:text-start xs:text-[40px]">
            TITLE
          </p>
          <div className="flex flex-col mt-4 text-start text-[16px] md:mt-8">
            <p>
              John is a dedicated and experienced software engineer with a
              passion for solving complex technical challenges. He holds a
              bachelor's degree in Computer Science and has been working in the
              software development field for over 10 years.
            </p>
            <a
              href=""
              className="mt-1 underline font-semibold text-center text-[18px] md:text-start"
            >
              *ABOUT ME
            </a>
          </div>
        </div>

        <div
          id="right"
          className="flex items-center justify-center max-w-full mt-10 md:mt-0 md:max-w-[50%]"
        >
          <img
            src={avatar}
            alt="avatar"
            className="rounded-full border-gray-100 border-2 w-[50%] h-[50%] md:w-[70%] md:h-[70%]"
          />
        </div>
      </div>

      <div
        id="section2"
        className="grid grid-cols-1 gap-3 w-[90%] mt-10 justify-between items-center sm:grid-cols-2 sm:items-start md:mt-14"
      >
        <div id="experience">
          <div
            id="title"
            className="flex flex-row text-[18px] font-semibold items-center"
          >
            <img src={star} alt="star" className="max-h-[18px]" />
            <p>Eperience</p>
          </div>

          <div className="flex flex-col text-[16px] mx-4 mt-4">
            <div id="project1">
              <p className=" underline underline-offset-4">Project1's Name</p>
              <p>Description</p>
            </div>
          </div>

          <div className="flex flex-col text-[16px] mx-4 mt-4">
            <div id="project2">
              <p className=" underline underline-offset-4">Project's Name</p>
              <p>Description</p>
            </div>
          </div>
        </div>

        <div id="connect">
          <div
            id="title"
            className="flex flex-row text-[18px] font-semibold items-center"
          >
            <img src={star} alt="star" className="max-h-[18px]" />
            <p>Connect</p>
          </div>

          <div className="flex flex-col text-[16px] m-4 space-y-2">
            <div className="flex flex-row items-center space-x-1">
              <img src={telephone} alt="telephone" className="max-h-[16px]" />
              <p className=" border-b  border-black">778-522-0441</p>
            </div>
            <div className="flex flex-row items-center space-x-1">
              <img src={email} alt="telephone" className="max-h-[16px]" />
              <a className=" break-all" href="waynezeng1210@gmail.com">
                <span className="border-b  border-black">
                  waynezeng1210@gmail.com
                </span>
              </a>
            </div>
            <div className="flex flex-row items-center space-x-1">
              <img src={linkedin} alt="telephone" className="max-h-[16px]" />
              <a
                className=" border-b  border-black"
                href="https://www.linkedin.com/in/weijie-zeng-18b31b212/"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
            <div className="flex flex-row items-center space-x-1">
              <img src={github} alt="telephone" className="max-h-[16px]" />
              <a className="border-b  border-black" href="" target="_blank">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
