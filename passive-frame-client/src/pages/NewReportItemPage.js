import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import StickyHorizontalDivider from '../components/StickyHorizontalDivider'
import { Grid, Container, Menu, Button, Header, Icon, Segment } from 'semantic-ui-react'
import ReportItemInfoForm from '../components/ReportItemInfoForm'
import { format } from 'date-fns'
import ActionItemForm from '../components/ActionItemForm'

const NewReportItemPage = (props) => {
    // states
    const [currentProject, setCurrentProject] = useState(null)
    const [currentReport, setCurrentReport] = useState(null)
    const { projid, reportid } = useParams()
    let history = useHistory()
    let location = useLocation()

    useEffect(() => {
        if (location.state) {
            setCurrentProject(location.state.project)
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
        if (location.state) {
            setCurrentReport(location.state.report)
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
    }, [])

    if (!currentProject || !currentReport) {
        return (
            <h1 className="mt-40"> LOADING...</h1>
        )
    }

    return (
        <div className="mt-40">
            <Menu className="fixed-submenu bg-white" secondary size="small">
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
                                {format(currentReport.report_date, "yyyy-MM-dd HH:mm")}
                            </Header.Subheader>
                        </Header.Content>

                    </Header>
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button
                            type='submit'
                            form='report-item-info-form'
                            className="remove-border-radius" secondary icon>
                            <Icon name="save outline" />
                            Save
                    </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <StickyHorizontalDivider topDesktop={86} topMobile={86} />
            <Container text>
                <Grid columns={1} >
                    <Grid.Column>
                        <ReportItemInfoForm header="New Report Item" HTTPMethod="POST" />
                        <Segment>
                        <ActionItemForm/>

                        </Segment>
                    </Grid.Column>
                </Grid>

            </Container>
        </div>
    )
}

export default NewReportItemPage