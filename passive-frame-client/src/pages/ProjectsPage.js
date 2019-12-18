import React, { useState, useEffect } from 'react'
import { Button, Icon, Segment, Grid, Menu, Input } from 'semantic-ui-react'
import ProjectInfoSegment from '../components/ProjectInfoSegment'
import StickyHorizontalDivider from '../components/StickyHorizontalDivider'
import { useAuth } from '../context/auth'



const ProjectsPage = (props) => {
  const [projects, setProjects] = useState([])
  const { currentUser } = useAuth()


  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/v1/organizations/${currentUser.organization_id}/projects`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(result => {
        setProjects(result.projects)
      })
  }, [])

   return (
    <div className='mt-40'>
      
      <Menu className="fixed-submenu bg-white" secondary stackable size="small">
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
                  props.history.push('/projects/new_project/')
                }}>
                <Icon name="plus" />
                New Project
          </Button>
          </Menu.Item>
        {/* </Menu.Menu> */}
      </Menu>
      
      <StickyHorizontalDivider topDesktop={86} topMobile={164}/>
                
      <Grid  padded="horizontally" columns='1'>


        {
          projects.map(project => {
              return (
                <Grid.Row key={project.id}>
                  <Grid.Column>
                    <ProjectInfoSegment
                      project={project}
                      />
                  </Grid.Column>
                </Grid.Row>
              )
          })
        }
      </Grid>
    </div>
  )
}

export default ProjectsPage
