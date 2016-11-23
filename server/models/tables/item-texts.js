import dataloaderSequelize from 'data/loader/sequelize'
import { sequelize, DataTypes } from 'models/config'

const item_texts = sequelize.define("item_texts", {    
  type: {
    type: new DataTypes.VIRTUAL(DataTypes.STRING),
    get: () => 'ItemText',      
  },    
  id          : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },    
  description : DataTypes.STRING,
}, {
  timestamps: false,
})

dataloaderSequelize(item_texts)

export default item_texts