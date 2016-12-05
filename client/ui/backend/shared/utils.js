import React from 'react'
import TextField from 'material-ui/TextField'

import { Field } from 'redux-form'

import inlineStyles from 'ui/shared/styles/MaterialUI'
import TextEditor from 'ui/shared/components/Text/Editor'
import DropzoneImage from 'ui/backend/components/shared/DropzoneImage'
import SocialAccount from 'ui/backend/components/Author/Form/SocialAccount'
import DatePicker from 'ui/backend/components/shared/CustomDatePicker'
import TagField from 'ui/backend/components/shared/TagField'
import PostFormItem from 'ui/backend/components/Post/Forms/Item'
import EditBox from 'ui/backend/components/Post/Forms/Item/Form/EditBox'
import Checkbox from 'material-ui/Checkbox'
import { RadioButtonGroup } from 'material-ui/RadioButton'
import TARGET_TYPES from 'ui/shared/constants/targetTypes'

// do not user higher order function for component or it will re-render everytime
export const renderTextField = ({ input, label, type, meta: { touched, error, warning } }) => (  
  <TextField    
    floatingLabelText={label}
    hintText={label}
    fullWidth={true}    
    type={type}
    style={inlineStyles.textField}
    {...input}
    errorText={touched && error ? error : ''}
  />
)

export const renderCheckbox = ({ input, label }) => (
  <Checkbox 
    checked={input.value} 
    onCheck={(e, isInputChecked) => input.onChange(isInputChecked)}
    label={label} 
  />
)

export const renderTextEditor = ({ input, mode='raw' }) => (
  <TextEditor    
    {...input}
    mode={mode}
    handleUpdate={value => input.onChange(value)}
  />  
)

export const renderRadioGroup = ({ input, children }) => (
  <RadioButtonGroup 
    {...input}
    children={children}
    valueSelected={input.value}
    onChange={(e, value) => input.onChange(value)}/>
)

// also accept extra params to extend to it ?
export const renderDropzoneImage = ({ input, base64=false }) => (
  <DropzoneImage
    {...input}
    base64={base64}
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

export const renderDatePicker = ({ input, label, meta: {touched, error, warning }}) => (
  <DatePicker
    container="inline"
    autoOk={true}
    placeholder={label}
    {...input}
    errorText={touched && error ? error : ''}    
  />
)

export const renderPostFormItem = ({ input:{value, onChange}, fields, index }) => (  
  <PostFormItem    
    item={value}
    sortRank={index}
    totalCount={fields.length}
    handleUpdateItem={(sort_rank, item)=> onChange({...item, sort_rank})}
    handleDeleteItem={sort_rank => fields.remove(sort_rank)}
    handleMoveItem={(sort_rank, type)=> {
      switch(type) {
        case 'TOP':
          return fields.move(sort_rank, 0)
        case 'UP':        
          return fields.move(sort_rank, sort_rank - 1)
        case 'DOWN':
          return fields.move(sort_rank, sort_rank + 1)
        case 'BOTTOM':
          return fields.move(sort_rank, fields.length - 1)
      }
    }}    
  /> 
)


export const renderTagField = ({ input:{value, onChange}, suggestions}) => (
  <TagField
    tags={value.map(item=>({id:item.id, text:item.text||item.name}))}    
    handleAddTag={tag=> onChange([...value, {text: tag}])}
    handleDeleteTag={sort_rank=> onChange(value.filter((_, index) => index !== sort_rank))}
    suggestions={suggestions}
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
  

export const renderPostFormItems = ({ fields, isNew=true, meta: { error } }) => (
  <section>
    <ul>
      {fields.map((item, index) => (
        <Field
          name={item}
          key={index}          
          fields={fields}
          index={index}
          component={renderPostFormItem}          
        />                  
      ))}

      {!isNew && 
        <li>
          <EditBox handleAddItem={target_type => 
            fields.push({
              target_type, 
              editing: true, 
              isNew: true, 
              sort_rank: fields.length, // always at the end
              image: target_type === TARGET_TYPES.IMAGE ? {} : null,
              twitter: target_type === TARGET_TYPES.TWITTER ? {} : null,
              text: target_type === TARGET_TYPES.TEXT ? {} : null,
            })
          } />
        </li>
      }
    </ul>    
  </section>
)

export const copyFromRelay = obj => {
  if(!obj){
    return obj
  }
  else if(typeof obj === 'object'){
    const {__dataID__, __fragments__, ...data} = obj
    sanitizeFromRelay(data)
    return data
  } 
    
  sanitizeFromRelay(obj)
  return obj
  
}

export const sanitizeFromRelay = obj => {
  for(let prop in obj) {
    if (prop === '__dataID__' || prop === '__fragments__')
      delete obj[prop]
    else if (typeof obj[prop] === 'object')
      sanitizeFromRelay(obj[prop])
  }
}