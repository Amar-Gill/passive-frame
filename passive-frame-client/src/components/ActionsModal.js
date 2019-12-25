import React, { useState, useEffect } from 'react'
import { Modal, Button, Icon, Segment, Form } from 'semantic-ui-react'
import ActionItemForm from './ActionItemForm'
import ActionItemInfoSegment from './ActionItemInfoSegment'

const ActionsModal = (props) => {
    // set states
    const [actions, setActions] = useState([])
    const [item, setItem] = useState(props.item || null)
    const items = props.items || null

    const selectOptions = [
        {
            key: 'projectLevel', value: 0, text: 'Project Level Action'
        }
    ]

    if (items) {
        for (let i = 0; i < items.length; i++) {
            selectOptions.push(
                {
                    key: items[i].id,
                    value: items[i],
                    text: `Report Item ${items[i].reportItemIndex}`
                }
            )
        }
        // sort the array
        selectOptions.sort((a, b) => a.value.reportItemIndex - b.value.reportItemIndex)
    }


    useEffect(() => {
        if (item) {
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
        } else {
            setActions([])
        }
    }, [item])

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
                {
                    item ? `Report Item ${item.reportItemIndex} - Actions` : 'Project Level Actions'
                }

            </Modal.Header>
            <Modal.Content scrolling>
                {
                    items &&
                    <div>
                        <Segment>
                            <Form>
                                {/* <label>Select Report</label> */}
                                <Form.Select width={8} label="Choose Report Item or Make a Project Level Action" options={selectOptions}
                                    onChange={(e, { value }) => setItem(value)} defaultValue={0} />
                            </Form>
                        </Segment>
                    </div>
                }

                <Segment>
                    <ActionItemForm item={item} actions={actions} setActions={setActions} />
                </Segment>
                {
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