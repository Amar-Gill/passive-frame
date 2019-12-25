import React, { useState, useEffect } from 'react'
import { Modal, Button, Icon, Segment } from 'semantic-ui-react'
import ActionItemForm from './ActionItemForm'
import ActionItemInfoSegment from './ActionItemInfoSegment'

const ActionsModal = (props) => {
    // set states
    const [actions, setActions] = useState([])
    // const [reviseAction, setReviseAction] = useState()
    const { item } = props

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/v1/report_items/${item.id}/actions`,
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(result => {
                const actionsArray = [...result.actions]
                actionsArray.sort((a, b) => a.actionItemIndex - b.actionItemIndex)
                setActions(actionsArray)
            })
    }, [])

    return (
        <Modal
            // size='large'
            closeIcon
            centered={false}
            trigger={
                <Button size="small" secondary basic circular icon>
                    <Icon name='plus' />
                </Button>
            }>
            <Modal.Header>
                Report Item {item.reportItemIndex} - Actions
            </Modal.Header>
            <Modal.Content scrolling>
                <Segment>
                    <ActionItemForm item={item} actions={actions} setActions={setActions} />
                </Segment>
                {true &&
                    actions.map(action => {
                        return (
                            <ActionItemInfoSegment item={item} actions={actions} setActions={setActions} key={action.id} action={action} />
                        )
                    })
                }

            </Modal.Content>
        </Modal>
    )
}

export default ActionsModal