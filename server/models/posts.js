export default (sequelize, DataTypes) => 
  sequelize.define("posts", {    
    type: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING),
      get: () => 'postType',      
    },    
    id: { type: DataTypes.STRING, primaryKey: true, autoIncrement:true },
    title        : DataTypes.STRING,    
    lead_sentence: DataTypes.STRING, 
  })

