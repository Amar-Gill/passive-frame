import React, { useEffect } from 'react'
import { Segment, Grid, Container, Progress, Button, Icon, Menu, Label, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'


const ReportInfoSegment = (props) => {
    // use effects

    return (

        <Segment>
            <Grid verticalAlign="top" stackable columns={3}>
                <Grid.Column >
                    <Header
                        as="h4"

                    >
                        <Header.Content>
                            {
                                props.report.report_type == "test" && `Test Report ${props.report.project_report_index}`

                            }
                            {

                                props.report.report_type == "field" && `Field Report ${props.report.project_report_index}`
                            }
                        </Header.Content>
                        <Header.Subheader>
                            {format(props.report.report_date, "MMMM d, yyyy h:mm aa")}
                        </Header.Subheader>

                    </Header>
                    <Menu secondary compact size="tiny">

                        <Menu.Item >
                            <Label color="black" >
                                Status
                                    <Label.Detail>Draft</Label.Detail>
                            </Label>
                        </Menu.Item>
                        <Menu.Item>
                            <Button basic secondary icon circular
                                as={Link}
                                to={{
                                    pathname: `/projects/${props.project.id}/edit_report/${props.report.id}/`
                                }}
                            >
                                <Icon name="edit outline" />
                                {/* Edit */}
                            </Button>
                        </Menu.Item>
                        <Menu.Item >
                            <Button basic secondary icon circular>
                                <Icon name="file pdf outline" />
                                {/* PDF */}
                            </Button>
                        </Menu.Item>
                        <Menu.Item >
                            <Button  secondary icon circular>
                                <Icon name="code" />
                                {/* Issue */}
                            </Button>
                        </Menu.Item>

                    </Menu>

                </Grid.Column>
                <Grid.Column>
                    <Header
                        as="h4"
                        content="Report Items"
                        subheader="Count: 4 | Pages: 14 | Assets: 2"
                    />

                    <Menu secondary compact size="tiny">
                        <Menu.Item>
                            <Button
                                as={Link}
                                to={{
                                    pathname: `/projects/${props.report.project_id}/reports/${props.report.id}/`,
                                    state: {
                                        report: props.report,
                                        project: props.project
                                    }
                                }}
                                className="remove-border-radius"
                                icon
                                secondary
                                basic
                                compact>
                                <Icon name="content" />
                                View
                            </Button>
                        </Menu.Item>
                        <Menu.Item>
                            <Button
                                as={Link}
                                to={{
                                    pathname: `/projects/${props.report.project_id}/reports/${props.report.id}/new_item/`,
                                    state: {
                                        reportId: props.report.id
                                    }
                                }}
                                className="remove-border-radius"
                                icon
                                secondary
                                compact>
                                <Icon name="edit outline" />
                                New
                            </Button>
                        </Menu.Item>
                    </Menu>
                </Grid.Column>
                <Grid.Column>
                    <Header
                        as="h4"
                        content="Actions"
                        subheader="Count: 11"
                    />
                    <Menu secondary compact size="tiny">
                        <Menu.Item>
                            <Label color="black" >
                                Open
                                    <Label.Detail>5</Label.Detail>
                            </Label>
                        </Menu.Item>
                        <Menu.Item>
                            <Label color="black" >
                                Overdue
                                    <Label.Detail>2</Label.Detail>
                            </Label>
                        </Menu.Item>
                        <Menu.Item>
                            <Button secondary basic circular icon>
                                <Icon name='plus' />
                            </Button>
                        </Menu.Item>
                    </Menu>
                </Grid.Column>

            </Grid>

        </Segment>

    )
}

export default ReportInfoSegment