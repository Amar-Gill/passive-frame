import React, { useState, useEffect } from 'react'
import { Segment } from 'semantic-ui-react'
import ActionItemForm from './ActionItemForm'
import ActionItemInfoSegment from './ActionItemInfoSegment'
import { useParams } from 'react-router-dom'

const ActionsContainer = () => {
    // set states
    const [actions, setActions] = useState([])
    // const [reviseAction, setReviseAction] = useState()
    const { itemid } = useParams()

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/v1/report_items/${itemid}/actions`,
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(result => {
                setActions([...result.actions])
            })
    }, [])


    return (
        <div>
            {
                actions.map(action => {
                    return (
                        <ActionItemInfoSegment key={action.id} action={action} />
                    )
                })
            }
            <Segment>
                <ActionItemForm actions={actions} setActions={setActions} />
            </Segment>
        </div>
    )
}

export default ActionsContainer