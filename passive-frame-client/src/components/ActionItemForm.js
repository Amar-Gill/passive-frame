import React from 'react'
import { Form, Grid, Segment, TextArea, Label, Icon } from 'semantic-ui-react'

const ActionItemForm = () => {
    // set state

    return (
        <div>
            <Form>
                <Form.Field>
                    <Form.Group>
                        <Label >INDEX</Label>
                        <Form.Input placeholder="Status">

                        </Form.Input>
                        <Form.Input placeholder="Owner" />
                        <Form.Input placeholder="Due Date" />
                        <Form.Button secondary icon>
                            <Icon name="save outline" />
                            save
                            </Form.Button>
                    </Form.Group>
                </Form.Field>
                <TextArea rows={4} />
            </Form>

        </div>
    )
}

export default ActionItemForm