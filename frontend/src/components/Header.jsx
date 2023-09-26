import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../redux/userStore/userSlice'
import { useEffect, useState } from 'react'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const url = useLocation().pathname
  const { user } = useSelector((state) => state.user)
  const token = user ? user.token : user

  const [hide, setHide] = useState(true)
  useEffect(() => {
    setHide(true)
  }, [url])

  const registerBtn = (
    <button
      className="hover:text-gray-500"
      onClick={() => {
        navigate('/register')
      }}
    >
      Register
    </button>
  )
  const loginBtn = (
    <button
      className="hover:text-gray-500"
      onClick={() => {
        navigate('/login')
      }}
    >
      Login
    </button>
  )
  const logoutBtn = (
    <button
      className="hover:text-gray-500 hover:underline"
      onClick={async () => {
        try {
          await dispatch(logout()).unwrap()
          navigate('/')
        } catch (error) {
          console.error(error)
        }
      }}
    >
      Logout
    </button>
  )
  const profileBtn = (
    <button
      className="hover:text-gray-500 hover:underline"
      onClick={async () => {
        try {
          navigate('/user/')
        } catch (error) {
          console.error(error)
        }
      }}
    >
      Profile
    </button>
  )
  const projectsBtn = (
    <button
      className="hover:text-gray-500 hover:underline"
      onClick={async () => {
        try {
          navigate('/projects/')
        } catch (error) {
          console.error(error)
        }
      }}
    >
      Projects
    </button>
  )

  const rightBtn = () => {
    if (token) {
      return (
        <div
          id="right-button"
          className="relative"
          onMouseEnter={() => setHide(false)}
          onMouseLeave={() => setHide(true)}
        >
          <button className="hover:text-gray-500">
            Hello, {user.username}!
          </button>
          {hide ? null : (
            <div className="absolute right-0 flex flex-col z-1 font-normal items-end sbuttonace-y-1">
              {profileBtn}
              {projectsBtn}
              {logoutBtn}
            </div>
          )}
        </div>
      )
    } else if (url.includes('login')) {
      return registerBtn
    } else {
      return loginBtn
    }
  }

  return (
    <div
      id="header"
      className="flex flex-row justify-between items-center bg-yellow-50 px-12 py-3 font-poppins text-[14px] font-semibold md:text-[18px]"
    >
      <div id="left-button">
        <button
          className="hover:text-gray-500"
          onClick={() => {
            navigate('/')
          }}
        >
          Home
        </button>
      </div>
      {rightBtn()}
    </div>
  )
}

export default Header
