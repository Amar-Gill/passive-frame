import React, { useState, useEffect } from 'react'
import { Button, Form, Grid, Container, Select, Dropdown, Label } from 'semantic-ui-react'
import { useParams } from "react-router"

const selectOptions = [
  { key: "Field", value: "field", text: "Field Report" },
  { key: "Test", value: "test", text: "Test Report" }
]

const NewReportPage = (props) => {
  // use states
  const [reportType, setReportType] = useState('')
  const [currentProject, setCurrentProject] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    if (props.location.state) {
      setCurrentProject(props.location.state)
    } else {
      // use API call
      fetch(`http://127.0.0.1:5000/api/v1/projects/${id}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(result => {
          setCurrentProject(result)
        })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    let newReport = {
      reportType: reportType,
      projectId: currentProject.id
    }

    // open chrome without web protection to allow cross origin request:
    // open -a Google\ Chrome --args --disable-web-security --user-data-dir

    // send info to API to create new project
    fetch('http://127.0.0.1:5000/api/v1/reports/', {
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
              <Form.Select onChange={(e, {value}) => setReportType(value)} selection options={selectOptions} placeholder="Choose Report Type"/>
              <Container textAlign="right">
                <Button className="remove-border-radius" secondary type='Submit'>Submit</Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    props.history.push(`/projects/${currentProject.id}/`)
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
