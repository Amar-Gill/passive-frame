import React from 'react'
import { Segment, Grid, Menu, Label, Header, Button, Icon } from 'semantic-ui-react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import ActionsModal from './ActionsModal'

const ReportItemInfoSegment = props => {
    // set item from props
    const item = props.item
    const project = props.project
    const report = props.report

    return (
        <Segment>
            <Grid stackable columns="3">
                <Grid.Column>
                    <Header as="h4">
                        <Header.Content>
                            Item {item.reportItemIndex}
                        </Header.Content>
                        <Header.Subheader>
                            Created: {format(item.createdAt, "yyyy-MM-dd")} | Updated: {format(item.updatedAt, "yyyy-MM-dd")}
                        </Header.Subheader>
                    </Header>

                    <h4 >Subject: {item.subject}</h4>
                    <Menu secondary compact size="tiny">
                        <Menu.Item>
                            <Button
                                as={Link}
                                to={{
                                    pathname: `/projects/${props.projid}/reports/${item.reportId}/items/${item.id}/edit/`,
                                    state: {
                                        project: project,
                                        report: report,
                                        item: item
                                    }
                                }}
                                secondary basic circular icon>
                                <Icon name="edit" />
                            </Button>

                        </Menu.Item>

                        <Menu.Item>
                            <Button secondary basic circular icon>
                                <Icon name="camera" />
                            </Button>

                        </Menu.Item>
                        <Menu.Item>
                            <Button secondary basic circular icon>
                                <Icon name="hdd" />
                            </Button>

                        </Menu.Item>

                    </Menu>

                </Grid.Column>
                <Grid.Column>

                    <h5>Scope Tags:(spec prev. on hover.)</h5>

                    <Grid padded="horizontally">


                        <Button size="small" className="binary-padding-capsule" secondary>
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
                            <ActionsModal item={item}/>
                        </Menu.Item>
                    </Menu>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}

export default ReportItemInfoSegment