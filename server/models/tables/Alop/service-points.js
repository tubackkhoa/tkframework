import { sequelize, DataTypes } from 'models/config'

export default sequelize.define("service_points", {    
  id         : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },    
  name : DataTypes.STRING,
  address : DataTypes.STRING,
  phone : DataTypes.STRING,
  lat : DataTypes.DOUBLE,
  lon : DataTypes.DOUBLE,
  image: DataTypes.STRING,

}, {
  timestamps: false,
})

