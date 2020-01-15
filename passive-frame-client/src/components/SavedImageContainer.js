import React, { useState } from 'react'

const imageStyle = {
    width: 240,
    display: 'block'
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
// https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript


const SavedImageContainer = (props) => {

    const [file, setFile] = useState({
        file: null,
        url: props.image.s3_image_url
    })

    const [caption, setCaption] = useState(props.image.caption)

    const handleCaptionChange = (event) => {

        // setCaption state (used for changing photos)
        setCaption(event.target.value)

        // TODO figure out splice method...
        // const newObject = {
        //         file: props.image.file, // need encoded file.
        //         path: props.image.path,
        //         caption: event.target.value,
        //         key: props.image.key,
        //         s3_image_url: props.image.s3_image_url,
        //         saved: props.image.saved
        //     }

        // const updatedArray = [...props.images]
        // updatedArray.slice(newObject.key, 1, newObject)

        //setImages state. filter out the imageObject being changed first
        const filteredArray = props.images.filter(image => image.key != props.image.key)

        // instantiate new array with new object
        const updatedArray = [...filteredArray, {
            file: props.image.file, // need encoded file.
            path: props.image.path,
            caption: event.target.value,
            key: props.image.key,
            s3_image_url: props.image.s3_image_url,
            saved: 'changed' // caption change to be saved in db
        }]

        // sort by key
        updatedArray.sort((a, b) => a.key - b.key)
        // then re-add it to array with new caption
        props.setImages(updatedArray)
    }

    const handleButtonClick = event => {
        event.preventDefault()

        document.getElementById(`image-input-${props.image.key}`).click()
    }

    const handleImageChange = (event) => {

        event.persist()

        setFile({
            file: event.target.files[0],
            url: URL.createObjectURL(event.target.files[0])
        })

        // create filtered array without image with key==props.imageKey
        const filteredArray = props.images.filter(image => image.key != props.image.key)
        // async loop to encode file
        toBase64(event.target.files[0])
            .then(response => response)
            .then(result => {
                // setState in parent element form
                // instantiate new array with new object
                const updatedArray = [...filteredArray, {
                    file: result, // need encoded file.
                    path: event.target.files[0].name,
                    caption: caption,
                    key: props.image.key,
                    s3_image_url: props.image.s3_image_url,
                    saved: 'changed' // image change to be saved in db/aws
                }]

                // sort by key
                updatedArray.sort((a, b) => a.key - b.key)
                
                // then re-add it to array with new caption
                props.setImages(updatedArray)
            })
    }

    return (
        <div>
            <img style={imageStyle} src={file.url} />
            <button onClick={handleButtonClick}>Change Photo</button>
            <input
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                type='text'
                value={caption}
                onChange={handleCaptionChange} />
            <input id={`image-input-${props.image.key}`}
                accept="image/*"
                type='file'
                onChange={handleImageChange}
                style={{ display: 'none' }} />
        </div>
    )
}

export default SavedImageContainer