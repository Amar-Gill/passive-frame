import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { Grid, Menu, Button, Icon, Input, Header } from 'semantic-ui-react'
import ReportItemInfoSegment from '../components/ReportItemInfoSegment'
import StickyHorizontalDivider from '../components/StickyHorizontalDivider'

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
            <Menu className="fixed-submenu bg-white" secondary stackable>
                <Menu.Item fitted="vertically">
                    <Button
                        onClick={() => {
                            alert("GO BACK")
                        }}
                        compact
                        className="remove-border-radius"
                        icon
                        secondary>
                        <Icon name="chevron left" />
                    </Button>
                    <Header
                        as="h3"
                        style={{ paddingLeft: 6, marginTop: "auto", marginBottom: "auto" }}
                        content="CURRONT PROJECT NAME"
                        subheader="PROJECT NUMBER" />
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button as={Link}
                            // to={{
                            //     pathname: "/projects/" + currentProject.id + "/new_report/",
                            //     state: currentProject
                            // }}
                            className="remove-border-radius" secondary basic icon>
                            <Icon name="file pdf outline" />
                            Download PDF
                    </Button>

                    </Menu.Item>
                    

                    <Menu.Item>
                        <Button as={Link}
                            // to={{
                            //     pathname: "/projects/" + currentProject.id + "/new_report/",
                            //     state: currentProject
                            // }}
                            className="remove-border-radius" secondary icon>
                            <Icon name="plus" />
                            New Item
                    </Button>

                    </Menu.Item>

                </Menu.Menu>
            </Menu>
            <StickyHorizontalDivider topDesktop={88} topMobile={171} />

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