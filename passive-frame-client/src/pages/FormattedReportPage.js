import React from 'react'

const FormattedReportPage = (props) => {
  // use states
  const project = localStorage.project? JSON.parse(localStorage.project) : null
  const report = localStorage.report? JSON.parse(localStorage.report) : null

  return (
    <div>
      <h4>PRINT THIS PAGE FOR GOOD TYMZ</h4>
      <h2>{project.id}</h2>
      <h2>{report.id}</h2>
    </div>
  )
}

export default FormattedReportPage
