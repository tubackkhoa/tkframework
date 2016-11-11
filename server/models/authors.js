export default (sequelize, DataTypes) => 
  sequelize.define("authors", {    
    type: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING),
      get: () => 'authorType',      
    },
    email       : DataTypes.STRING,
    introduction: DataTypes.STRING,
    description : DataTypes.STRING,
    name        : DataTypes.STRING,
    image       : DataTypes.STRING, 
  })

