import React from 'react'
import ProjectInfoForm from '../components/ProjectInfoForm'

const EditProjectPage = (props) => {
  // use states
  // POST for create new Project -> use PUT for edit project

  return (
    <div className="mt-42">
      <ProjectInfoForm header="Edit Project" history={props.history} HTTPMethod="PUT"/>
    </div>

  )
}

export default EditProjectPage
