import React from 'react'
import { Segment, Grid, Container, Button, Icon, Menu, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const ReportInfoSegment = (props) => {
    // use effects

    return (
        <div>
            <h3>
                {props.report.report_id}
            </h3>
            <h3>
                {props.report.report_index}
            </h3>
            <h3>
                {props.report.report_type}
            </h3>
            <h3>
                {props.report.project_id}
            </h3>
        </div>
    )
}

export default ReportInfoSegment