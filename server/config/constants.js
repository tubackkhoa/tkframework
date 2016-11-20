import path from 'path'

// assume from root path
let filePathENV = process.env.FILE_PATH || 'public/uploads'

// not absolute path, means relative path
if(filePathENV[0] !== '/'){
  filePathENV = path.join(__dirname, '../../', filePathENV)
}

export const jwtSecret = "4A40333B-EC26-4E18-A976-9B030C23A484"
export const filePath = filePathENV