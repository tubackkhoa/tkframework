
export default (sequelize, DataTypes) => 
  sequelize.define("User", {
    username: DataTypes.STRING 
  })

