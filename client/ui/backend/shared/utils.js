import React from 'react'
import TextField from 'material-ui/TextField'

import inlineStyles from 'ui/shared/styles/MaterialUI'
import TextEditor from 'ui/shared/components/Text/Editor'
import DropzoneImage from 'ui/backend/components/shared/DropzoneImage'

export const renderTextField = ({ input, label, type, meta: { touched, error, warning } }) => (  
  <TextField
    {...input}
    floatingLabelText={label}
    hintText={label}
    fullWidth={true}
    type={type}
    style={inlineStyles.textField}
    errorText={touched && error ? error : ''}
  />
)

export const renderTextEditor = ({ input }) => (
  <TextEditor    
    {...input}
    handleUpdate={ (value) => { input.onChange(value) }}
  />  
)

export const renderDropzoneImage = ({ input }) => (
  <DropzoneImage
    {...input}
    handleUpdate={ (file) => input.onChange(file) }
  />
)


