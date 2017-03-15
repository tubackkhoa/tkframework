import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import injectSheet from 'react-jss'
import styles from './styles'
import { readBase64, isImage, getThumb } from '../utils'

@injectSheet(styles)
class DropzoneImage extends Component {

  static propTypes = {
    handleUpdate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { errorMessage: '' }    
  }  

  _handleDrop = (files) => {
    const file = files[0]

    if (!isImage(file)) {
      return this.setState({ errorMessage: 'Cannot upload image file' })
    }

    if(this.props.base64) {
      readBase64(file, result => {
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
        readBase64(file, result => {
          file.preview = result
          this.props.handleUpdate(file)
        })
      }      
    }
    
  }

  

  render() {
    const {props:{value, name, label, classes, path}, state: {errorMessage}} = this
    return (
      <div className={classes.container}>
        <label>{label}</label>
        <Dropzone
          name={name}
          className={classes.normal}
          activeClassName={`${classes.normal} ${classes.active}`}
          accept="image/*"
          multipe={false}
          onDrop={this._handleDrop}
        >                    
            {value // value can be File so we have to check for preview first
              ? <img className={classes.center} src={getThumb(path, value)} alt=""/>
              : <span className={classes.center}>Drop file here or click to upload.</span>
            }          
            {errorMessage &&
              <span className={classes.center}>{errorMessage}</span>
            }
          
          
        </Dropzone>
      </div>
    )
  }
}


export default DropzoneImage
