import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import MenuItem from 'material-ui/MenuItem'
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps'

import inlineStyles from 'ui/shared/styles/MaterialUI'

import { getServicePoint, updateServicePoint, replaceServicePoint } from 'store/actions/service-point'

import * as authSelectors from 'store/selectors/auth'
import * as servicePointSelectors from 'store/selectors/service-point'

import { GOOGLE_API_KEY } from 'store/constants/api'


import { 
  renderTextField, 
  renderDropzoneImage, 
  renderAutoComplete,
} from 'ui/backend/shared/utils'


const ServicePointGoogleMap = withGoogleMap(({position}) => (
  <GoogleMap    
    defaultZoom={10}
    defaultCenter={position}    
  >    
    <Marker key='VietNam' defaultAnimation={2}
      position={position}     
    />
    
  </GoogleMap>
))

const validate = (values) => {
  const errors = {}
  // first time it is empty
  if(!values) return errors
  if (!values.name) {
    errors.name = 'Enter name'
  } 

  return errors
}

const formSelector = formValueSelector('ServicePointForm')

const mapStateToProps = (state) => ({  
  initialValues: servicePointSelectors.getServicePoint(state),
  token: authSelectors.getToken(state),
  position: formSelector(state, 'lat', 'lng'),  
})

@connect(mapStateToProps, {getServicePoint, updateServicePoint, replaceServicePoint})
@reduxForm({ form: 'ServicePointForm', validate, enableReinitialize:true })
export default class ServicePointEdit extends Component {

  autocompleteService = new google.maps.places.AutocompleteService()

  state = {
    dataSource: [],    
  }
  

  _handleSubmit = (props) => {    
    // call update, after that return to list page
    this.props.updateServicePoint(this.props.token, this.props.params.id, props)
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
    const { params:{id}, handleSubmit, submitting, position:{lat,lng} } = this.props        
    const submitLabel = !id ? 'Create' : 'Update'    

    return (

      <form onSubmit={handleSubmit(this._handleSubmit)} >
      
        <h2>{submitLabel} Post</h2>
        <Field name="name" label="Enter Name" component={renderTextField} />   
             
        <Field name="address" label="Enter Address" component={renderAutoComplete} 
          onUpdateInput={searchText => searchText && this.autocompleteService.getPlacePredictions({
            input: searchText,            
          }, data => this.setState({
            dataSource: data.map(place => place.description),
          }))}
          dataSource={this.state.dataSource}
          filter={searchText => true}
        />

        <Field name="lat" label="Enter Latitude" component={renderTextField} />
        <Field name="lng" label="Enter Longitude" component={renderTextField} />
        {lat && lng && 
          <ServicePointGoogleMap
            containerElement={
              <div style={{ height: 400 }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }          
            position={{lat:+lat,lng:+lng}}
          />
        }
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


