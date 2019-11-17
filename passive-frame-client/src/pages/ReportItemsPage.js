import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { Grid, Menu, Button, Icon, Input, Header } from 'semantic-ui-react'
import ReportItemInfoSegment from '../components/ReportItemInfoSegment'
import StickyHorizontalDivider from '../components/StickyHorizontalDivider'
import { format } from 'date-fns'

const ReportItemsPage = (props) => {
    //use states
    const [currentReport, setCurrentReport] = useState(null)
    const [currentProject, setCurrentProject] = useState(null) // info needed for submenu
    const [reportItems, setReportItems] = useState(null)
    const { projid, reportid } = useParams()
    let history = useHistory()

    // set currentProject
    // use state passed from projectpage to prevent extra api call unless necessary
    useEffect(() => {
        if (props.location.state) {
            setCurrentProject(props.location.state.project)
        } else {
            // use url params
            // API call to fetch current project
            fetch(`http://127.0.0.1:5000/api/v1/projects/${projid}`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(result => {
                    setCurrentProject(result)
                })
        }
    }, [])

    useEffect(() => {
        if (props.location.state) {
            setCurrentReport(props.location.state.report)
        } else {
            // use url params
            // API call to fetch current report
            fetch(`http://127.0.0.1:5000/api/v1/reports/${reportid}`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(result => {
                    setCurrentReport(result)
                })
        }
    })


    // set reportItems
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/v1/reports/${reportid}/items`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(result => {
                setReportItems(result.items)
            })
    })


    if (!reportItems || !currentReport || !currentProject)
        return (
            <h1 className="mt-42"> LOADING...</h1>
        )

    return (
        <div className="mt-42">
            <Menu className="fixed-submenu bg-white" secondary stackable size="small">
                <Menu.Item fitted="vertically">
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            history.goBack()
                        }}
                        compact
                        className="remove-border-radius"
                        icon
                        secondary>
                        <Icon name="chevron left" />
                    </Button>
                    <Header
                        as="h4"
                        style={{ paddingLeft: 6, marginTop: "auto", marginBottom: "auto" }}
                        content={currentProject.project_name}
                        subheader={currentProject.project_number} />
                    <Header as="h4" style={{ paddingLeft: 12, marginTop: "auto", marginBottom: "auto" }}>
                        <Icon fitted size="mini" name="triangle left" />
                        <Header.Content>
                            {
                                currentReport.report_type == "test" && `Test Report ${currentReport.project_report_index}`

                            }
                            {

                                currentReport.report_type == "field" && `Field Report ${currentReport.project_report_index}`
                            }
                            <Header.Subheader>
                                {format(currentReport.report_date, "MMMM d, yyyy h:mm aa")}
                            </Header.Subheader>
                        </Header.Content>

                    </Header>
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button
                            className="remove-border-radius" secondary basic icon>
                            <Icon name="file pdf outline" />
                            Download PDF
                    </Button>

                    </Menu.Item>


                    <Menu.Item>
                        <Button as={Link}
                            to={{
                                pathname: `/projects/${projid}/reports/${reportid}/new_item`,
                                state: currentProject
                            }}
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
                                    <ReportItemInfoSegment projid={projid} item={item} />
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