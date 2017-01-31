// by default we use sequelize, but later we will move outside code into sequelize folder

import  { connection }  from 'config/database'
import Mongoose from 'mongoose'

const {database, username, password, host,...config} = connection[process.env.NODE_ENV === 'server' ? 'dev' : 'prod']

// using polyfill as mongoose Promise
Mongoose.Promise = global.Promise

// connect to mongodb
Mongoose.connect(`mongodb://${username}:${password}@${host}/${database}`, { config: config })

// export these
export const mongoose = Mongoose
export const Schema = mongoose.Schema