import dataloaderSequelize from 'data/loader/sequelize'
import { sequelize, DataTypes } from 'models/config'

const taggings = sequelize.define("taggings", {    
  type: {
    type: new DataTypes.VIRTUAL(DataTypes.STRING),
    get: () => 'Tagging',      
  },    
  id          : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
  tag_id      : DataTypes.INTEGER,
  subject_id  : DataTypes.INTEGER,    
  subject_type: DataTypes.ENUM('Post', 'Project'), 
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',    
  classMethods: {
    associate() {        
      this.belongsTo(sequelize.models.tags, {
        as: 'tag', 
        foreignKey: 'tag_id'
      })
    }
  },
})

dataloaderSequelize(taggings)

export default taggings