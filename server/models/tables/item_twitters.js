export default (sequelize, DataTypes) => 

  sequelize.define("item_twitters", {    
    type: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING),
      get: () => 'ItemTwitter',      
    },    
    id          : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },    
    twitter_id : DataTypes.STRING,
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })