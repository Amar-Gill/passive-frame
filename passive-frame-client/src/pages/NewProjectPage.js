import React, { useState, useContext } from 'react'
import { Button, Form, Grid, Container } from 'semantic-ui-react'
import UserContext from '../UserContext'
import ProjectInfoForm from '../components/ProjectInfoForm'

const NewProjectPage = (props) => {
  // use states

  const handleCreateProject = (projectObject) => {
    fetch('http://127.0.0.1:5000/api/v1/projects/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(projectObject)
        })
            .then(response => response.json())
            .then(result => {
                setProjectName('')
                setProjectNumber('')
                // TODO - set the form values to ''
            })
  }

  return (
    <div className="mt-42">
      <ProjectInfoForm/>
    </div>

  )
}

export default NewProjectPage
