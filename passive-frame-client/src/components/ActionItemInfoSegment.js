import React, { useState } from 'react'
import { Button, Segment, Icon, Label, Menu } from 'semantic-ui-react'
import format from 'date-fns/format'
import ActionItemForm from './ActionItemForm'

const ActionItemInfoSegment = (props) => {
    //props?
    const [editMode, setEditMode] = useState(false)
    const { action, actions, setActions, item } = props

    if (editMode) {
        return (
            <Segment>
                <ActionItemForm item={item} actions={actions} setActions={setActions} setEditMode={setEditMode} editMode={editMode} action={action} />
            </Segment>

        )
    }

    return (
        <Segment>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4
                    style={{ display: 'inline', marginTop: 'auto' }}
                >Action Item: {action.actionItemIndex}</h4>

                <Button
                    onClick={() => setEditMode(true)}
                    secondary
                    basic
                    icon
                    type='submit'
                    className="remove-border-radius">
                    <Icon name="edit outline" />

                </Button>
            </div>
            <Menu compact stackable>
                <Menu.Item>
                    Owner: {action.owner}
                </Menu.Item>
                <Menu.Item>
                    Due: {format(action.dueDate, "MMMM d, yyyy h:mm aa")}
                </Menu.Item>
                <Menu.Item>
                    <Label color="black">
                        Status
                            <Label.Detail>
                            {action.closed ? 'closed' : 'open'}

                        </Label.Detail>
                    </Label>
                </Menu.Item>
            </Menu>
            <h4>Description</h4>
            <Segment>
                <div style={{'white-space': 'pre-wrap'}}>
                    {action.description}
                </div>
            </Segment>

        </Segment>

    )
}

export default ActionItemInfoSegment