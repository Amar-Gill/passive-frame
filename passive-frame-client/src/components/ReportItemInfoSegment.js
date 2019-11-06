import React from 'react'
import { Segment, Grid, Menu, Label, Header, Button, Icon, Container } from 'semantic-ui-react'

const ReportItemInfoSegment = props => {
    // set item from props
    const item = props.item

    return (
        <Segment>
            <Grid stackable columns="3">
                <Grid.Column>
                    <Header>
                        <Header.Content>
                            Item {item.reportItemIndex}
                        </Header.Content>
                        <Header.Subheader>
                            Created at: DATE | Updated at: DATE
                        </Header.Subheader>
                    </Header>
                    <h3>Subject: {item.subject}</h3>
                </Grid.Column>
                <Grid.Column>

                    <h5>Scope Tags:(spec prev. on hover.)</h5>

                    <Grid padded="horizontally">


                        <Button size="small" className="binary-padding-capsule" secondary >
                            Wave Runner
                        </Button>


                        <Button size="small" className="binary-padding-capsule" secondary >
                            Grave Hunter
                        </Button>
                        <Button size="small" className="binary-padding-capsule" secondary >
                            Mage Wonder
                        </Button>
                        <Button size="small" className="binary-padding-capsule" secondary >
                            Earthen Thunder
                        </Button>


                        <Button
                            size="small" className="binary-padding-capsule" color="black"
                        >
                            Curtain Wall
                            </Button>

                        <Button
                            size="small" className="binary-padding-capsule" color="black"
                        >
                            Envelope
                            </Button>




                        <Button
                            size="small" className="binary-padding-capsule" color="black"
                        >
                            Roofing
                            </Button>




                        <Button
                            size="small" className="binary-padding-capsule" color="black"
                        >
                            Passive House
                            </Button>




                        <Button
                            size="small" className="binary-padding-capsule" color="black"
                        >
                            Retrofit
                            </Button>




                        <Button
                            size="small" className="binary-padding-capsule" color="black"
                        >
                            New Construction
                            </Button>




                        <Button
                            size="small" className="binary-padding-capsule" color="black"
                        >
                            Facade
                            </Button>




                        <Button
                            size="small" className="binary-padding-capsule" color="black"
                        >
                            Facade Tectonics
                            </Button>


                    </Grid>
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
                            <Button size="small" className="binary-padding-capsule" secondary basic circular icon>
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