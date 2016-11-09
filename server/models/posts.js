export default (sequelize, DataTypes) => 
  sequelize.define("posts", {
    title        : DataTypes.STRING,    
    lead_sentence: DataTypes.STRING, 
  })

