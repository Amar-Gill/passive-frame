import React, { useContext } from 'react'
import ProjectInfoForm from '../components/ProjectInfoForm'
import {Menu, Button, Icon, Header } from 'semantic-ui-react'
import StickyHorizontalDivider from '../components/StickyHorizontalDivider'
import UserContext from '../UserContext'
import { useHistory } from 'react-router-dom'

const EditProjectPage = (props) => {
  // use states
  const { user, setUser } = useContext(UserContext)
  let history = useHistory()
  
  // POST for create new Project -> use PUT for edit project
  return (
    <div className="mt-40">
      <Menu className="fixed-submenu bg-white" secondary stackable size="small">
        <Menu.Item fitted="vertically">
          <Button
            onClick={() => {
              history.goBack()
            }}
            compact
            className="remove-border-radius"
            icon
            secondary>
            <Icon name="chevron left" />
          </Button>
          <Header
            as="h4"
            style={{ paddingLeft: 6, marginTop: "auto", marginBottom: "auto" }}
            content={user.organization_name}
            subheader={`org-id: ${user.organization_id}`} />
        </Menu.Item>
        <Menu.Menu position="right">

          <Menu.Item>
            <Button
              className="remove-border-radius" secondary icon type="submit" form="project-info-form">
              <Icon name="save outline" />
              Save
                    </Button>

          </Menu.Item>

        </Menu.Menu>
      </Menu>
      <StickyHorizontalDivider topDesktop={86} topMobile={86} />
      <ProjectInfoForm header="Edit Project" HTTPMethod="PUT" />
    </div>

  )
}

export default EditProjectPage
