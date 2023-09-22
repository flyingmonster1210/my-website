import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

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
      <button
        className="hover:text-gray-500"
        onClick={() => {
          navigate('/user')
        }}
      >
        Login
      </button>
    </div>
  )
}

export default Header
