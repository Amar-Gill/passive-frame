import React from 'react'
import { Segment, Grid, Button, Icon, Menu, Label, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import ActionsModal from './ActionsModal'

const ReportInfoSegment = (props) => {
  // use effects

  return (

    <Segment>
      <Grid verticalAlign="top" stackable columns={3}>
        <Grid.Column >

          <Header
            size="small"
          // style={{ paddingLeft: 6, marginTop: "auto", marginBottom: "auto" }}
          >
            <Header.Content>
              {
                props.report.report_type == 'test' && `Test Report ${props.report.project_report_index}`

              }
              {

                props.report.report_type == 'field' && `Field Report ${props.report.project_report_index}`
              }
            </Header.Content>
            <Header.Subheader>
              {format(props.report.report_date, 'MMMM d, yyyy h:mm aa')}
            </Header.Subheader>
          </Header>

          <Menu secondary compact size="tiny">
            <Menu.Item>
              <Label textAlign="center" size="small" color="black" >
                Status
                <Label.Detail>Draft</Label.Detail>
              </Label>

            </Menu.Item>
            <Menu.Item >
              <Button className='remove-border-radius'
                basic secondary icon
                as={Link}
                to={{
                  pathname: `/projects/${props.project.id}/edit_report/${props.report.id}/`,
                  state: {
                    project: props.project,
                    report: props.report
                  }
                }}
              >
                <Icon name="edit outline" />

              </Button>
            </Menu.Item>

            <Menu.Item >
              <Button // use render props? no.
                // store states in local storage?
                onClick={e => {
                  // e.preventDefault()
                  localStorage.setItem('project', JSON.stringify(props.project))
                  localStorage.setItem('report', JSON.stringify(props.report))
                }
                }
                as={Link}
                to={`/projects/${props.report.project_id}/reports/${props.report.id}/webview/`}
                target='_blank'
                basic secondary icon className='remove-border-radius'>
                <Icon name='code' />
              </Button>
            </Menu.Item>
            <Menu.Item >
              <Button secondary icon className='remove-border-radius'>
                <Icon name="paper plane" />
                Issue
              </Button>
            </Menu.Item>

          </Menu>

        </Grid.Column>
        <Grid.Column>
          <Header
            as="h4"
            content="Report Items"
            subheader={`Count: ${props.report.item_count} | Pages: null | Assets: null`}
          />

          <Menu secondary compact size="tiny">
            <Menu.Item>
              <Button
                as={Link}
                to={{
                  pathname: `/projects/${props.report.project_id}/reports/${props.report.id}/`,
                  state: {
                    report: props.report,
                    project: props.project
                  }
                }}
                className="remove-border-radius"
                icon
                secondary
                basic
                compact>
                <Icon name="content" />
                View
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button
                as={Link}
                to={{
                  pathname: `/projects/${props.report.project_id}/reports/${props.report.id}/new_item/`,
                  state: {
                    report: props.report,
                    project: props.project
                  }
                }}
                className="remove-border-radius"
                icon
                secondary
                compact>
                <Icon name="edit outline" />
                New
              </Button>
            </Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column>
          <Header
            as="h4"
            content="Actions"
            subheader="Count: 11"
          />
          <Menu secondary compact size="tiny">
            <Menu.Item>
              <Label color="black" >
                Open
                <Label.Detail>5</Label.Detail>
              </Label>
            </Menu.Item>
            <Menu.Item>
              <Label color="black" >
                Overdue
                <Label.Detail>2</Label.Detail>
              </Label>
            </Menu.Item>
            <Menu.Item>
              <ActionsModal project={props.project} report={props.report} items={props.report.items} />
            </Menu.Item>
          </Menu>
        </Grid.Column>

      </Grid>

    </Segment>

  )
}

export default ReportInfoSegment
