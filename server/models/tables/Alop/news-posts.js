import { sequelize, DataTypes } from 'models/config'

export default sequelize.define("news_posts", {    
  id         : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },    
  title : DataTypes.STRING,
  description : DataTypes.STRING,
  content : DataTypes.STRING,
  image : DataTypes.STRING,
  user_id : DataTypes.INTEGER,
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

