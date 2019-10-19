import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import UserContext from '../UserContext'

const FormExampleForm = () => {
  // use states
  const [projectName, setProjectName] = useState('')
  const [projectNumber, setProjectNumber] = useState('')
  const { user, setUser } = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    let newProject = {
      projectName: projectName,
      projectNumber: projectNumber,
      organizationId: user.organization_id
    }

    // open chrome without web protection to allow cross origin request:
    // open -a Google\ Chrome --args --disable-web-security --user-data-dir

    // send info to API to create new project
    fetch('http://127.0.0.1:5000/api/v1/projects/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newProject)
    })
      .then(response => response.json())
      .then(result => {
        setProjectName('')
        setProjectNumber('')
        // TODO - set the form values to ''
        alert(result.message)
      })
  }

  return (
    <div className="mt-42">
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Project Name</label>
          <input
            placeholder='Project Name'
            onChange={(e) => setProjectName(e.target.value)}
          />
          <input
            placeholder='Project Number'
            onChange={(e) => setProjectNumber(e.target.value)}
          />
        </Form.Field>
        <Button color="green" type='Submit'>Submit</Button>
      </Form>
      <Button color="red">Back</Button>

    </div>

  )
}

export default FormExampleForm
