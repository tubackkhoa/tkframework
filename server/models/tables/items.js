export default (sequelize, DataTypes) => 

  sequelize.define("items", {    
    type: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING),
      get: () => 'Item',      
    },    
    id          : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
    target_type: DataTypes.ENUM('ItemText','ItemImage','ItemTwitter'), 
    target_id : DataTypes.INTEGER,
    sort_rank : DataTypes.INTEGER,
    post_id : DataTypes.INTEGER,
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    classMethods: {
      associate: function() {        
        // this.hasMany(sequelize.models.taggings, {foreignKey: 'subject_id'})
        this.belongsTo(sequelize.models.posts, {          
          foreignKey: 'post_id',
          as: 'post',
        })
      }
    },
  })