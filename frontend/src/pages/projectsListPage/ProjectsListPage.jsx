import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner'

function ProjectsPage() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.user)
  let { projects } = useSelector((state) => state.projects)

  useEffect(() => {
    if (user && user.token && projects !== null) {
    } else {
      navigate('/login/')
    }
  }, [user, projects])

  const isPending = user.idPending && projects.isPending
  if (isPending) return <Spinner />

  return (
    <div
      id="projects-list-page"
      className="flex flex-col flex-grow  bg-yellow-50 px-12 py-3 font-poppins"
    >
      <div className="flex flex-row">
        <h2 className="p-3 font-bold text-3xl">Projects</h2>
        <button
          onClick={() => navigate('/project/')}
          className="hover:text-gray-500"
        >
          Edit
        </button>
      </div>
      <ul className="p-3">
        {projects && Object.values(projects).length
          ? projects.map((project, index) => (
              <li key={project.name + index}>
                <div className="flex flex-col m-3">
                  <p className="border-b-2 border-gray-300 text-2xl font-medium">
                    {project.name}
                  </p>
                  <p className="text-base italic">{project.technology}</p>
                  <p className="text-lg">{project.description}</p>
                </div>
              </li>
            ))
          : 'Empty'}
      </ul>
    </div>
  )
}

export default ProjectsPage
