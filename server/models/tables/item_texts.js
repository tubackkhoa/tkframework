export default (sequelize, DataTypes) => 

  sequelize.define("item_texts", {    
    type: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING),
      get: () => 'ItemText',      
    },    
    id          : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },    
    description : DataTypes.STRING,
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })