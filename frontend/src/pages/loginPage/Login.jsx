import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../redux/userStore/userSlice'
import { Alert } from '../../components/Alert'
import Spinner from '../../components/Spinner'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const { email, password } = formData

  const [showAlert, setShowAlert] = useState({
    show: false,
    type: '',
    title: '',
    message: '',
  })

  const onChange = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const userData = { email, password }
    try {
      await dispatch(login(userData)).unwrap()
      setShowAlert({
        show: true,
        type: 'fullfilled',
        title: 'Success',
        message: 'Login Success!',
      })
      navigate('/user/')
    } catch (error) {
      setShowAlert({
        show: true,
        type: 'rejected',
        title: 'Fail',
        message: 'Login Fail!',
      })
      console.log(error)
    }
  }

  const user = useSelector((state) => state.user)
  const projects = useSelector((state) => state.projects)
  const isPending = projects.isPending || user.isPending
  if (isPending) {
    return <Spinner />
  }

  return (
    <div
      id="login-page"
      className="flex flex-col items-center bg-yellow-50 px-12 py-3 font-poppins"
    >
      {/* TODO: Show Alert */}
      {/* {showAlert.show ? (
        <Alert
          type={showAlert.type}
          title={showAlert.title}
          message={showAlert.message}
        />
      ) : null} */}
      <div className="w-full max-w-xs">
        <form
          onSubmit={onSubmit}
          className="border-2 rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={onChange}
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
