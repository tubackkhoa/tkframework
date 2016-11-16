export default (sequelize, DataTypes) => 
  sequelize.define("posts", {    
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
    instanceMethods: {
      // arrow function can mislead this
      getTags: async function(tagAttributes) {                        
        const taggings = await sequelize.models.taggings.findAll({
          where: {
            subject_id: this.id,
            subject_type: 'Post',
          },
          attributes: ['tag_id'],
        })
        // we use async function, by default it will return Promise.map
        return taggings.map(tagging => sequelize.models.tags.findById(tagging.tag_id, {
          attributes: tagAttributes,
        }))
      }
    }
  })