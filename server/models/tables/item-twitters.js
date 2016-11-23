import dataloaderSequelize from 'data/loader/sequelize'
import { sequelize, DataTypes } from 'models/config'

const item_twitters = sequelize.define("item_twitters", {    
  type: {
    type: new DataTypes.VIRTUAL(DataTypes.STRING),
    get: () => 'ItemTwitter',      
  },    
  id          : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },    
  twitter_id : DataTypes.STRING,
}, {
  timestamps: false,
})

dataloaderSequelize(item_twitters)

export default item_twitters