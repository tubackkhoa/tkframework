import fs        from "fs"
import path      from "path"
import Sequelize from "sequelize"
import dataloaderSequelize from 'dataloader/sequelize'

const config     = require('config/database.json').connection
const sequelize = new Sequelize(config.database, config.username, config.password, config)
dataloaderSequelize(sequelize)

const db = {}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf(".") !== 0) && (file !== "index.js")
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))    
    dataloaderSequelize(model)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName =>   
    db[modelName].associate && db[modelName].associate(db)  
)

db.sequelize = sequelize

export default db