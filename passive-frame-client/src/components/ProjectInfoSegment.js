import React, { useState, useEffect, useContext } from 'react'
import { Segment, Grid, Container, Button, Icon, Menu, Label, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import UserContext from '../UserContext'

const ProjectInfoSegment = (props) => {
    return (
        <div>
            <Segment className="remove-border-radius">
                <Grid stackable columns={3}>
                    <Grid.Column width={4}>
                        <Header
                            fixed="left"
                            as={Link}
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
                            <Header.Content >
                                {props.project_name}
                            </Header.Content>
                            <Header.Subheader>
                                {props.project_number}
                            </Header.Subheader>
                        </Header>

                        <Menu compact secondary>

                            <Menu.Item>
                                <Button
                                secondary
                                basic
                                icon
                                circular>
                                    <Icon name="edit outline"/>

                                </Button>

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
