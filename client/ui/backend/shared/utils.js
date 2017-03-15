import React from 'react'
import TextField from 'material-ui/TextField'

import { Field } from 'redux-form'

import inlineStyles from 'ui/shared/styles/MaterialUI'
import TextEditor from 'ui/shared/components/Text/Editor'
import DropzoneImage from 'ui/backend/components/shared/DropzoneImage'
import DropzoneImages from 'ui/backend/components/shared/DropzoneImages'
import DatePicker from 'ui/backend/components/shared/CustomDatePicker'
import TagField from 'ui/backend/components/shared/TagField'
import EditBox from 'ui/backend/components/Post/Forms/Item/Form/EditBox'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import Subheader from 'material-ui/Subheader'
import { RadioButtonGroup } from 'material-ui/RadioButton'

// do not user higher order function for component or it will re-render everytime
export const renderTextField = ({ input, label, type, meta: { touched, error, warning }, ...custom }) => (  
  <TextField    
    floatingLabelText={label}
    hintText={label}
    fullWidth={true}    
    type={type}
    style={inlineStyles.textField}
    {...input}
    errorText={touched && error ? error : ''}
    {...custom}
  />
)

export const renderSelectField = ({ input, label, meta: { touched, error }, children, dropdown, ...custom }) => (
  <SelectField 
    floatingLabelText={label}
    hintText={label}
    fullWidth={true}   
    style={inlineStyles.selectField}
    errorText={touched && error}
    {...input}
    children={children}
    value={(input.value === undefined && dropdown) ? children[0].key : input.value}
    onChange={(e, index, value) => input.onChange(value)}
    {...custom}/>
)

export const renderCheckbox = ({ input, label, meta, ...args}) => (
  <Checkbox 
    checked={!!input.value} 
    onCheck={(e, isInputChecked) => input.onChange(isInputChecked)}
    label={label} 
    {...args}
  />
)

export const renderCheckBoxs = ({ input, label, meta: { error } , items, max=0}) => (
  <div style={{marginTop:10}}>
    <Subheader style={{paddingLeft:0}}>{label}</Subheader>
    {items.map(item => 
      <Checkbox 
        key={item.key}     
        checked={input.value.includes(item.key)}
        onCheck={(e, isInputChecked) => {
          if(max <= 0 || !isInputChecked || input.value.length < max){
            const newValue = isInputChecked 
                ? [...input.value, item.key]
                : input.value.filter(x => x !== item.key)            
            input.onChange(newValue)       
          }             
        }}
        label={item.value} 
      />                
    )}    
  </div>
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

export const renderDropzoneImages = ({ input, label, base64=false, path=''}) => (
  <DropzoneImages
    label={label}
    path={path.replace(/\/?$/,'/')}
    {...input}
    base64={base64}
    handleDeleteFile={(index, file) => input.onChange([...input.value.slice(0, index), ...input.value.slice(index+1)])}
    handleAddFile={file => input.onChange([...input.value, file])}        
  />
)

// also accept extra params to extend to it ?
export const renderDropzoneImage = ({ input, label, base64=false, path=''}) => (
  <DropzoneImage
    label={label}
    path={path.replace(/\/?$/,'/')}
    {...input}
    base64={base64}
    handleUpdate={file => input.onChange(file)}
  />
)

export const renderDatePicker = ({ input, label, meta: {touched, error, warning }, ...custom}) => (
  <DatePicker
    floatingLabelText={label}
    hintText={label}
    container="inline"
    autoOk={true}
    fullWidth={true}
    placeholder={label}
    {...input}
    errorText={touched && error ? error : ''}   
    {...custom} 
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