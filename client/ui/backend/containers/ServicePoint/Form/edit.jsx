import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'

import inlineStyles from 'ui/shared/styles/MaterialUI'

import { getServicePoint, updateServicePoint, replaceServicePoint } from 'store/actions/service-point'

import * as authSelectors from 'store/selectors/auth'
import * as servicePointSelectors from 'store/selectors/service-point'


import { 
  renderTextField, 
  renderDropzoneImage, 
} from 'ui/backend/shared/utils'

const validate = (values) => {
  const errors = {}
  // first time it is empty
  if(!values) return errors
  if (!values.name) {
    errors.name = 'Enter name'
  } 

  return errors
}

const mapStateToProps = (state) => ({  
  initialValues: servicePointSelectors.getServicePoint(state),
  token: authSelectors.getToken(state)
})

@connect(mapStateToProps, {getServicePoint, updateServicePoint, replaceServicePoint})
@reduxForm({ form: 'ServicePointForm', validate, enableReinitialize:true })
export default class ServicePointEdit extends Component {

  _handleSubmit = (props) => {    
    // call update, after that return to list page
    this.props.updateServicePoint(this.props.token.accessToken, this.props.params.id, props)
  }

  componentDidMount(){
    if(this.props.params.id){
      this.props.getServicePoint(this.props.params.id)
      document.title = 'Edit ServicePoint'
    } else {
      document.title = 'Create ServicePoint'  
      this.props.replaceServicePoint({})
    }
    
  }
  
  render() {    
    const { params:{id}, handleSubmit, submitting } = this.props    
    const submitLabel = !id ? 'Create' : 'Update'    
    return (

      <form onSubmit={handleSubmit(this._handleSubmit)} >
      
        <h2>{submitLabel} Post</h2>
        <Field name="name" label="Enter Name" component={renderTextField} />
        <Field name="address" label="Enter Address" component={renderTextField} />
        <Field name="lat" label="Enter Latitude" component={renderTextField} />
        <Field name="lng" label="Enter Longitude" component={renderTextField} />
        <Field name="description" label="Description" component={renderTextField} />
        <Field name="phone" label="Phone" component={renderTextField} />
        <Field name="image" label="Image" component={renderDropzoneImage} base64={true} />

        <FloatingActionButton label={submitLabel} type="submit"
          style={inlineStyles.floatButton} disabled={submitting} disableTouchRipple={true}>
          <ContentSave />
        </FloatingActionButton>

      </form>

    )
  }
}


