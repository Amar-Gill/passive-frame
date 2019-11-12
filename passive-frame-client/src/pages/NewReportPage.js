import React from 'react'
import { Grid, Container } from 'semantic-ui-react'
import ReportInfoForm from '../components/ReportInfoForm'

const NewReportPage = (props) => {

  return (
    <div className="mt-42">
      <Container text>
        <Grid columns={1} >
          <Grid.Column>
            <ReportInfoForm header="New Report" HTTPMethod="POST"/>
          </Grid.Column>
          
        </Grid>

      </Container>

    </div>

  )
}

export default NewReportPage
