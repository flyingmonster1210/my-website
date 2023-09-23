import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../redux/userStore/userSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const url = useLocation().pathname
  const { user } = useSelector((state) => state.user)
  const token = user ? user.token : user

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
      className="hover:text-gray-500"
      onClick={async () => {
        try {
          await dispatch(logout()).unwrap()
          navigate('/')
        } catch (error) {
          console.log(error)
        }
      }}
    >
      Logout
    </button>
  )

  return (
    <div
      id="header"
      className="flex flex-row justify-between items-center bg-yellow-50 px-12 py-3 font-poppins text-[14px] font-semibold md:text-[18px]"
    >
      <button
        className="hover:text-gray-500"
        onClick={() => {
          navigate('/')
        }}
      >
        Home
      </button>
      {token ? logoutBtn : loginBtn}
    </div>
  )
}

export default Header
