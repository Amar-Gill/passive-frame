import React, { useState, useEffect, useContext } from 'react'
import { Segment, Grid, Container, Button, Icon, Menu, Label, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import UserContext from '../UserContext'

const ProjectInfoSegment = (props) => {
    return (
        <div>
            <Segment className="remove-border-radius">
                <Grid stackable columns={3}>
                    <Grid.Column textAlign="center" width={4}>
                        <Link
                            // as={Link}
                            // secondary
                            // animated
                            // size="large"
                            // content={props.project_name}
                            // icon="chevron right"
                            // labelPosition="right"
                            // basic
                            // className="remove-border-radius"
                            style={{ color: "black" }}
                            to={{
                                pathname: '/projects/' + props.id + "/",
                                state: {
                                    id: props.id,
                                    project_name: props.project_name,
                                    project_number: props.project_number,
                                    organization: props.organization
                                }
                            }}>
                            {/* <Button.Content visible> */}
                                <h2>{props.project_name}</h2>
                            {/* </Button.Content>
                            <Button.Content hidden>
                                <h2>View Project</h2>
                            </Button.Content> */}
                            {/* <Icon name="chevron right"/> */}
                        </Link>
                        <Menu compact secondary>
                            <Menu.Item>
                                <h4>{props.project_number}</h4>
                            </Menu.Item>
                            <Menu.Item position="right">
                                <Button secondary basic circular icon>
                                    <Icon name="favorite" />
                                </Button>
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>

                    <Grid.Column verticalAlign="middle" width={6}>
                    <Header
                        as="a"
                        content="Reports"
                        subheader="Field: 4 | Test: 2"
                    />
                        <Menu compact secondary>
                            <Menu.Item>
                                <Label color="black">
                                    Issued
                                    <Label.Detail>0</Label.Detail>
                                </Label>
                            </Menu.Item>
                            <Menu.Item>
                                <Label color="black" >
                                    Draft
                                    <Label.Detail>0</Label.Detail>
                                </Label>
                            </Menu.Item>
                            <Menu.Item>
                                <Button secondary basic circular icon size="medium">
                                    <Icon name='plus' />
                                </Button>
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>

                    <Grid.Column verticalAlign="middle" width={6}>
                    <Header
                        as="a"
                        content="Actions"
                        subheader="Count: 11"
                    />
                        <Menu compact secondary>
                            <Menu.Item>
                                <Label color="black" >
                                    Open
                                    <Label.Detail>0</Label.Detail>
                                </Label>
                            </Menu.Item>
                            <Menu.Item>
                                <Label color="black" >
                                    Overdue
                                    <Label.Detail>0</Label.Detail>
                                </Label>
                            </Menu.Item>
                            <Menu.Item position="right">
                                <Button secondary basic circular icon>
                                    <Icon name='plus' />
                                </Button>
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>
                </Grid>
            </Segment>
        </div>
    )
}

export default ProjectInfoSegment
