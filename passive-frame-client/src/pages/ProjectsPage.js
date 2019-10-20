import React, { useState, useEffect, useContext } from 'react'
import { Button, Icon, Segment, Grid, Menu, Input } from 'semantic-ui-react'
import UserContext from '../UserContext'
import ProjectInfoSegment from '../components/ProjectInfoSegment'


const ProjectsPage = (props) => {
  const [projects, setProjects] = useState([])
  const { user, setUser } = useContext(UserContext)

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
    <div className='mt-42'>

      <Menu className="fixed-submenu bg-white" secondary stackable>
        <Menu.Item>
          <Input
            className='icon'
            icon='search'
            action={{ type: 'submit' }}
            placeholder='Filter Project Name' />
        </Menu.Item>
        <Menu.Item >
          <Input
            className='icon'
            icon='search'
            action={{ type: 'submit' }}
            placeholder='Filter Project Number'
          />
        </Menu.Item>
        {/* <Menu.Menu position="right"> */}
          <Menu.Item  className="menu-multi-item-responsive" >
              <Button
                basic
                className="remove-border-radius"
                size="small"
                secondary
              >
                <Icon name="favorite" />
                Show Favourites
            </Button>
            
              <Button
                className="remove-border-radius"
                size="small"
                secondary
                onClick={() => {
                  props.history.push('/new_project/')
                }}>
                <Icon name="plus" />
                New Project
          </Button>
          </Menu.Item>
        {/* </Menu.Menu> */}
      </Menu>
      <Grid padded="horizontally" columns='1'>

        {
          projects.map(project => {
            if (project.organization == user.organization_name) {
              return (
                <Grid.Row key={project.id}>
                  <Grid.Column>
                    <ProjectInfoSegment
                      project_name={project.project_name}
                      project_number={project.project_number}
                      organization={project.organization}
                      />
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
