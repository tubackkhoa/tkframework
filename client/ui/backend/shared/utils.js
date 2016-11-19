import React from 'react'
import TextField from 'material-ui/TextField'

import { Field } from 'redux-form'

import inlineStyles from 'ui/shared/styles/MaterialUI'
import TextEditor from 'ui/shared/components/Text/Editor'
import DropzoneImage from 'ui/backend/components/shared/DropzoneImage'
import SocialAccount from 'ui/backend/components/Author/Form/SocialAccount'

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
    handleUpdate={value => input.onChange(value)}
  />  
)

export const renderDropzoneImage = ({ input }) => (
  <DropzoneImage
    {...input}
    handleUpdate={file => input.onChange(file)}
  />
)

export const renderSocialAccount = ({ input }) => (  
  <SocialAccount
    accountType={input.value.account_type}
    url={input.value.url}
    handleUpdate={ url => input.onChange({...input.value, url})}
  />
)

/**
 *
 * render like fieldArray
 *
 */

export const renderSocialAccounts = ({ fields, meta: { error } }) => (
  <div> 
  {fields.map((account, index) => (
    <Field
      name={account}
      key={index}
      component={renderSocialAccount} 
    />                  
  ))}
  </div>
)
  