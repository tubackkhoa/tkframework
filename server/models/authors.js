export default (sequelize, DataTypes) => 
  sequelize.define("authors", {
    id :    {type:DataTypes.INTEGER, primaryKey:true},
    email       : DataTypes.STRING,
    introduction: DataTypes.STRING,
    description : DataTypes.STRING,
    name        : DataTypes.STRING,
    image       : DataTypes.STRING, 
  })

