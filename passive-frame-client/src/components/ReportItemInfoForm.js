import React, { useState, useEffect } from 'react'
import { Form, TextArea, Menu, Icon, Segment } from 'semantic-ui-react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import ImageUploadWidget from './ImageUploadWidget'

const ReportItemInfoForm = (props) => {
    // states
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const [reportItemIndex, setReportItemIndex] = useState(null)
    const [activeItem, setActiveItem] = useState(null) // for edit menu
    const [disabledForm, setDisabledForm] = useState(false)
    const [images, setImages] = useState([]) // prop passed down to ImageUploadWidget

    const { projid, reportid, itemid } = useParams()
    let history = useHistory()
    let location = useLocation()

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    // https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript

    // async function _toBase64(file) {
    //     const encodedFile = await toBase64(file)
    //     // const result = await resolveAfter2Seconds();
    //     // console.log(encodedFile)
    //     return encodedFile
    // }

    // effect for retrieving reportitem info if being edited
    useEffect(() => {
        if (props.HTTPMethod == "PUT" && location.state) {
            setSubject(location.state.item.subject)
            setContent(location.state.item.content)
            setReportItemIndex(location.state.item.reportItemIndex)
        } else if (props.HTTPMethod == "PUT") {
            // use API call if button link not used
            fetch(`http://127.0.0.1:5000/api/v1/report_items/${itemid}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
                .then(response => response.json())
                .then(result => {
                    // disable form if incorrect url provided
                    if (result.reportId != reportid || result.projectId != projid) {
                        setDisabledForm(true)
                    } else {
                        setSubject(result.subject)
                        setContent(result.content)
                        setReportItemIndex(result.reportItemIndex)
                    }
                })
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        // async function encode(array) {
        //     let encodedImages = []
        //     for (let i = 0; i < array.length; i++) {
        //         encodedImages.push(
        //             {
        //                 file: await toBase64(array[i].file), // encode this
        //                 path: array[i].path,
        //                 caption: array[i].caption,
        //                 key: array[i].key
        //             }
        //         )
        //     }

        // }

        // const encodedImages = encode(images)
        // // convert all image files to base64 enc string
        // setTimeout(function(){
        //     console.log('timeout completed')
        // }, 12000)


        let reportItem = {
            subject: subject,
            content: content,
            reportItemIndex: reportItemIndex,
            reportId: reportid,
            images: images
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

        const options = {
            method: props.HTTPMethod,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(reportItem)
        }

        // open chrome without web protection to allow cross origin request:
        // open -a Google\ Chrome --args --disable-web-security --user-data-dir
        // if (options && options.headers) {
        //     delete options.headers['Content-Type'];
        // }

        console.log(reportItem)

        // send info to API to create new report item or save update
        fetch(urlString, options) // fetch returns a promise
            .then(response => response.json())
            .then(result => {
                alert(result.message)
                if (result.status == "Success" && props.HTTPMethod == "POST") {
                    history.push(`/projects/${projid}/reports/${reportid}/items/${result.reportItem.id}/edit/`)
                }
            })
    }

    const handleItemClick = (e, { name }) => {
        setActiveItem(name)
    }

    return (
        <div>
            <Segment>
                <h4>{props.header}</h4>
                <Form id='report-item-info-form' onSubmit={handleSubmit} enctype="multipart/form-data">
                    <Form.Field>
                        {/* <label>Subject</label> */}
                        <Form.Group unstackable>
                            <Form.Input
                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                width={12}
                                placeholder='Subject'
                                label="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                disabled={disabledForm}
                            />
                            <Form.Input
                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                width={4}
                                placeholder='Item Number'
                                label="Item Number"
                                disabled={props.HTTPMethod == "POST" || disabledForm}
                                value={reportItemIndex}
                                onChange={(e) => setReportItemIndex(e.target.value)}
                            />
                        </Form.Group>
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
                            disabled={disabledForm}
                        />
                    </Form.Field>
                    {/* <Container textAlign="right">
                    <Button className="remove-border-radius" secondary type='Submit'>Submit</Button>
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            history.goBack()
                        }}
                        className="remove-border-radius"
                        secondary
                        basic>Back</Button>
                </Container> */}
                    <ImageUploadWidget key={0} imageKey={0} images={images} setImages={setImages} />
                </Form>
            </Segment>
        </div>
    )
}

export default ReportItemInfoForm