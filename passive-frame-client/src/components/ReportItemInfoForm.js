import React, { useState } from 'react'
import { Form, Container, Button } from 'semantic-ui-react'
import { useParams, useHistory } from 'react-router-dom'

const ReportItemInfoForm = (props) => {
    // states
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const { projid, reportid, itemid } = useParams()
    let history = useHistory()


    const handleSubmit = (e) => {
        e.preventDefault()

        let reportItem = {
            subject: subject,
            content: content,
            reportId: reportid
        }

        let urlString = null
        switch (props.HTTPMethod) {
            case "POST":
                urlString = 'http://127.0.0.1:5000/api/v1/report_items/'
                break;
            case "PUT":
                urlString= `http://127.0.0.1:5000/api/v1/report_items/${itemid}`
                break
        }

        // open chrome without web protection to allow cross origin request:
        // open -a Google\ Chrome --args --disable-web-security --user-data-dir

        // send info to API to create new project
        fetch(urlString, {
            method: props.HTTPMethod,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(reportItem)
        })
            .then(response => response.json())
            .then(result => {
                alert(result.message)
            })
    }

    return (
        <div>
            <h2>{props.header}</h2>
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
        </div>
    )
}

export default ReportItemInfoForm