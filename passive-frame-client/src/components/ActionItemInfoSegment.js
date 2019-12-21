import React from 'react'
import { Button, Segment, Grid, Icon, Label, Menu } from 'semantic-ui-react'
import format from 'date-fns/format'

const ActionItemInfoSegment = (props) => {
    //props?
    const { action } = props

    return (
        <Segment>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4
                    style={{ display: 'inline', marginTop: 'auto' }}
                >F.01.A</h4>

                <Button
                    secondary
                    basic
                    icon
                    type='submit'
                    className="remove-border-radius">
                    <Icon name="edit outline" />

                </Button>
            </div>
            <Menu>
                <Menu.Item>
                    {action.owner}
                </Menu.Item>
                <Menu.Item>
                    {format(action.dueDate, "MMMM d, yyyy h:mm aa")}
                </Menu.Item>
                <Menu.Item>
                    <Label color="black">
                        Status
                            <Label.Detail>
                            {action.status}

                        </Label.Detail>
                    </Label>
                </Menu.Item>
            </Menu>
            <label>description</label>
            <Segment>
                {action.description}

            </Segment>

        </Segment>

    )
}

export default ActionItemInfoSegment