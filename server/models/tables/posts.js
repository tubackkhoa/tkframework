import dataloaderSequelize from 'data/loader/sequelize'
import { taggingsPostConnect } from 'models/shared/connect'
import { sequelize, DataTypes } from 'models/config'

const posts = sequelize.define("posts", {    
  type: {
    type: new DataTypes.VIRTUAL(DataTypes.STRING),
    get: () => 'Post',      
  },    
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
  title        : DataTypes.STRING,    
  lead_sentence: DataTypes.STRING, 
  accepted     : DataTypes.BOOLEAN, 
  published_at  : DataTypes.DATE,
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',    
  classMethods: {
    associate() {        
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
    getPostTags(attributes) {    
      // with where and attributes
      return this.getTags({          
        attributes,
      })
    },

    getOrderedItems(attributes) {
      return this.getItems({
        attributes,
        order: [['sort_rank', 'ASC']],
      })
    },

    async updateTags(tags) {
      // now update for tags
      // delete all old tags for this posts
      const oldTaggings = await sequelize.models.taggings.findAll({
        where: {
          subject_id: this.id,
          subject_type: 'Post',
        },
        attributes: ['id', 'tag_id'],
      })

      // first try to get all the tag from the db, if not have then insert
      const tagList = await Promise.all(tags.map(tag => 
        sequelize.models.tags.findCreateFind({
          where:{name: tag},
          defaults:{name: tag},
          attributes:['id', 'name'],
        })
        // use spread to have more information than just item itself
        // then just get plain without any method, other use dataValues
        .spread((item, created) => item.get({plain: true}))            
      ))    

      const tagListIDs = tagList.map(tagItem => tagItem.id)
      const oldTagIDs = oldTaggings.map(oldTag => oldTag.tag_id)
      
      // loop through tagList, if not found in this list then delete from oldTaggings, the left just insert
      // tags need to insert are belong to tagList but not in oldTaggings
      const insertTaggings = tagList
        .filter(tagItem => tagItem.id && oldTagIDs.indexOf(tagItem.id) === -1)
        .map(tagItem => ({
          tag_id: tagItem.id,
          subject_id: this.id,
          subject_type: 'Post',
        }))

      // bulk insert at background because we have all new tag
      insertTaggings.length && sequelize.models.taggings.bulkCreate(insertTaggings)

      // later delete old tags
      const deleteTaggingIDs = oldTaggings
        .filter(oldTag => oldTag.tag_id && tagListIDs.indexOf(oldTag.tag_id) === -1)
        .map(oldTag => oldTag.id)      

      // delete at background
      deleteTaggingIDs.length && sequelize.models.taggings.destroy({
        where: {
          id: deleteTaggingIDs
        }
      })

      // now everything has done
      return tagList
    },
  }
})

dataloaderSequelize(posts)

export default posts
