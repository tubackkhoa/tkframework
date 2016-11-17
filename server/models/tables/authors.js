import dataloaderSequelize from 'dataloader/sequelize'
import { sequelize, DataTypes } from '../config'

const authors = sequelize.define('authors', {        
  type: {
    type: new DataTypes.VIRTUAL(DataTypes.STRING),
    get: () => 'Author',      
  },
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
  email             : DataTypes.STRING,
  encrypted_password: DataTypes.STRING,
  introduction      : DataTypes.STRING,
  description       : DataTypes.STRING,
  name              : DataTypes.STRING,
  image             : DataTypes.STRING, 
  refresh_token     : DataTypes.STRING,
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

dataloaderSequelize(authors)

export default authors
