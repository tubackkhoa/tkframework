import React, { Component, PropTypes } from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ActionDelete from 'material-ui/svg-icons/action/delete'

import Dropzone from 'react-dropzone'
import injectSheet from 'react-jss'
import styles from './styles'
import { readBase64, isImage } from '../utils'

@injectSheet(styles)
class DropzoneImages extends Component {

  static propTypes = {
    handleAddFile: PropTypes.func.isRequired,
    handleDeleteFile: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { errorMessage: '' }    
  }
  

  _handleDrop = (files) => {
    files.filter(file => isImage(file)).forEach((file) => {        
      if(this.props.base64) {
        readBase64(file, result => {
          this.props.handleAddFile(result)
          this.setState({ errorMessage: '' })
        }, () => {
          this.setState({ errorMessage: `Cannot upload ${file.name}` })
        })
      } else {
        if(file.preview) {
          // upload as File object
          this.props.handleAddFile(file)  
        } else {
          // wait for preview
          readBase64(file, result => {
            file.preview = result
            this.props.handleAddFile(file)
          })
        }      
      }    

    })
    
  }

  render() {
    const {props:{value, name, label, classes, path=''}, state: {errorMessage}} = this    
    return (
      <div className={classes.container}>
        <label>{label}</label>
        <Dropzone
          name={name}
          className={classes.normal}
          activeClassName={`${classes.normal} ${classes.active}`}
          accept="image/*"
          multipe={true}
          onDrop={this._handleDrop}
        >                                        
            {errorMessage 
              ? <span className={classes.center}>{errorMessage}</span>
              : <span className={classes.center}>Drop files here or click to upload.</span>
            }          
          
        </Dropzone>
        {value &&                    
          <GridList cellHeight={150}>
            <Subheader>Preview</Subheader>
            {value.map((file, index) => // value can be File so we have to check for preview first
              <GridTile
                key={index}
                title={index+1}
                actionIcon={<IconButton onClick={e => this.props.handleDeleteFile(index, file)}><ActionDelete color="white" /></IconButton>}
              >
                <img src={file.preview || (path+file)} alt=""/>
              </GridTile>
            )}
          </GridList>          
        }  

      </div>
    )
  }
}


export default DropzoneImages
