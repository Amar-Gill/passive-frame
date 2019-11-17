import React from 'react'
import ProjectInfoForm from '../components/ProjectInfoForm'

const NewProjectPage = (props) => {
  // use states
  // POST for create new Project -> use PUT for edit project

  return (
    <div className="mt-40">
      <ProjectInfoForm header="New Project" HTTPMethod="POST"/>
    </div>

  )
}

export default NewProjectPage
