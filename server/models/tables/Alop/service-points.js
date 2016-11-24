import { sequelize, DataTypes } from 'models/config'

export default sequelize.define("service_points", {    
  id         : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },    
  name : DataTypes.STRING,
  address : DataTypes.STRING,
  phone : DataTypes.STRING,
  lat : DataTypes.DOUBLE,
  lng : DataTypes.DOUBLE,
  image: DataTypes.STRING,
  description: DataTypes.STRING,
  owner_id : DataTypes.INTEGER,
  lat_cos : DataTypes.DOUBLE,
  lng_cos : DataTypes.DOUBLE,
  lat_sin : DataTypes.DOUBLE,
  lng_sin : DataTypes.DOUBLE,
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

