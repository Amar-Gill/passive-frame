import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const dropzone = {
    height: 60,
    borderStyle: 'dashed'
}

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};



const ImageUploadWidget = (props) => {

    const [files, setFiles] = useState([]); // find
    const [caption, setCaption] = useState('')

    const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
        // accept only image files
        accept: 'image/*',
        onDrop: acceptedFiles => {
            // set files state for thumbnail rendering
            setFiles(
                acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            )
            // create filtered array without image with key==props.imageKey
            const filteredArray = props.images.filter(image => image.key != props.imageKey)
            // setState in parent element form
            props.setImages(
                [...filteredArray, {
                    path: acceptedFiles[0].path,
                    caption: caption,
                    key: props.imageKey
                }]
            );
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const handleCaptionChange = (event) => {

        // setCaption state (used for changing photos)
        setCaption(event.target.value)

        //setImages state. filter out the imageObject being changed first
        const filteredArray = props.images.filter(image => image.key != props.imageKey)

        // then re-add it to array with new caption
        props.setImages([...filteredArray, {
            // path: imageObject.path,
            path: acceptedFiles[0].path,
            caption: event.target.value,
            key: props.imageKey
        }])
    }

    return (
        <div>
            <section className="container">
                {
                    acceptedFiles.length ?
                        <aside style={{ thumbsContainer }}>
                            <ul>{thumbs}</ul>
                            {/* <button onClick={e =>  e.preventDefault()}>Change Photo</button> */}
                            <button type='button' onClick={open}>Change Photo</button>
                            <input  {...getInputProps()} />
                            {/* TODO change acceptedFile[0] with input */}
                            <input
                                value={caption}
                                onChange={e => handleCaptionChange(e)}
                                type='text' placeholder='enter caption' />
                        </aside>
                        :
                        <div style={dropzone} {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop image files here, or click to select files</p>
                        </div>
                }
            </section>
            {
                acceptedFiles.length &&
                <ImageUploadWidget key={props.imageKey + 1} imageKey={props.imageKey + 1} images={props.images} setImages={props.setImages} />
            }
        </div>
    );
}

export default ImageUploadWidget