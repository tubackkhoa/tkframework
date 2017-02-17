export const readBase64 = (file, success, failure) => {
  const reader = new FileReader()

  reader.onload = (upload) => {
    success(upload.target.result)      
  }

  reader.onerror = () => {
    failure && failure()
  }

  reader.readAsDataURL(file)  
}

export const isImage = file => 
  (/.*image\/(gift|jpg|jpeg|png)$/i).test(file.type)