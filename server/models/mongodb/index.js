
import { mongoose, Schema } from './config'


import user from './user'

const models = { mongoose, Schema }
// choose model to init
const tables = [
  user,   
]

tables.forEach(model => models[model.modelName] = model)

// back reference
mongoose.models = models

// export default
export default models
