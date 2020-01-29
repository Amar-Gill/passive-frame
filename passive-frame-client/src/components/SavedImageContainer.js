import React, { useState, useEffect } from 'react'

const imageStyle = {
  width: 240,
  display: 'block'
}

function dataURLtoFile (dataurl, filename) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}
// https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f

// pass props.image into constructor function
const checkImageFile = (image) => {
  console.log(`CONSTRUCTOR RUNNING FOR IMAGE-KEY: ${image.key}`)
  // decode file - because file was sent to server but could not be saved
  // same encoded file value present but fromClient flag switched to false
  if (image.file && !image.fromClient) {
    const fileObject = dataURLtoFile(image.file, image.path)
    console.log('BUILDING URL FOR UNSAVED IMAGE FILE')
    return {
      file: fileObject,
      url: URL.createObjectURL(fileObject) // so unsaved image can be rendered
    }

    // rendering a saved file
    // meaning no file value present
  } else if (!image.fromClient) {
    return {
      file: null,
      url: image.s3_image_url
    }
  }
}

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})
// https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript

const SavedImageContainer = props => {
  // if file -> decode string and set url.. ;)
  // else file: null, url: props.image.s3_image_url

  const [file, setFile] = useState(checkImageFile(props.image))
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

    // setImages state. filter out the imageObject being changed first
    const filteredArray = props.images.filter(image => image.key != props.image.key)

    // instantiate new array with new object
    const updatedArray = [...filteredArray, {
      file: props.image.file, // need encoded file.
      path: props.image.path,
      caption: event.target.value,
      key: props.image.key,
      s3_image_url: props.image.s3_image_url,
      saved: 'changed', // caption change to be saved in db
      fromClient: true // set fromClient false for api responses
    }]

    // sort by key
    updatedArray.sort((a, b) => a.key - b.key)
    // then re-add it to array with new caption
    props.setImages(updatedArray)
  }

  const handleButtonClick = (event) => {
    event.preventDefault()

    document.getElementById(`image-input-${props.image.key}`).click()
  }

  const handleImageChange = (event) => {
    event.persist()

    console.log(event.target.files[0])

    // const fileObject = event.target.files[0]

    setFile({
      file: event.target.files[0],
      url: URL.createObjectURL(event.target.files[0])
    })

    // TODO - effect for preventing memory leak caused by objectURL

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
          s3_image_url: null, // file value present means new image coming. no need for old image url
          saved: 'changed', // image change to be saved in db/aws
          fromClient: true
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
        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
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
