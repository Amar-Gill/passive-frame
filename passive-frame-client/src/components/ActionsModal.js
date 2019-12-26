import React, { useState, useEffect } from 'react'
import { Modal, Button, Icon, Segment, Form } from 'semantic-ui-react'
import ActionItemForm from './ActionItemForm'
import ActionItemInfoSegment from './ActionItemInfoSegment'

const ActionsModal = (props) => {
    // set states
    const [actions, setActions] = useState([])
    const [item, setItem] = useState(props.item || null) // item prop passed from ReportItemInfoSegment
    const items = props.report? props.report.items : null // report.items prop passed from ReportInfoSegment

    const selectOptions = [
        {
            key: 'projectLevel', value: 0, text: 'No Reference'
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
            onClose={() => {
                setActions([])
                setItem(props.item || null)
            }
            }
            closeIcon
            centered={false}
            trigger={
                <Button size="small" secondary basic circular icon>
                    <Icon name='plus' />
                </Button>
            }>
            <Modal.Header>
                {
                    item ? `Report Item ${item.reportItemIndex} - Actions` : `Project Level Actions: ${props.project.project_name} - ${props.project.project_number}`
                }

            </Modal.Header>
            <Modal.Content scrolling>
                {
                    items &&
                    <div>
                        <Segment>
                            <Form>
                                {/* {/* <h5>Project Level Action or Select Report Item Reference</h5> */}
                                <Form.Select
                                    width={10}
                                    label="Report Item Reference (optional)"
                                    options={selectOptions}
                                    onChange={(e, { value }) => setItem(value)}
                                    defaultValue={0}
                                />
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