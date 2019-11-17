import React, { useState, useEffect } from 'react'
import { useParams } from "react-router"
import { Menu, Button, Icon, Input, Header, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import StickyHorizontalDivider from '../components/StickyHorizontalDivider'
import ReportInfoSegment from '../components/ReportInfoSegment'


const ProjectPage = (props) => {
    const { projid } = useParams()
    const [currentProject, setCurrentProject] = useState(null)
    const [reports, setReports] = useState(null)

    // set currentProject object from props
    // ALTERNATIVE - use url params to use API call to get current project object.
    useEffect(() => {

        if (props.location.state) {
            setCurrentProject(props.location.state)
        } else {
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
        if (currentProject) {
            // API call to fetch reports for current project
            fetch(`http://127.0.0.1:5000/api/v1/projects/${currentProject.id}/reports`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(result => {
                    setReports(result.reports)
                    console.log(reports)
                })
        }
    }, [currentProject])

    if (!currentProject || !reports) {

        return (<h1 className="mt-42">LOADING</h1>)
    }

    return (
        <div className="mt-42">
            <Menu className="fixed-submenu bg-white" secondary stackable size="small">
                <Menu.Item fitted="vertically">
                    <Button
                        onClick={() => {
                            props.history.push("/projects/")
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
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item >
                        <Input
                            className='icon'
                            icon='search'
                            action={{ type: 'submit' }}
                            placeholder='Filter Project Number'
                        />
                    </Menu.Item>

                    <Menu.Item>
                        <Button as={Link}
                            to={{
                                pathname: "/projects/" + currentProject.id + "/new_report/",
                                state: currentProject
                            }}
                            className="remove-border-radius" secondary icon>
                            <Icon name="plus" />
                            New Report
                    </Button>

                    </Menu.Item>

                </Menu.Menu>
            </Menu>
            <StickyHorizontalDivider topDesktop={88} topMobile={171} />
            <Grid padded="horizontally" columns="1">
                {
                    reports.map(report => {
                        return (
                            <Grid.Row key={report.id}>
                                <Grid.Column>
                                    <ReportInfoSegment project={currentProject} report={report}/>
                                </Grid.Column>
                            </Grid.Row>
                        )
                    })
                }
            </Grid>
        </div>
    )
}

export default ProjectPage
