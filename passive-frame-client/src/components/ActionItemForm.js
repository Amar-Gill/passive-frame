import React, { useState, useEffect } from 'react'
import { Form, Icon, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import { getTime } from 'date-fns'
import { useParams } from 'react-router-dom'

const selectOptions = [
    { key: "open", value: "open", text: "Open" },
    { key: "closed", value: "closed", text: "Closed" }
]

const ActionItemForm = (props) => {
    // set state
    const [dueDate, setDueDate] = useState(props.editMode ? props.action.dueDate : getTime(new Date()))
    const [status, setStatus] = useState(props.editMode ? (props.action.closed ? 'closed' : 'open') : 'open')
    const [owner, setOwner] = useState(props.editMode ? props.action.owner : '')
    const [description, setDescription] = useState(props.editMode ? props.action.description : '')
    const { itemid } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()
        const actionObject = {
            'dueDate': dueDate,
            'status': status,
            'owner': owner,
            'description': description, // rename API endpoint to use description?
            'reportItemId': itemid
        }

        let HTTPMethod = null

        props.editMode? HTTPMethod = "PUT" : HTTPMethod = "POST"

        let urlString = null

        props.editMode? urlString = `http://127.0.0.1:5000/api/v1/actions/${props.action.id}` : urlString = `http://127.0.0.1:5000/api/v1/actions/`

        fetch(urlString, {
            method: HTTPMethod,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(actionObject)
        })
            .then(response => response.json())
            .then(result => {
                alert(result.message)
                if (result.status == "Success" && HTTPMethod == "POST") {
                    props.setActions([...props.actions, result.action])
                    setStatus('open')
                    setDescription('')
                    setOwner('')
                } else if (result.status == "Success" && HTTPMethod == "PUT") {
                    // use filter to create new array of actions minus the one edited
                    let actionsArray = props.actions.filter(action => action.id != props.action.id)
                    // return the updated action object from api and append to array
                    actionsArray = [...actionsArray, result.action]
                    // sort the array
                    actionsArray.sort( (a,b) => a.actionItemIndex - b.actionItemIndex)
                    // set state
                    props.setActions(actionsArray)
                    // set editMode to false
                    props.setEditMode(false)
                }
            })
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4
                        style={{ display: 'inline', marginTop: 'auto' }}>
                        {
                            props.editMode ? `Revising Action: ${props.action.actionItemIndex}` : "New Action"
                        }
                    </h4>
                    <span>
                        <Button
                            secondary
                            icon
                            type='submit'
                            className="remove-border-radius">
                            <Icon name={props.editMode ? "save outline" : "plus"} />
                            {
                                props.editMode ? "Save" : "Add"
                            }
                        </Button>
                        {
                            props.editMode &&
                            <Button
                                onClick={
                                    (e) => {
                                        e.preventDefault()
                                        props.setEditMode(false)
                                    }
                                }
                                secondary
                                basic
                                icon
                                className="remove-border-radius">
                                <Icon name="close" />

                            </Button>
                        }
                    </span>

                </div>

                <Form.Group unstackable widths={3}>
                    <Form.Select label="Status" placeholder="Status" options={selectOptions}
                        onChange={(e, { value }) => setStatus(value)}
                        value={status} />
                    <Form.Input label="Owner" placeholder="Owner"
                        onChange={(e) => setOwner(e.target.value)}
                        value={owner} />
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
                    onChange={e => setDescription(e.target.value)} />
            </Form>
            <h5>TESTING:</h5>
            <h6>{status}</h6>
            <h6>{owner}</h6>
            <h6>{getTime(dueDate)}</h6>
            <h6>{getTime(dueDate) / 1000}</h6>
            <h6>{description}</h6>

        </div>
    )
}

export default ActionItemForm