export default (sequelize, DataTypes) => 
  sequelize.define("posts", {
    type: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING),
      get: () => 'postType',      
    },    
    title        : DataTypes.STRING,    
    lead_sentence: DataTypes.STRING, 
  })

