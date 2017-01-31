
import { mongoose, Schema } from 'models/mongodb/config'

const users = mongoose.model('users', Schema({
  username: { type: String },
  password: { type: String },
}))

export default users
