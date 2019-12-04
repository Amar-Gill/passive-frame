import React, { useState, useEffect } from 'react'
import { Grid, Container, Menu, Button, Header, Icon } from 'semantic-ui-react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import ReportInfoForm from '../components/ReportInfoForm'
import StickyHorizontalDivider from '../components/StickyHorizontalDivider'

const EditReportPage = (props) => {
  const [currentProject, setCurrentProject] = useState(null)
  let history = useHistory()
  let location = useLocation()
  let { projid, reportid } = useParams()

  useEffect(() => {
    if (location.state) {
      setCurrentProject(location.state.project)
    } else {
      // use API call with params
      fetch(`http://127.0.0.1:5000/api/v1/projects/${projid}`, {
        method: "GET"
      })
        .then(response => response.json())
        .then(result => {
          setCurrentProject(result)
        })
    }
  }, [])

  if (!currentProject) {
    return <h1 className="mt-40">LOADING...</h1>
  }

  return (
    <div className="mt-40">
      <Menu className="fixed-submenu bg-white" secondary size="small">
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
            content={currentProject.project_name}
            subheader={currentProject.project_number} />
        </Menu.Item>
        <Menu.Menu position="right">

          <Menu.Item>
            <Button
              type="submit"
              form="report-info-form"
              className="remove-border-radius" secondary icon>
              <Icon name="save outline" />
              Save
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <StickyHorizontalDivider topDesktop={86} topMobile={86} />
      <Container text>
        <Grid columns={1} >
          <Grid.Column>
            <ReportInfoForm header="Edit Report" HTTPMethod="PUT" />
          </Grid.Column>
        </Grid>

      </Container>

    </div>

  )
}

export default EditReportPage
