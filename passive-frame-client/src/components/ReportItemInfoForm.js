import React, { useState, useEffect } from 'react'
import { Form, TextArea, Menu, Icon, Segment } from 'semantic-ui-react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import ImageUploadWidget from './ImageUploadWidget'
import SavedImageContainer from './SavedImageContainer'

const ReportItemInfoForm = (props) => {

    // states
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const [reportItemIndex, setReportItemIndex] = useState('')
    const [activeItem, setActiveItem] = useState(null) // for edit menu
    const [disabledForm, setDisabledForm] = useState(false)
    const [images, setImages] = useState(props.HTTPMethod == "POST" ? [] : undefined) // prop passed down to ImageUploadWidget
    const [numberOfSavedImages, setNumberOfSavedImages] = useState()

    const { projid, reportid, itemid } = useParams()
    let history = useHistory()
    let location = useLocation()

    // https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });


    // effect for retrieving reportitem info if being edited
    useEffect(() => {
        if (props.HTTPMethod == "PUT" && location.state) {
            setSubject(location.state.item.subject)
            setContent(location.state.item.content)
            setReportItemIndex(location.state.item.reportItemIndex)
            let imagesArray = location.state.item.images
            imagesArray.sort((a, b) => a.key - b.key)
            setNumberOfSavedImages(imagesArray.length)
            setImages(imagesArray)
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
                        let imagesArray = result.images
                        imagesArray.sort((a, b) => a.key - b.key)
                        setNumberOfSavedImages(imagesArray.length)
                        setImages(imagesArray)
                    }
                })
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

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

    // const handleCaptionChange = (event, imageKey) => {

    //     // setCaption state (used for changing photos)
    //     // setCaption(event.target.value)

    //     //setImages state. filter out the imageObject being changed first
    //     const filteredArray = images.filter(image => image.key != imageKey)

    //     // then re-add it to array with new caption
    //     props.setImages([...filteredArray, {
    //         file: null, // need encoded file.
    //         path: null,
    //         caption: event.target.value,
    //         key: imageKey,
    //         s3_image_url: null,
    //         saved: true
    //     }])
    // }

    return (
        <div>
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
                {
                    (images && props.HTTPMethod == "PUT") &&

                    images.map(image => {
                        if (image.saved) {
                            return (
                                <div>
                                    <SavedImageContainer image={image} images={images} setImages={setImages} />
                                    <input
                                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                        type='text'
                                        value={image.caption}
                                        // onChange={handleCaptionChange(image.key)}
                                        />
                                </div>
                            )
                        }
                    })
                }
                {
                    images &&
                    <ImageUploadWidget key={props.HTTPMethod == "POST" ? 0 : numberOfSavedImages} imageKey={props.HTTPMethod == "POST" ? 0 : numberOfSavedImages} images={images} setImages={setImages} />
                }


            </Form>
        </div>
    )
}

export default ReportItemInfoForm