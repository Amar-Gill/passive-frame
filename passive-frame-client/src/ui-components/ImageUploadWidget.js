import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Item } from 'semantic-ui-react'

const dropzone = {
  height: 60,
  borderStyle: 'dashed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
}

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
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
}

// https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})

const ImageUploadWidget = (props) => {
  const [files, setFiles] = useState([]) // find
  const [encodedFile, setEncodedFile] = useState()
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
      // async loop to encode file
      toBase64(acceptedFiles[0])
        .then(response => response)
        .then(result => {
          // set local encodedFile state
          setEncodedFile(result)
          // setState in parent element form
          props.setImages(
            [...filteredArray, {
              file: result, // encode this
              path: acceptedFiles[0].path,
              caption: caption,
              key: props.imageKey,
              s3_image_url: null,
              saved: false,
              fromClient: true
            }]
          )
        })
    }
  })

  const thumbs = files.map(file => (
    <Item.Image style={{ cursor: 'pointer' }} onClick={open} src={file.preview} size='small' />
  ))

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const handleCaptionChange = (event) => {
    // setCaption state (used for changing photos)
    setCaption(event.target.value)

    // setImages state. filter out the imageObject being changed first
    const filteredArray = props.images.filter(image => image.key != props.imageKey)

    // then re-add it to array with new caption
    props.setImages([...filteredArray, {
      file: encodedFile, // need encoded file.
      path: acceptedFiles[0].path,
      caption: event.target.value,
      key: props.imageKey,
      s3_image_url: null,
      saved: false,
      fromClient: true
    }])
  }

  return (
    <Item.Group divided>
      {
        acceptedFiles.length
          ?
          <Item>
            {thumbs}
            <Item.Content>
              <Item.Header>Image Number: {props.imageKey + 1}</Item.Header>
              <Item.Meta>
                <span>Unsaved</span>
              </Item.Meta>
              <Item.Extra>
                <label>Caption</label>
                <input
                  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                  value={caption}
                  onChange={e => handleCaptionChange(e)}
                  type='text' placeholder='Enter caption' />
                <input {...getInputProps()} />
              </Item.Extra>
            </Item.Content>
          </Item>

          : <Item style={dropzone} {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drop image files to upload.</p>
          </Item>
      }
      {
        acceptedFiles.length &&
        <ImageUploadWidget key={props.imageKey + 1} imageKey={props.imageKey + 1} images={props.images} setImages={props.setImages} />
      }
    </Item.Group>
  )
}

export default ImageUploadWidget
