export default (sequelize, DataTypes) => 
  sequelize.define("authors", {        
    type: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING),
      get: () => 'authorType',      
    },
    id: { type: DataTypes.STRING, primaryKey: true, autoIncrement:true },
    email       : DataTypes.STRING,
    introduction: DataTypes.STRING,
    description : DataTypes.STRING,
    name        : DataTypes.STRING,
    image       : DataTypes.STRING, 
    refresh_token: DataTypes.STRING,
  })

