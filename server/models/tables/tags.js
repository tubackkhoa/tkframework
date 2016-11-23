import dataloaderSequelize from 'data/loader/sequelize'
import { taggingsPostConnect, taggingsProjectConnect } from 'models/shared/connect'
import { sequelize, DataTypes } from 'models/config'

const tags = sequelize.define("tags", {    
  type: {
    type: new DataTypes.VIRTUAL(DataTypes.STRING),
    get: () => 'Tag',      
  },    
  id          : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
  name: DataTypes.STRING, 
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  classMethods: {
    associate() {        
      // this.hasMany(sequelize.models.taggings, {foreignKey: 'subject_id'})
      this.belongsToMany(sequelize.models.posts, {
        through: taggingsPostConnect,
        foreignKey: 'tag_id',
      })

      this.belongsToMany(sequelize.models.projects, {
        through: taggingsProjectConnect,
        foreignKey: 'tag_id',
      })
    }
  },
})


dataloaderSequelize(tags)

export default tags