import dataloaderSequelize from 'dataloader/sequelize'
import { sequelize, DataTypes } from '../config'

const projects = sequelize.define("projects", {        
  type: {
    type: new DataTypes.VIRTUAL(DataTypes.STRING),
    get: () => 'Project',      
  },
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
  title        : DataTypes.STRING,
  description  : DataTypes.STRING,
  caption      : DataTypes.STRING,
  image        : DataTypes.STRING, 
  source_url   : DataTypes.STRING, 
  accepted     : DataTypes.BOOLEAN, 
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

dataloaderSequelize(projects)

export default projects