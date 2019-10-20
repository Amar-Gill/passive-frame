import React, { useState, useEffect, useContext } from 'react'
import { Segment } from 'semantic-ui-react'
import UserContext from '../UserContext'

const ProjectInfoSegment = (props) => {
    return (
        <div>
            <Segment>
                <h1>{props.project_name}</h1>
                <h1>{props.project_number}</h1>
                <h1>{props.organization}</h1>
            </Segment>
        </div>
    )
}

export default ProjectInfoSegment
