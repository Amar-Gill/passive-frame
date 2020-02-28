import React from 'react'
import { Container, Segment, Menu, Label, Item, Button, Header } from 'semantic-ui-react'
import format from 'date-fns/format'

const ReportWebview = (props) => {
  // use states
  const project = localStorage.project ? JSON.parse(localStorage.project) : null
  const report = localStorage.report ? JSON.parse(localStorage.report) : null
  const reportItems = [...report.items].sort((a, b) => a.reportItemIndex - b.reportItemIndex)

  // reportItems.forEach(item => {
  //   fetch(`http://127.0.0.1:5000/api/v1/report_items/${item.id}/actions`, {
  //     method: 'GET'
  //   })
  //     .then(response => response.json())
  //     .then(result => {
  //       item.actions = result.actions
  //     })
  // })

  // TODO - add project level actions!!

  return (
    <Container text>
      <Segment>
        <Header dividing>
          <Header.Content>
            Project_No. [{project.project_number}] / {project.project_name}
          </Header.Content>
        </Header>
        <div style={{
          display: 'flex', justifyContent: 'space-between'
        }}>
          <Header size='small'>
            <Header.Content>
              {report.report_type == 'field' ? 'Field Report ' : 'Test Report '} {report.project_report_index}
            </Header.Content>
            <Header.Subheader>
              {format(report.report_date, 'MMMM d, yyyy h:mm aa')}
            </Header.Subheader>
          </Header>

          <Menu compact>
            <Menu.Item>
              {report.temperature} &#8451; / {Math.round((report.temperature * (9 / 5)) + 32)} &#8457;
            </Menu.Item>
            <Menu.Item>
              <Label textAlign="center" size="small" color="black" >
                Status
                <Label.Detail>Draft</Label.Detail>
              </Label>
            </Menu.Item>
          </Menu>

        </div>
        <Segment>
          <Header dividing size='small'>Purpose of Visit</Header>
          {report.description}
        </Segment>
      </Segment>

      {reportItems &&
        reportItems.map(item => {
          return (
            <div style={ { marginBottom: 16 } }>
              <Segment key={item.id}>
                <Header size='small'>
                  <Header.Content>Item_No. [{item.reportItemIndex}]</Header.Content>
                  <Header.Subheader>Subject: {item.subject}</Header.Subheader>
                </Header>
                <Segment>
                  <Header size='small' dividing content='Content' />
                  <p>{item.content}</p>
                </Segment>
                <Item.Group divided>
                  {
                    item.images.map(image => {
                      return (
                        <Item key={image.key}>
                          <Item.Image size='medium' src={image.s3_image_url} />
                          <Item.Content>
                            <Item.Header size='small'>Image_No. [{project.project_number}-{report.report_type == 'field' ? 'FR' : 'TR'}-{report.project_report_index}-{item.reportItemIndex}-{image.key}]</Item.Header>
                            <Item.Meta>
                              <span >{image.path}</span>
                            </Item.Meta>
                            <Item.Description>
                              {/* <Segment> */}

                              {image.caption}
                              {/* </Segment> */}
                            </Item.Description>
                            {/* <Item.Extra>
                            <Button floated='right' secondary>PRESS ME</Button>
                          </Item.Extra> */}
                          </Item.Content>
                        </Item>
                      )
                    })
                  }
                </Item.Group>
              </Segment>
              {
                item.actions &&
                item.actions.map(action => {
                  return (
                    <Segment>
                      <Header>
                        <Header.Content>
                          Action_No. [{project.project_number}-{report.report_type == 'field' ? 'FR' : 'TR'}-{report.project_report_index}-{item.reportItemIndex}-{action.actionItemIndex}]
                        </Header.Content>
                      </Header>
                      <Segment>
                        <Header dividing size='small'>
                          <Header.Content>
                            Description
                          </Header.Content>
                        </Header>
                        {action.description}
                      </Segment>
                      <Menu compact stackable>
                        <Menu.Item>
                          Owner: {action.owner}
                        </Menu.Item>
                        <Menu.Item>
                          Due: {format(action.dueDate, 'MMMM d, yyyy h:mm aa')}
                        </Menu.Item>
                        <Menu.Item>
                          <Label color="black">
                            Status
                            <Label.Detail>
                              {action.closed ? 'closed' : 'open'}
                            </Label.Detail>
                          </Label>
                        </Menu.Item>
                      </Menu>
                    </Segment>
                  )
                })
              }
              {/* <br/> */}
            </div>
          )
        })
      }
    </Container>
  )
}

export default ReportWebview
