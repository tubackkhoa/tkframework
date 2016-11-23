import { sequelize, DataTypes } from 'models/config'

export default sequelize.define("sell_posts", {    
  id         : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },    
  title : DataTypes.STRING,
  description : DataTypes.STRING,
  phone : DataTypes.STRING,
  user_id : DataTypes.INTEGER,
  image: DataTypes.STRING,

}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

