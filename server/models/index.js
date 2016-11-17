import fs        from "fs"
import path      from "path"
import Sequelize from "sequelize"
import dataloaderSequelize from 'dataloader/sequelize'

const config     = require('config/database.json').connection
const sequelize = new Sequelize(config.database, config.username, config.password, config)

const db = {}
const modelsPath = path.join(__dirname, 'tables')
fs
  .readdirSync(modelsPath)
  .filter(file => /\.js$/.test(file))
  .forEach(file => {
    const model = sequelize.import(path.join(modelsPath, file))    
    dataloaderSequelize(model)
    db[model.name] = model    
  })

// back reference
sequelize.models = db
dataloaderSequelize(sequelize)

db.sequelize = sequelize

// mapping for associate
Object.keys(db).forEach(modelName =>   
    db[modelName].associate && db[modelName].associate.call(db[modelName])  
)

export default db