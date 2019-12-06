import React, { useState, useEffect } from 'react'
import { Button, Form, Container } from 'semantic-ui-react'
import { useParams, useHistory, useLocation } from "react-router-dom"
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
  let history = useHistory();
  let location = useLocation()
  const [reportType, setReportType] = useState('')
  const [reportDate, setReportDate] = useState(new Date()) // Date() object is from date-fns library
  const [disabledForm, setDisabledForm] = useState(false)
  const { projid, reportid } = useParams()

  // convert reportDate to millisecond time stamp (number)
  // allows user to choose present time as reportDate default value for backend
  useEffect(() => {
    if (props.HTTPMethod == "POST") {
      setReportDate(getTime(reportDate))
    }
  }, [])

  // retrieve current report data if form is in edit mode
  useEffect(() => {
    if (location.state && props.HTTPMethod == "PUT") {
      setReportType(location.state.report.report_type)
      setReportDate(location.state.report.report_date)
    } else if (props.HTTPMethod == "PUT") {
      // api call to fetch data if button link not used
      fetch(`http://127.0.0.1:5000/api/v1/reports/${reportid}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
        .then(response => response.json())
        .then(result => {
          // disable the form if incorrect project id in url
          if (result.project_id != projid) {
            setDisabledForm(true)
          } else {
            setReportType(result.report_type)
            setReportDate(result.report_date)
          }
        })
    }
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()

    let reportObject = {
      reportType: reportType,
      projectId: projid,
      reportDate: reportDate
    }

    // open chrome without web protection to allow cross origin request:
    // open -a Google\ Chrome --args --disable-web-security --user-data-dir

    // send info to API to create new project
    let urlString = null
    switch (props.HTTPMethod) {
      case "POST":
        urlString = 'http://127.0.0.1:5000/api/v1/reports/'
        break;
      case "PUT":
        urlString = `http://127.0.0.1:5000/api/v1/reports/${reportid}`
        break;
    }

    // send info to API to create new project
    fetch(urlString, {
      method: props.HTTPMethod,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(reportObject)
    })
      .then(response => response.json())
      .then(result => {
        alert(result.message)
        // go back one page if new report created successfully
        if (result.status == "Success" && props.HTTPMethod == "POST") {
          history.goBack()
        }
      })
  }

  return (
    <div>
      <h2>{props.header}</h2>
      <Form id='report-info-form' onSubmit={handleSubmit}>
        <Form.Group >
          <Form.Select disabled={disabledForm} value={reportType} label="Report Type" onChange={(e, { value }) => setReportType(value)} selection options={selectOptions} placeholder="Choose Report Type" />
          <Form.Field>
            <label>Time of Visit</label>
            <DatePicker
              selected={reportDate}
              disabled={disabledForm}
              // set reportDate to millisecond time stamp of selected date
              // peewee ORM requires timestamp for DateTimeField.
              // http://docs.peewee-orm.com/en/latest/peewee/models.html#field-types-table
              onChange={date => {
                setReportDate(getTime(date))
                console.log(reportDate)
                console.log(typeof (reportDate))
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
              history.goBack()
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
