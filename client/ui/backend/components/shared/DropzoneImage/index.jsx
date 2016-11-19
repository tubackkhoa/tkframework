import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'


class DropzoneImage extends Component {

  constructor(props) {
    super(props)

    this.state = { errorMessage: '' }    
  }

  _handleDrop = (files) => {
    const file = files[0]

    if (!(/.*image\/(gift|jpg|jpeg|png)$/i).test(file.type)) {
      return this.setState({ errorMessage: 'Cannot upload image file' })
    }

    const reader = new FileReader()

    reader.onload = (upload) => {
      this.props.handleUpdate(upload.target.result)
      this.setState({ errorMessage: '' })
    }

    reader.onerror = () => {
      this.setState({ errorMessage: 'Cannot upload image file' })
    }

    reader.readAsDataURL(file)
  }
  

  render() {
    const {props:{value, name}, state: {errorMessage}} = this
    return (
      <div >
        <Dropzone
          name={name}
          activeClassName="dropzone active"
          accept="image/*"
          multipe={false}
          onDrop={this._handleDrop}
        >
          {value 
            ? <img src={value} width="100" alt=""/>
            : <span >Drop file here or click to upload.</span>
          }          
          {errorMessage &&
            <span >{errorMessage}</span>
          }
        </Dropzone>
      </div>
    )
  }
}


export default DropzoneImage
