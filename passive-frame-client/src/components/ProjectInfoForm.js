import React, { useState, useEffect } from 'react'
import { Button, Form, Grid, Container } from 'semantic-ui-react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useAuth } from '../context/auth'

const ProjectInfoForm = (props) => {
  const [projectName, setProjectName] = useState('')
  const [projectNumber, setProjectNumber] = useState('')
  const { currentUser } = useAuth()
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()

  // effect to populate fields when form in edit mode
  useEffect(() => {
    if (location.state && props.HTTPMethod == 'PUT') {
      setProjectName(location.state.project.project_name)
      setProjectNumber(location.state.project.project_number)
    } else if (props.HTTPMethod == 'PUT') {
      // use API call with params
      fetch(`http://127.0.0.1:5000/api/v1/projects/${id}`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(result => {
          setProjectName(result.project_name)
          setProjectNumber(result.project_number)
        })
    }
  }, [id, location.state, props.HTTPMethod])

  const handleSubmit = (e) => {
    e.preventDefault()

    const projectObject = {
      projectName: projectName,
      projectNumber: projectNumber,
      organizationId: currentUser.organization_id
    }

    // open chrome without web protection to allow cross origin request:
    // open -a Google\ Chrome --args --disable-web-security --user-data-dir

    // send info to API to create new project
    let urlString = null
    switch (props.HTTPMethod) {
      case 'POST':
        urlString = 'http://127.0.0.1:5000/api/v1/projects/'
        break
      case 'PUT':
        urlString = `http://127.0.0.1:5000/api/v1/projects/${id}`
        break
    }

    fetch(urlString, {
      method: props.HTTPMethod,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(projectObject)
    })
      .then(response => response.json())
      .then(result => {
        // TODO - set the form values to ''
        alert(result.message)
        if (result.status == 'Success' && props.HTTPMethod == 'POST') {
          history.goBack()
        }
      })
  }

  return (
    <Container text>
      <Grid columns={1} >
        <Grid.Column>
          <h2>{props.header}</h2>
          <Form id="project-info-form" onSubmit={handleSubmit}>
            <Form.Field>
              <label>Project Name</label>
              <input
                placeholder='Project Name'
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
              />
              <label>Project Number</label>
              <input
                placeholder='Project Number'
                onChange={(e) => setProjectNumber(e.target.value)}
                value={projectNumber}
              />
            </Form.Field>
            <Container textAlign="right">
              <Button className="remove-border-radius" secondary type='Submit'>Submit</Button>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  history.goBack()
                }}
                className="remove-border-radius"
                secondary
                basic>Back</Button>

            </Container>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default ProjectInfoForm
