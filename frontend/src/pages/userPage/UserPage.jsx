import { useSelector } from 'react-redux'
import avatar from '../../assets/avatar.jpg'

const UserPage = () => {
  const { user } = useSelector((state) => state.user)

  return (
    <div
      id="user-page"
      className="flex flex-col flex-grow items-center justify-center bg-yellow-50 px-12 py-3 font-poppins"
    >
      <div
        id="user-form"
        className="flex flex-col items-center justify-around space-y-10 md:space-y-5"
      >
        <img
          src={avatar}
          alt="avatar"
          className="rounded-full border-gray-100 border-2 w-[50%] h-[50%] md:w-[40%] md:h-[40%] lg:w-[30%] lg:h-[30%]"
        />
        <div className="grid grid-cols-3  gap-y-4 gap-x-2 p-1 text-center w-[70%] h-[50%] md:gap-y-3 md:w-[50%]">
          <span>Phone</span>
          <input
            type="text"
            defaultValue={user.phone}
            className="block p-1 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />

          <span>Email</span>
          <input
            type="text"
            defaultValue={user.email}
            className="block p-1 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />

          <span>LinkedIn</span>
          <input
            type="text"
            defaultValue={user.linkedin}
            className="block p-1 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />

          <span>GitHub</span>
          <input
            type="text"
            defaultValue={user.github}
            className="block p-1 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />

          <span>Self Introduction</span>
          <textarea
            rows="5"
            type="text"
            defaultValue={user.introduction}
            className="block p-2 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
      </div>

      <div id="user-update" className="">
        <button className="mt-10 p-3 text-[14px] font-semibold md:text-[18px]">
          Update
        </button>
      </div>
    </div>
  )
}

export default UserPage
