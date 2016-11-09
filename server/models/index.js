"use strict"

var fs        = require("fs")
var path      = require("path")
var Sequelize = require("sequelize")
var config    = require('config/database.json').connection

var sequelize = new Sequelize(config.database, config.username, config.password, config)

var db = {}

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