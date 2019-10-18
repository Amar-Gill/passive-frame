import React, { useState, useEffect, useContext } from 'react'
import { Button, Icon, Segment, Grid } from 'semantic-ui-react'
import UserContext from '../UserContext'

const ProjectsPage = (props) => {
  const [projects, setProjects] = useState([])
  const {user, setUser} = useContext(UserContext)

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/v1/projects/`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(result => {
        setProjects(result.projects)
      })
  }, [])

  return (
    <div>
      <Grid padded="vertically" columns='1'>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <h1>Not enough minerals</h1>
              <Button
                size="small"
                color="green"
                onClick={() => {
                  props.history.push('/new_project')
                }}>
                <Icon name="plus" />
                New Project
              </Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>

        {
          projects.map(project => {
            if (project.organization == user.organization_name) {
              return (
                <Grid.Row key={project.id}>
                  <Grid.Column>
                    <Segment>
                      <h1> {project.project_name}</h1>
                      <h1> {project.organization}</h1>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              )
            }
          })
        }
      </Grid>
    </div>
  )
}

export default ProjectsPage
