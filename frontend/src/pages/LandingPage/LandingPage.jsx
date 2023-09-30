import avatar from '../../assets/avatar.jpg'
import star from '../../assets/pointed-star.png'
import telephone from '../../assets/telephone.png'
import email from '../../assets/email.png'
import linkedin from '../../assets/linkedin.png'
import github from '../../assets/github.png'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Spinner from '../../components/Spinner'
import {
  loadAndSetDefaultUserInfo,
  userReset,
} from '../../redux/userStore/userSlice'
import {
  loadDefaultProjectList,
  projectReset,
} from '../../redux/projectsStore/projectsSlice'
import NewlineText from '../../components/NewLineText'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  let userStore = useSelector((state) => state.user)
  let user = userStore.user
  let projectsStore = useSelector((state) => state.projects)
  let projects = projectsStore.projects

  useEffect(() => {
    if (!userStore || !user || !projectsStore || !projects) {
      dispatch(loadAndSetDefaultUserInfo())
      dispatch(loadDefaultProjectList())
    }
    return () => {
      dispatch(userReset())
      dispatch(projectReset())
    }
  }, [dispatch, user])

  const isPending = projectsStore.isPending || userStore.isPending
  if (isPending) {
    return <Spinner />
  }

  user = user
    ? user
    : {
        email: 'waynezeng1210@gmail.com',
        github: 'https://github.com/flyingmonster1210',
        linkedin: 'https://www.linkedin.com/in/weijie-zeng-18b31b212/',
        phone: '778-522-0441',
      }

  return (
    <div
      id="landing-page"
      className="flex flex-col items-center bg-yellow-50 px-12 py-3 font-poppins"
    >
      <div
        id="section1"
        className="flex flex-col w-[90%] items-center justify-center  md:flex-row"
      >
        <div
          id="left"
          className="flex flex-col w-full items-start justify-center  md:w-[50%]"
        >
          <p className="font-black text-[60px] w-full text-center my-auto md:text-start xs:text-[30px]">
            Welcome!
          </p>
          <p>
            My name is Weijie Zeng, and I recently graduated with a bachelor's
            degree in Computer Science from SFU, and the following is my brief
            summary:
          </p>
          <div className="flex flex-col mt-4 text-start text-[16px] md:mt-8">
            <NewlineText text={user.introduction} />
            {/* TODO: Change the link to ABOUTME */}
            <a
              href={user.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 underline font-semibold text-center text-[18px] md:text-start hover:text-gray-500"
            >
              *RESUME
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
            className="rounded-full border-gray-100 border-2 w-[60%] h-[60%] md:w-[80%] md:h-[80%]"
          />
        </div>
      </div>

      <div
        id="section2"
        className="grid grid-cols-1 gap-3 w-[90%] my-5 items-center md:grid-cols-2 md:items-start md:my-8"
      >
        <div id="experience">
          <div
            id="title"
            className="flex flex-row text-[20px] font-semibold items-center"
          >
            <img src={star} alt="star" className="max-h-[18px]" />
            <p>Eperience</p>
          </div>

          {projects && projects.length > 0
            ? projects.map((project, index) => (
                <div
                  onClick={() => navigate('project/description/' + index)}
                  key={'project' + index}
                  className="flex flex-col text-[16px] mx-4 mt-2 hover:cursor-pointer"
                >
                  <div className="flex flex-row w-full justify-between border-gray-400 border-b-2">
                    <p className=" font-semibold">{project.name}</p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={project.URL}
                      className="text-blue-400 italic align-text-bottom text-xs hover:text-gray-400 hover:cursor-pointer"
                    >
                      GO TO
                    </a>
                  </div>
                  <NewlineText text={project.introduction} />
                </div>
              ))
            : 'Empty'}
        </div>

        <div id="contact">
          <div
            id="title"
            className="flex flex-row text-[20px] font-semibold items-center"
          >
            <img src={star} alt="star" className="max-h-[18px]" />
            <p>Contact</p>
          </div>

          <div className="flex flex-col text-[16px] m-4 space-y-2">
            <div className="flex flex-row items-center space-x-1">
              <img src={telephone} alt="telephone" className="max-h-[16px]" />
              <p className=" border-b  border-black">{user.phone}</p>
            </div>
            <div className="flex flex-row items-center space-x-1">
              <img src={email} alt="telephone" className="max-h-[16px]" />
              <a
                href={'mailto:' + user.email}
                className="border-b border-black break-all hover:text-gray-500"
              >
                {user.email}
              </a>
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
