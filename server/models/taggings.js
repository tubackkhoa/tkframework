export default (sequelize, DataTypes) => 

  sequelize.define("taggings", {    
    type: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING),
      get: () => 'Tagging',      
    },    
    id          : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
    tag_id      : DataTypes.INTEGER,
    subject_id  : DataTypes.INTEGER,    
    subject_type: DataTypes.STRING, 
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',    
  })

