import React from 'react'
import { Container, Segment, Menu, Label, Item, Button, Header } from 'semantic-ui-react'
import format from 'date-fns/format'

const informationHeader = {
  border: 'solid black',
  borderWidth: 8
}

// const letterSizedBox = {
//   height: 11 * 150, // 11 inches high
//   width: 8 * 150,
//   border: 'solid black',
//   borderWidth: 2
// }

const FormattedReportPage = (props) => {
  // use states
  const project = localStorage.project ? JSON.parse(localStorage.project) : null
  const report = localStorage.report ? JSON.parse(localStorage.report) : null
  const reportItems = report.items

  return (
    // <div style={letterSizedBox}></div>
    <Container text>
      {/* <div style={letterSizedBox}></div> */}
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
                          <Item.Header size='small'>Image_No. [{project.project_number}-{report.report_type == 'field' ? 'FR' : 'TR'}-{item.reportItemIndex}-{image.key}]</Item.Header>
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
              <h4>Actions</h4>
              <Segment>ACTION MANN</Segment>
              <Segment>ACTION MANN</Segment>
              <Segment>ACTION MANN</Segment>
            </Segment>
          )
        })
      }

    </Container>
  )
}

export default FormattedReportPage
