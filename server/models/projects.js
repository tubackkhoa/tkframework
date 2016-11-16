export default (sequelize, DataTypes) => 
  sequelize.define("projects", {        
    type: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING),
      get: () => 'Project',      
    },
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
    title        : DataTypes.STRING,
    description  : DataTypes.STRING,
    caption      : DataTypes.STRING,
    image        : DataTypes.STRING, 
    source_url   : DataTypes.STRING, 
    accepted     : DataTypes.BOOLEAN, 
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })

