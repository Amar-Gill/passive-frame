import React, { useEffect } from 'react'
import { Segment, Grid, Container, Button, Icon, Menu, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'


const ReportInfoSegment = (props) => {
    // use effects

    return (

        <Segment>
            <Grid stackable columns={3}>
                <Grid.Column >
                    <h3>

                        {
                            props.report.report_type == "test" && `Test Report ${props.report.project_report_index}`
                        }

                        {
                            props.report.report_type == "field" && `Field Report ${props.report.project_report_index}`
                        }

                    </h3>
                    <Menu secondary compact>
                        <Menu.Item>
                            <h5>
                                {format(props.report.report_date, "MMMM d, yyyy h:mm aa")}
                            </h5>
                        </Menu.Item>
                        <Menu.Item>
                            <Label color="black" >
                                Status
                                    <Label.Detail>Draft</Label.Detail>
                            </Label>
                        </Menu.Item>
                    </Menu>
                </Grid.Column>
                <Grid.Column>
                    <h3>
                        Report Items
                    </h3>
                    <Menu secondary compact>
                        <Menu.Item>
                            View Items
                        </Menu.Item>
                        <Menu.Item>
                            New Item
                        </Menu.Item>
                    </Menu>
                </Grid.Column>
                <Grid.Column>
                    <h3>
                        Actions: 420
                    </h3>
                    <Menu secondary compact>
                        <Menu.Item>
                            <Label color="black" >
                                Open
                                    <Label.Detail>5</Label.Detail>
                            </Label>
                        </Menu.Item>
                        <Menu.Item>
                            <Label color="black" >
                                Closed
                                    <Label.Detail>12</Label.Detail>
                            </Label>
                        </Menu.Item>
                        <Menu.Item>
                            <Label color="orange" >
                                Overdue
                                    <Label.Detail>2</Label.Detail>
                            </Label>
                        </Menu.Item>
                    </Menu>
                </Grid.Column>

            </Grid>

        </Segment>

    )
}

export default ReportInfoSegment