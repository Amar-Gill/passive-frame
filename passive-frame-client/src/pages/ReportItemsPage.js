import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

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
            {
                reportItems.map(item => {
                    return (
                        <div key={item.id}>
                            <h3>{item.id}</h3>
                            <h3>{item.subject}</h3>
                            <h3>{item.content}</h3>
                            <h3>{item.reportItemIndex}</h3>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ReportItemsPage