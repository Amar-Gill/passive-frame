import React, { useState, useEffect } from 'react'
import { Form, Grid, Container, Button } from 'semantic-ui-react'
import { useParams, useHistory } from 'react-router-dom'

const NewReportItemPage = (props) => {
    // states
    const [currentReportId, setCurrentReportId] = useState(null)
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const { projid, reportid } = useParams()
    let history = useHistory()

    useEffect(() => {
        if (props.location.state) {
            setCurrentReportId(props.location.state.reportId)
        } else {
            // use url params
            setCurrentReportId(reportid)
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        let newReportItem = {
            subject: subject,
            content: content,
            reportId: currentReportId
        }

        // open chrome without web protection to allow cross origin request:
        // open -a Google\ Chrome --args --disable-web-security --user-data-dir

        // send info to API to create new project
        fetch('http://127.0.0.1:5000/api/v1/report_items/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newReportItem)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
            })
    }

    return (
        <div className="mt-42">
            <Container text>
                <Grid columns={1} >
                    <Grid.Column>
                        <h2>New Report Item</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Field>
                                <label>Subject</label>
                                <input
                                    placeholder='Subject'
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                                <label>Content</label>
                                <input
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </Form.Field>
                            <Container textAlign="right">
                                <Button className="remove-border-radius" secondary type='Submit'>Submit</Button>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        history.goBack()
                                    }}
                                    className="remove-border-radius"
                                    secondary
                                    basic>Back</Button>

                            </Container>
                        </Form>
                    </Grid.Column>
                </Grid>

            </Container>
        </div>
    )
}

export default NewReportItemPage