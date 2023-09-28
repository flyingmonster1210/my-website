import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import {
  deleteProject,
  getAllProjectsWithUserId,
} from '../../redux/projectsStore/projectsSlice'
import NewlineText from '../../components/NewLineText'

function ProjectsPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [editing, setEditing] = useState(false)

  const { user } = useSelector((state) => state.user)
  let { projects } = useSelector((state) => state.projects)

  useEffect(() => {
    if (user && user.token) {
      // setEditing(false)
      if (!projects) {
        dispatch(getAllProjectsWithUserId(user._id))
      }
    } else {
      navigate('/login/')
    }
  }, [user, projects, dispatch])

  const isPending = user.idPending && projects.isPending
  if (isPending) return <Spinner />

  const deleteProjectWithId = (index) => {
    try {
      dispatch(deleteProject(projects[index]._id))
    } catch (error) {
      console.error(error)
    }
  }
  const updateProjectWithId = (index) => {
    if (projects && projects[index]) {
      navigate('/project/' + projects[index]._id)
    } else {
      navigate('/login/')
    }
  }
  const addNewProject = () => {
    navigate('/project/')
  }

  return (
    <div
      id="projects-list-page"
      className="flex flex-col flex-grow  bg-yellow-50 px-12 py-3 font-poppins"
    >
      <div className="flex flex-row p-3 space-x-4">
        <h2 className=" font-bold text-3xl">Projects</h2>
        {editing ? (
          <>
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-end hover:text-gray-500"
            >
              [ Done ]
            </button>
            <button
              onClick={addNewProject}
              className="flex items-end hover:text-gray-500"
            >
              [ Add New ]
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(!editing)}
            className="flex items-end hover:text-gray-500"
          >
            [ Edit ]
          </button>
        )}
      </div>
      <ul className="p-3">
        {projects && Object.values(projects).length
          ? projects.map((project, index) => (
              <li className="mb-2" key={project.name + index}>
                <div className="flex flex-row">
                  <div className="flex flex-col flex-grow m-3">
                    <p className="border-b-2 border-gray-300 text-2xl font-medium">
                      {project.name}
                    </p>
                    <div className="flex flex-col-reverse w-full justify-between text-base italic md:flex-row ">
                      <p>{project.technology}</p>
                      <p>Finish Time: {project.time}</p>
                    </div>
                    <NewlineText
                      text={project.description}
                      className={'text-lg'}
                    />
                  </div>
                  {editing ? (
                    <div className="flex flex-col items-center justify-end space-y-3">
                      <button
                        onClick={() => updateProjectWithId(index)}
                        className="p-1 w-full border-2 border-blue-400 rounded-md bg-blue-200 hover:text-gray-500"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteProjectWithId(index)}
                        className="p-1 w-full border-2 border-red-400 rounded-md bg-red-200 hover:text-gray-500"
                      >
                        Delete
                      </button>
                    </div>
                  ) : null}
                </div>
              </li>
            ))
          : 'Empty'}
      </ul>
    </div>
  )
}

export default ProjectsPage
