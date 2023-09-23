import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  const url = useLocation().pathname
  const { user } = useSelector((state) => state.user)
  const { token } = user

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
      {url.includes('user') ? null : (
        <button
          className="hover:text-gray-500"
          onClick={() => {
            navigate('/login')
          }}
        >
          {token ? 'Logout' : 'Login'}
        </button>
      )}
    </div>
  )
}

export default Header
