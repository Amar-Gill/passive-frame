import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const ProjectsPage = (props) => {
  // set states

  return (
    <div>
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
    </div>
  )
}

export default ProjectsPage
