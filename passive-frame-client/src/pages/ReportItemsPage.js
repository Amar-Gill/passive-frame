import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import ReportItemInfoSegment from '../components/ReportItemInfoSegment'

const ReportItemsPage = (props) => {
    //use states
    const [currentReportId, setCurrentReportId] = useState(null)
    const [reportItems, setReportItems] = useState(null)
    const { projid, reportid } = useParams()
    let history = useHistory()

    // set currentReportId
    useEffect(() => {
        if (props.location.state) {
            setCurrentReportId(props.location.state.reportId)
        } else {
            // use url params
            setCurrentReportId(reportid)
        }
    }, [])

    // set reportItems
    useEffect(() => {
        if (currentReportId) {
            fetch(`http://127.0.0.1:5000/api/v1/reports/${currentReportId}/items`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(result => {
                    setReportItems(result.items)
                })

        }
    }, [currentReportId])


    if (!reportItems)
        return (
            <h1 className="mt-42"> LOADING...</h1>
        )

    return (
        <div className="mt-42">
            <Grid padded="horizontally" columns="1">

                {
                    reportItems.map(item => {
                        return (
                            <Grid.Row key={item.id}>
                                <Grid.Column>
                                    <ReportItemInfoSegment item={item}/>
                                </Grid.Column>
                            </Grid.Row>
                        )
                    })
                }
            </Grid>
        </div>
    )
}

export default ReportItemsPage