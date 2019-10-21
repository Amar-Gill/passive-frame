import React, { useState, useContext } from 'react'
import { Button, Form, Grid, Container } from 'semantic-ui-react'
import UserContext from '../UserContext'
import ProjectsPage from './ProjectsPage'

const FormExampleForm = (props) => {
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
      <Container text>
        <Grid columns={1} >
          <Grid.Column>
            <h2>New Project</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Project Name</label>
                <input
                  placeholder='Project Name'
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <label>Project Number</label>
                <input
                  placeholder='Project Number'
                  onChange={(e) => setProjectNumber(e.target.value)}
                />
              </Form.Field>
              <Container textAlign="right">
                <Button className="remove-border-radius" secondary type='Submit'>Submit</Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    props.history.push('/projects/')
                  }}
                  className="remove-border-radius"
                  secondary
                  basic>Back</Button>

              </Container>
            </Form>
          </Grid.Column>
        </Grid>

      </Container>

    </div>

  )
}

export default FormExampleForm
