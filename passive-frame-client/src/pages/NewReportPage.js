import React, { useState, useEffect } from 'react'
import { Button, Form, Grid, Container } from 'semantic-ui-react'


const NewReportPage = (props) => {
  // use states
  const [reportType, setReportType] = useState('')
  const currentProject = props.location.state

  useEffect(() => {
      console.log("hello world")
      console.log(props.location.state)
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    let newReport = {
      reportType: reportType,
      projectId: props.project_id
    }

    // open chrome without web protection to allow cross origin request:
    // open -a Google\ Chrome --args --disable-web-security --user-data-dir

    // send info to API to create new project
    fetch('http://127.0.0.1:5000/api/v1/projects/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newReport)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
      })
  }

  return (
    <div className="mt-42">
      <Container text>
        <Grid columns={1} >
          <Grid.Column>
            <h2>New Report</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Report Type</label>
                <input
                  placeholder='Report Type'
                  onChange={(e) => setReportType(e.target.value)}
                />
              </Form.Field>
              <Container textAlign="right">
                <Button className="remove-border-radius" secondary type='Submit'>Submit</Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    props.history.push('/projects/' + currentProject.id)
                  }}
                  className="remove-border-radius"
                  secondary
                  basic>Back</Button>

              </Container>
            </Form>
          </Grid.Column>
        </Grid>

      </Container>

    </div>

  )
}

export default NewReportPage
