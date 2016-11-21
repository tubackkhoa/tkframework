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
    handleUpdateItem={(sortRank, item)=> onChange(item)}
    handleDeleteItem={sortRank=> fields.remove(sortRank)}
    handleMoveItem={(sortRank, type)=> {
      switch(type) {
        case 'TOP':
          return fields.move(sortRank, 0)
        case 'UP':        
          return fields.move(sortRank, sortRank - 1)
        case 'DOWN':
          return fields.move(sortRank, sortRank - 1)
        case 'BOTTOM':
          return fields.move(sortRank, fields.length - 1)
      }
    }}    
  /> 
)


export const renderTagField = ({ input:{value, onChange}, suggestions}) => (
  <TagField
    tags={value}    
    handleAddTag={tag=> onChange([...value, tag])}
    handleDeleteTag={sortRank=> onChange(value.filter((_, index) => index !== sortRank))}
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
  

export const renderPostFormItems = ({ fields, meta: { error } }) => (
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
      <li>
        <EditBox handleAddItem={target_type => 
          fields.push({
            target_type, 
            editing: true, 
            isNew: true, 
            image: {},
            twitter: {},
            text: {},
          })
        } />
      </li>
    </ul>    
  </section>
)