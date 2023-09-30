import { useSelector } from 'react-redux'
import NewlineText from '../../components/NewLineText'
import { useLocation } from 'react-router-dom'

function ProjectDetails() {
  const url = useLocation().pathname
  const index = url.substring(url.lastIndexOf('/') + 1)
  const { projects } = useSelector((state) => state.projects)
  let project = null
  if (projects && projects[index]) {
    project = projects[index]
  }

  return (
    <div
      id="project-details"
      className="flex flex-col items-center bg-yellow-50 px-12 py-3 font-poppins"
    >
      <div className="flex flex-col flex-grow m-3">
        <p className="border-b-2 border-gray-300 text-2xl font-medium">
          {project?.name}
        </p>
        <div className="flex flex-col-reverse w-full justify-between text-base italic md:flex-row ">
          <p>{project?.technology}</p>
          <p>Finish Time: {project?.time}</p>
        </div>
        <NewlineText text={project?.description} className={'text-lg my-3'} />
        <div className="flex my-2">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={project?.URL}
            className="text-blue-400 italic underline rounded-md p-2 hover:text-gray-400 hover:cursor-pointer"
          >
            GO TO
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
