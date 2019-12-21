import React, { useState, useEffect } from 'react'
import { Segment } from 'semantic-ui-react'
import ActionItemForm from './ActionItemForm'
import ActionItemInfoSegment from './ActionItemInfoSegment'

const ActionsContainer = () => {
    // set states
    const [actions, setActions] = useState([])



    return (
        <div>
            <Segment>
                <ActionItemForm actions={actions} setActions={setActions} />
            </Segment>
            {
                actions.map(action => {
                    return (
                        <ActionItemInfoSegment key={action.dueDate} action={action}/>
                    )
                })
            }
        </div>
    )
}

export default ActionsContainer