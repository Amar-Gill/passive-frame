import React from 'react'
import ProjectInfoForm from '../components/ProjectInfoForm'

const EditProjectPage = (props) => {
  // use states
  // POST for create new Project -> use PUT for edit project

  return (
    <div className="mt-40">
      <ProjectInfoForm header="Edit Project"  HTTPMethod="PUT"/>
    </div>

  )
}

export default EditProjectPage
