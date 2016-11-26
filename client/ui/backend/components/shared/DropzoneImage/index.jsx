import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'


class DropzoneImage extends Component {

  constructor(props) {
    super(props)
    this.state = { errorMessage: '' }    
  }

  static readBase64(file, success, failure){
    const reader = new FileReader()

    reader.onload = (upload) => {
      success(upload.target.result)      
    }

    reader.onerror = () => {
      failure && failure()
    }

    reader.readAsDataURL(file)  
  }

  _handleDrop = (files) => {
    const file = files[0]

    if (!(/.*image\/(gift|jpg|jpeg|png)$/i).test(file.type)) {
      return this.setState({ errorMessage: 'Cannot upload image file' })
    }

    if(this.props.base64) {
      this.constructor.readBase64(file, result => {
        this.props.handleUpdate(result)
        this.setState({ errorMessage: '' })
      }, () => {
        this.setState({ errorMessage: 'Cannot upload image file' })
      })

    } else {
      if(file.preview) {
        // upload as File object
        this.props.handleUpdate(file)  
      } else {
        // wait for preview
        this.constructor.readBase64(file, result => {
          file.preview = result
          this.props.handleUpdate(file)
        })
      }      
    }
    
  }
  

  render() {
    const {props:{value, name}, state: {errorMessage}} = this
    return (
      <div className="pt-20 pb-20">
        <Dropzone
          name={name}
          className='dropzone'
          activeClassName="dropzone active"
          accept="image/*"
          multipe={false}
          onDrop={this._handleDrop}
        >
          {value // value can be File so we have to check for preview first
            ? <img src={value.preview || value} width="100" alt=""/>
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
