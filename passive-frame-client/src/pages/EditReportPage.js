import React from 'react'
import { Grid, Container } from 'semantic-ui-react'
import ReportInfoForm from '../components/ReportInfoForm'

const EditReportPage = (props) => {

  return (
    <div className="mt-42">
      <Container text>
        <Grid columns={1} >
          <Grid.Column>
            <ReportInfoForm header="Edit Report"/>
          </Grid.Column>
        </Grid>

      </Container>

    </div>

  )
}

export default EditReportPage
