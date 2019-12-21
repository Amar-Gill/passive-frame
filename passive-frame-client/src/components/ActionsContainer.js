import React, { useState, useEffect } from 'react'
import { Segment } from 'semantic-ui-react'
import ActionItemForm from './ActionItemForm'

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
                        <Segment>
                            <h6>
                                owner: {action.owner}
                            </h6>
                            <h6>

                                description: {action.description}
                            </h6>
                            <h6>

                                status: {action.status}
                            </h6>
                        </Segment>
                    )
                })
            }
        </div>
    )
}

export default ActionsContainer