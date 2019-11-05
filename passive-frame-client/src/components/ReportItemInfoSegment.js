import React from 'react'
import { Segment } from 'semantic-ui-react'

const ReportItemInfoSegment = props => {
    // set item from props
    const item = props.item

    return (
        <Segment>
            <h3>{item.id}</h3>
            <h3>{item.subject}</h3>
            <h3>{item.content}</h3>
            <h3>{item.reportItemIndex}</h3>
        </Segment>
    )
}

export default ReportItemInfoSegment