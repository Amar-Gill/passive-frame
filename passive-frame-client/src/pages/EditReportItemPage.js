import React from 'react'
import { Grid, Container } from 'semantic-ui-react'
import ReportItemInfoForm from '../components/ReportItemInfoForm'

const EditReportItem = (props) => {
    // states

    return (
        <div className="mt-42">
            <Container text>
                <Grid columns={1} >
                    <Grid.Column>
                        <ReportItemInfoForm header="Edit Report Item" HTTPMethod="PUT"/>
                    </Grid.Column>
                </Grid>

            </Container>
        </div>
    )
}

export default EditReportItem