import avatar from '../../assets/avatar.jpg'
import star from '../../assets/pointed-star.png'
import telephone from '../../assets/telephone.png'
import email from '../../assets/email.png'
import linkedin from '../../assets/linkedin.png'
import github from '../../assets/github.png'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Spinner from '../../components/Spinner'
import { loadAndSetDefaultUserInfo } from '../../redux/userStore/userSlice'
import { loadDefaultProjectList } from '../../redux/projectsStore/projectsSlice'

function LandingPage() {
  const dispatch = useDispatch()

  let userStore = useSelector((state) => state.user)
  let user = userStore.user
  let projectsStore = useSelector((state) => state.projects)
  let projects = projectsStore.projects

  useEffect(() => {
    dispatch(loadAndSetDefaultUserInfo())
    dispatch(loadDefaultProjectList())
  }, [])

  const isPending = projectsStore.isPending || userStore.isPending
  if (isPending) {
    return <Spinner />
  }

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
            <p>{user.introduction}</p>
            {/* TODO: Change the link to ABOUTME */}
            <a
              href={user.linkedin}
              className="mt-1 underline font-semibold text-center text-[18px] md:text-start hover:text-gray-500"
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
        className="grid grid-cols-1 gap-3 w-[90%] my-5 justify-between items-center sm:grid-cols-2 sm:items-start md:my-8"
      >
        <div id="experience">
          <div
            id="title"
            className="flex flex-row text-[18px] font-semibold items-center"
          >
            <img src={star} alt="star" className="max-h-[18px]" />
            <p>Eperience</p>
          </div>

          {projects ? (
            projects.map((project, index) => (
              <div
                key={'project' + index}
                className="flex flex-col text-[16px] mx-4 mt-2"
              >
                <p className=" underline underline-offset-4">{project.name}</p>
                <p>{project.description}</p>
              </div>
            ))
          ) : (
            <></>
          )}
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
              <p className=" border-b  border-black">{user.phone}</p>
            </div>
            <div className="flex flex-row items-center space-x-1">
              <img src={email} alt="telephone" className="max-h-[16px]" />
              <span className="border-b  border-black break-all">
                {user.email}
              </span>
            </div>
            <div className="flex flex-row items-center space-x-1">
              <img src={linkedin} alt="telephone" className="max-h-[16px]" />
              <a
                className=" border-b  border-black hover:text-gray-500"
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
                className="border-b  border-black hover:text-gray-500"
                href={user.github}
                target="_blank"
                rel="noopener noreferrer"
              >
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
