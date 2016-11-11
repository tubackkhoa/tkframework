"use strict"

const fs        = require("fs")
const path      = require("path")
const Sequelize = require("sequelize")
const config    = require('config/database.json').connection

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const db = {}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf(".") !== 0) && (file !== "index.js")
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))    
    db[model.name] = model
  })

Object.keys(db).forEach(modelName =>   
    db[modelName].associate && db[modelName].associate(db)  
)

db.sequelize = sequelize

export default db