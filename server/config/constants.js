import path from 'path'

// must provide public path from current path, or absolute path instead!!!
let publicPathENV = path.resolve(process.env.NODE_PATH || './', process.env.PUBLIC_PATH || 'public')

export const jwtSecret = "4A40333B-EC26-4E18-A976-9B030C23A484"
// just like from uploads of root is public path
export const filePath = path.join(publicPathENV, 'uploads')
export const publicPath = publicPathENV