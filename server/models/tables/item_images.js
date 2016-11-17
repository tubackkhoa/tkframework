export default (sequelize, DataTypes) => 

  sequelize.define("item_images", {    
    type: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING),
      get: () => 'ItemImage',      
    },    
    id          : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },    
    src : DataTypes.STRING,
    caption : DataTypes.STRING,    
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })