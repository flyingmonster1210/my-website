import { useDispatch, useSelector } from 'react-redux'
import avatar from '../../assets/avatar.jpg'
import { useEffect, useState } from 'react'
import Spinner from '../../components/Spinner'
import { useLocation, useNavigate } from 'react-router-dom'
import { register, update, userReset } from '../../redux/userStore/userSlice'

const UserPage = () => {
  const url = useLocation().pathname
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userStore = useSelector((state) => state.user)
  const projectsStore = useSelector((state) => state.projects)
  const user = userStore.user

  const [isRegistering, setIsRegistering] = useState(false)
  // if (url.includes('register')) setIsRegistering(true)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
    introduction: '',
  })

  useEffect(() => {
    if (user && user.token) {
      // User has logined
      if (url.includes('register')) {
        // Should not stay on /register/
        navigate('/user/')
      } else {
        // Staying on /user/
        setFormData(user)
      }
    } else {
      if (url.includes('register')) {
        // User is registering
        setIsRegistering(true)
      } else {
        // User is trying to get profile without login
        navigate('/login/')
      }
    }
    return () => {
      dispatch(userReset())
    }
  }, [navigate, url, user, userStore])

  const isPending = projectsStore.isPending || userStore.isPending
  if (isPending) {
    return <Spinner />
  }

  const { username, password, phone, email, linkedin, github, introduction } =
    formData
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isRegistering) {
        const response = await dispatch(
          register({
            username,
            password,
            phone,
            email,
            linkedin,
            github,
            introduction,
          })
        ).unwrap()
        console.log(response)
        setIsRegistering(false)
        navigate('/')
      } else {
        await dispatch(
          update({
            id: user._id,
            userData: { phone, email, linkedin, github, introduction },
          })
        ).unwrap()
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const onChange = (e) => {
    setFormData(
      (state) =>
        (state = {
          ...state,
          [e.target.id]: e.target.value,
        })
    )
  }

  return (
    <div
      id="user-page"
      className="flex flex-col flex-grow items-center justify-center bg-yellow-50 px-12 py-3 font-poppins"
    >
      <form
        onSubmit={onSubmit}
        id="user-form"
        className="flex flex-col items-center justify-around space-y-10 md:space-y-5"
      >
        <img
          src={avatar}
          alt="avatar"
          className="rounded-full border-gray-100 border-2 w-[50%] h-[50%] md:w-[40%] md:h-[40%] lg:w-[30%] lg:h-[30%]"
        />
        <div className="grid grid-cols-3  gap-y-4 gap-x-2 p-1 text-center w-[70%] h-[50%] md:gap-y-3 md:w-[50%]">
          <span>Username</span>
          <input
            id="username"
            type="text"
            value={username}
            onChange={onChange}
            className="block p-1 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />

          {isRegistering ? (
            <>
              <span>Password</span>
              <input
                id="password"
                type="text"
                value={password}
                onChange={onChange}
                className="block p-1 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              />
            </>
          ) : null}

          <span>Phone</span>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={onChange}
            className="block p-1 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />

          <span>Email</span>
          <input
            id="email"
            type="text"
            value={email}
            onChange={onChange}
            className="block p-1 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />

          <span>LinkedIn</span>
          <input
            id="linkedin"
            type="url"
            value={linkedin}
            onChange={onChange}
            className="block p-1 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />

          <span>GitHub</span>
          <input
            id="github"
            type="text"
            value={github}
            onChange={onChange}
            className="block p-1 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />

          <span>Self Introduction</span>
          <textarea
            id="introduction"
            rows="5"
            type="text"
            value={introduction}
            onChange={onChange}
            className="block p-2 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
        <button
          type="submit"
          className="mt-10 p-3 text-[14px] font-semibold md:text-[18px]"
        >
          {isRegistering ? 'register' : 'Update'}
        </button>
      </form>
    </div>
  )
}

export default UserPage
