import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  addProject,
  getAllProjectsWithUserId,
  getProject,
  updateProject,
} from '../../redux/projectsStore/projectsSlice'
import Spinner from '../../components/Spinner'

function ProjectPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const url = useLocation().pathname
  const id = url.substring(url.lastIndexOf('/') + 1)
  const projectsStore = useSelector((state) => state.projects)
  const { projects } = projectsStore
  const userStore = useSelector((state) => state.user)
  const { user } = userStore

  const [projectData, setProjectData] = useState({
    name: '',
    technology: '',
    time: '',
    introduction: '',
    description: '',
    URL: '',
    userId: '',
  })
  const { name, technology, time, introduction, description, URL } = projectData

  const getProjectWithId = async (projectId) => {
    try {
      const response = await dispatch(getProject(projectId)).unwrap()
      setProjectData(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (user && user.token) {
      setProjectData({ ...projectData, userId: user._id })
      if (projects === undefined || projects === null) {
        dispatch(getAllProjectsWithUserId(user._id))
      }
      if (url && id && id !== 'project') {
        getProjectWithId(id)
      }
    } else {
      navigate('/login/')
    }

    return () => {}
    // }, [dispatch, navigate, user, projects, url, id])
  }, [])

  const isPending = userStore.isPending || projectsStore.isPending
  if (isPending) return <Spinner />

  const onSubmit = () => {
    try {
      projectData.description = projectData.description.replace(/\n/g, '<br/>')
      projectData.introduction = projectData.introduction.replace(
        /\n/g,
        '<br/>'
      )
      if (url && id) {
        dispatch(updateProject({ id, projectData }))
        navigate('/projects/')
      } else {
        dispatch(addProject(projectData))
        navigate('/projects/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onChange = (e) => {
    // if (e.target.id === 'description') {
    //   e.target.value = e.target.value.replace(/\./g, '')
    // }
    setProjectData(
      (state) =>
        (state = {
          ...state,
          [e.target.id]: e.target.value,
        })
    )
  }

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      setProjectData(
        (state) =>
          (state = {
            ...state,
            description: e.target.value + '\r\n',
          })
      )
    }
  }

  return (
    <div
      id="project-page"
      className="flex flex-col flex-grow items-center justify-center bg-yellow-50 px-12 py-3 font-poppins"
    >
      <h2 className="my-3 p-1 font-semibold text-2xl">
        {url && id ? 'Update this project' : 'Create a new project'}
      </h2>
      <form
        onSubmit={onSubmit}
        id="project-form"
        className="flex flex-col mt-4 w-full items-center justify-around space-y-10 md:space-y-5"
      >
        <div className="grid grid-cols-3 gap-y-4 gap-x-2 p-1 text-center w-[70%] h-[50%] md:gap-y-3 md:w-[50%]">
          <span>Project Name</span>
          <input
            id="name"
            type="text"
            value={name}
            onChange={onChange}
            className="block p-1 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />

          <span>Technology Stack</span>
          <input
            id="technology"
            type="text"
            value={technology}
            onChange={onChange}
            className="block p-1 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />

          <span>Time</span>
          <input
            id="time"
            type="text"
            value={time}
            onChange={onChange}
            className="block p-1 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />

          <span>Project URL</span>
          <input
            id="URL"
            type="url"
            value={URL}
            onChange={onChange}
            className="block p-1 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />

          <span>Introduction</span>
          <textarea
            id="introduction"
            rows="5"
            type="text"
            value={introduction.replaceAll('<br/>', '\n')}
            onChange={onChange}
            className="block p-2 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />

          <span>Description</span>
          <textarea
            id="description"
            rows="5"
            type="text"
            value={description.replaceAll('<br/>', '\n')}
            onChange={onChange}
            className="block p-2 w-full col-span-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
        <button
          type="submit"
          className="mt-10 p-3 text-[14px] font-semibold md:text-[18px]"
        >
          {url && id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  )
}

export default ProjectPage
