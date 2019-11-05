import React from 'react'
import { Segment, Grid, Menu, Label, Header, Button, Icon } from 'semantic-ui-react'

const ReportItemInfoSegment = props => {
    // set item from props
    const item = props.item

    return (
        <Segment>
            <Grid stackable columns="3">
                <Grid.Column>
                    <h3>Item {item.reportItemIndex}</h3>
                    <h3>Subject: {item.subject}</h3>

                </Grid.Column>
                <Grid.Column>
                    <Menu>
                        <Menu.Item>
                            <Button
                            icon
                            secondary>
                                <Icon name="edit"/>
                                Edit Item
                            </Button>
                        </Menu.Item>
                    </Menu>
                    <Menu>
                        <Menu.Item>
                            <Label
                            color="black"
                            secondary>
                                Date Created:
                                <Label.Detail>
                                    DATE
                                </Label.Detail>
                            </Label>
                        </Menu.Item>
                        <Menu.Item>
                            <Label
                            color="black"
                            secondary>
                                Last Edit:
                                <Label.Detail>
                                    DATE
                                </Label.Detail>
                            </Label>
                        </Menu.Item>
                    </Menu>
                </Grid.Column>
                <Grid.Column>
                    <Header
                        as="h3"
                        content="Actions"
                        subheader="Count: 11"
                    />
                    <Menu secondary compact>
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

export default ReportItemInfoSegment