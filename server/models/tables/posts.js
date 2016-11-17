import dataloaderSequelize from 'dataloader/sequelize'
import { taggingsPostConnect } from '../shared/connect'
import { sequelize, DataTypes } from '../config'

const posts = sequelize.define("posts", {    
  type: {
    type: new DataTypes.VIRTUAL(DataTypes.STRING),
    get: () => 'Post',      
  },    
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
  title        : DataTypes.STRING,    
  lead_sentence: DataTypes.STRING, 
  accepted     : DataTypes.BOOLEAN, 
  published_at  : DataTypes.DATE
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',    
  classMethods: {
    associate: function() {        
      // we should use object instead of string to prevent errors prone
      this.belongsToMany(sequelize.models.tags, {
        through: taggingsPostConnect,
        foreignKey: 'subject_id',
      })

      this.hasMany(sequelize.models.items, {
        foreignKey: 'post_id',
      })
    }
  },

  instanceMethods: {
    // arrow function can mislead this
    getPostTags: function(attributes) {    
      // with where and attributes
      return this.getTags({          
        attributes,
      })
    },

    getOrderedItems: function(attributes) {
      return this.getItems({
        attributes,
        order: [['sort_rank', 'ASC']],
      })
    }
  }
})

dataloaderSequelize(posts)

export default posts
