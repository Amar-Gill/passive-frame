import React, { useState, useEffect } from 'react'
import { Form, Container, Button, TextArea, Menu, Icon } from 'semantic-ui-react'
import { useParams, useHistory, useLocation } from 'react-router-dom'

const ReportItemInfoForm = (props) => {
    // states
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const [activeItem, setActiveItem] = useState(null) // for edit menu
    const { projid, reportid, itemid } = useParams()
    let history = useHistory()
    let location = useLocation()

    // effect for retrieving reportitem info if being edited
    useEffect(() => {
        if (props.HTTPMethod == "PUT" && location.state) {
            setSubject(location.state.item.subject)
            setContent(location.state.item.content)
        } else if (props.HTTPMethod == "PUT") {
            // use API call
            fetch(`http://127.0.0.1:5000/api/v1/report_items/${itemid}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
                .then(response => response.json())
                .then(result => {
                    setSubject(result.subject)
                    setContent(result.content)
                })
        }
    },[])

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
                urlString = `http://127.0.0.1:5000/api/v1/report_items/${itemid}`
                break
        }

        // open chrome without web protection to allow cross origin request:
        // open -a Google\ Chrome --args --disable-web-security --user-data-dir

        // send info to API to create new report item or save update
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
                if (result.status == "Success" && props.HTTPMethod == "POST") {
                    history.goBack()
                }
            })
    }

    const handleItemClick = (e, { name }) => {
        setActiveItem(name)
    }

    return (
        <div>
            <h2>{props.header}</h2>
            <Form id='report-item-info-form' onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Subject</label>
                    <input
                        placeholder='Subject'
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <label>Content</label>
                    <Menu icon compact size="mini">
                        <Menu.Item
                            name='bold'
                            active={activeItem === 'bold'}
                            onClick={handleItemClick}
                        >
                            <Icon name='bold' />
                        </Menu.Item>

                        <Menu.Item
                            name='italic'
                            active={activeItem === 'italic'}
                            onClick={handleItemClick}
                        >
                            <Icon name='italic' />
                        </Menu.Item>

                        <Menu.Item
                            name='underline'
                            active={activeItem === 'underline'}
                            onClick={handleItemClick}
                        >
                            <Icon name='underline' />
                        </Menu.Item>

                        <Menu.Item
                            name='list'
                            active={activeItem === 'list'}
                            onClick={handleItemClick}
                        >
                            <Icon name='list' />
                        </Menu.Item>

                        <Menu.Item
                            name='list ol'
                            active={activeItem === 'list ol'}
                            onClick={handleItemClick}
                        >
                            <Icon name='list ol' />
                        </Menu.Item>
                    </Menu>
                    <TextArea
                        rows={8}
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
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