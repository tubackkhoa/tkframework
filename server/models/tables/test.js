// import dataloaderSequelize from 'data/loader/sequelize'
import { sequelize, DataTypes } from 'models/config'

const test = sequelize.define("test", {      
  id          : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
  name: DataTypes.STRING, 
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',  
})


// dataloaderSequelize(test)

export default test