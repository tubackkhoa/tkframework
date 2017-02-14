import { v4 } from 'uuid'
import fse from 'fs-extra'
import path from 'path'
import { filePath } from 'config/constants'
import { decodeBase64Image } from 'data/decoder/image'

export const uploadImage = (field, oldField, folder, setter, clear=true) => {
  const imageDecode = decodeBase64Image(field)
  // delete old one
  if(imageDecode.buffer) {
    const imagePath = path.join(filePath, folder)
    // delete folder, by default we treat the whole folder like a collection of files, including thumb.v..v
    // for later
    if(clear && oldField) {
      fse.removeSync(path.join(imagePath, path.basename(oldField)))   
    }
    // update new image
    const filename = v4() + '.png'  
    // must save done then return   
    fse.outputFileSync(path.join(imagePath, filename), imageDecode.buffer)    
    // return file upload path ? not always return, so use setter method
    const imageURL = `/uploads/${folder}/${filename}`
    setter && setter(imageURL) 
    return imageURL
  }  
  // return by default
  return field
  
}

// with multi-file upload, we can not clear folder, we only clear files which are not presented in fields
export const uploadImages = (fields, oldFields, folder, setter, clear=true) => {
  const newFields = []
  const currentFields = []
  const imagePath = path.join(filePath, folder)
  fields.forEach(field=>{
    const imageDecode = decodeBase64Image(field)
    // delete old one
    if(imageDecode.buffer) {             
      // update new image
      const filename = v4() + '.png'  
      // must save done then return   
      fse.outputFileSync(path.join(imagePath, filename), imageDecode.buffer)    
      // return file upload path ? not always return, so use setter method
      const imageURL = `/uploads/${folder}/${filename}`      
      newFields.push(imageURL)
    } else {
      newFields.push(field)
      // field from old Fields
      currentFields.push(field)
    } 
  })

  // delete folder, by default we treat the whole folder like a collection of files, including thumb.v..v
  // for later
  if(clear && oldFields) {
    oldFields.filter(field => currentFields.indexOf(field) === -1).forEach(field=>{
      const filename = path.basename(field)
      fse.removeSync(path.join(imagePath, filename))
    })    
  } 

  setter && setter(newFields)
  // return by default
  return newFields
  
}