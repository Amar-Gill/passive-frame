import React, { useState } from 'react'

const imageStyle = {
    width: 240,
    display: 'block'
}

const SavedImageContainer = (props) => {

    const handleCaptionChange = (event) => {

        // setCaption state (used for changing photos)
        // setCaption(event.target.value)

        //setImages state. filter out the imageObject being changed first
        const filteredArray = props.images.filter(image => image.key != props.image.imageKey)

        // then re-add it to array with new caption
        props.setImages([...filteredArray, {
            file: props.image.file, // need encoded file.
            path: props.image.path,
            caption: event.target.value,
            key: props.image.imageKey,
            s3_image_url: props.image.s3_image_url,
            saved: props.image.saved
        }])
    }

    return (
        <div>
            <img style={imageStyle} src={props.image.s3_image_url} />
            {/* <input
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                type='text'
                value={props.image.caption}
                onChange={handleCaptionChange} /> */}
        </div>
    )
}

export default SavedImageContainer