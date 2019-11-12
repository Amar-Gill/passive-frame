import React, { useState, useEffect } from 'react'
import { Button, Form, Container} from 'semantic-ui-react'
import { useParams, useHistory } from "react-router"
import DatePicker from 'react-datepicker'
import format from "date-fns/format"
import { getTime } from 'date-fns'

import "react-datepicker/dist/react-datepicker.css"

const selectOptions = [
  { key: "Field", value: "field", text: "Field Report" },
  { key: "Test", value: "test", text: "Test Report" }
]

const ReportInfoForm = (props) => {
  // use hooks
  const [reportType, setReportType] = useState('')
  const [reportDate, setReportDate] = useState(new Date()) // Date() object is from date-fns library
  const { projid, reportid } = useParams()
  let history = useHistory()

  // convert reportDate to millisecond time stamp (number)
  // allows user to choose present time as reportDate default value for backend
  useEffect(() => {
    setReportDate(getTime(reportDate))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    let newReport = {
      reportType: reportType,
      projectId: projid,
      reportDate: reportDate
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
        alert(result.message)
      })
  }

  return (
        <div>
            <h2>{props.header}</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group >
                <Form.Select label="Report Type" onChange={(e, { value }) => setReportType(value)} selection options={selectOptions} placeholder="Choose Report Type" />
                <Form.Field>
                  <label>Time of Visit</label>
                  <DatePicker
                    selected={reportDate}
                    // set reportDate to millisecond time stamp of selected date
                    // peewee ORM requires timestamp for DateTimeField.
                    // http://docs.peewee-orm.com/en/latest/peewee/models.html#field-types-table
                    onChange={date => {
                      setReportDate(getTime(date))
                      console.log(reportDate)
                      console.log(typeof(reportDate))
                    }}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </Form.Field>

              </Form.Group>
              <Container textAlign="right">
                <Button className="remove-border-radius" secondary type='Submit'>Submit</Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    history.push(`/projects/${projid}/`)
                  }}
                  className="remove-border-radius"
                  secondary
                  basic>Back</Button>

              </Container>
            </Form>
          <h1>{getTime(reportDate)}</h1>
          <h1>{format(reportDate, "MMMM d, yyyy h:mm aa")}</h1>
          </div>
  )
}

export default ReportInfoForm
