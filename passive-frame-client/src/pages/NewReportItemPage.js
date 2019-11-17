import React from 'react'
import { Grid, Container } from 'semantic-ui-react'
import ReportItemInfoForm from '../components/ReportItemInfoForm'

const NewReportItemPage = (props) => {
    // states

    return (
        <div className="mt-40">
            <Container text>
                <Grid columns={1} >
                    <Grid.Column>
                        <ReportItemInfoForm header="New Report Item" HTTPMethod="POST"/>
                    </Grid.Column>
                </Grid>

            </Container>
        </div>
    )
}

export default NewReportItemPage