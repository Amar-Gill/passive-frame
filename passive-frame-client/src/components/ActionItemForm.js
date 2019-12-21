import React, { useState } from 'react'
import { Form, Icon, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import { getTime } from 'date-fns'

const selectOptions = [
    { key: "open", value: "open", text: "Open" },
    { key: "closed", value: "closed", text: "Closed" }
]

const ActionItemForm = (props) => {
    // set state
    const [dueDate, setDueDate] = useState(new Date())
    const [status, setStatus] = useState('open')
    const [owner, setOwner] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const action = {
            'dueDate': dueDate,
            'status': status,
            'owner': owner,
            'description': description
        }

        // alert(actions)
        props.setActions([...props.actions, action])
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4
                        style={{ display: 'inline', marginTop: 'auto' }}
                    >New Action Item</h4>

                    <Button
                    secondary
                    icon
                    type='submit'
                    className="remove-border-radius">
                        <Icon name="plus" />
                        Add
                    </Button>
                </div>

                <Form.Group unstackable widths={3}>
                    <Form.Select label="Status" placeholder="Status" options={selectOptions}
                    onChange={(e, { value }) => setStatus(value)}
                    value={status}/>
                    <Form.Input label="Owner" placeholder="Owner"
                    onChange={(e) => setOwner(e.target.value)}
                    value={owner}/>
                    <Form.Field>
                        <label>Due Date</label>
                        <DatePicker
                            selected={dueDate}
                            // disabled={disabledForm}
                            // set reportDate to millisecond time stamp of selected date
                            // peewee ORM requires timestamp for DateTimeField.
                            // http://docs.peewee-orm.com/en/latest/peewee/models.html#field-types-table
                            onChange={date => {
                                setDueDate(getTime(date))
                            }}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                    </Form.Field>
                </Form.Group>
                <Form.TextArea label="Description" rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}/>
            </Form>
            <h5>TESTING:</h5>
            <h6>{status}</h6>
            <h6>{owner}</h6>
            <h6>{getTime(dueDate)}</h6>
            <h6>{description}</h6>

        </div>
    )
}

export default ActionItemForm