import dataloaderSequelize from 'data/loader/sequelize'
import { sequelize, DataTypes } from 'models/config'
import { filePath } from 'config/constants'
import path from 'path'
import fse from 'fs-extra'

const items = sequelize.define("items", {    
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
    associate() {        
      // this.hasMany(sequelize.models.taggings, {foreignKey: 'subject_id'})
      this.belongsTo(sequelize.models.posts, {          
        foreignKey: 'post_id',
        as: 'post',
      })
    },

    destroyItems(deleteItems){

      const deleteItemIDs = deleteItems.map(oldItem => oldItem.id)  
      // delete old item, also sub item attached to it
      deleteItemIDs.length && sequelize.models.items.destroy({
        where: {
          id: deleteItemIDs
        }
      }) 

      const deleteItemTextIDs = deleteItems
        .filter(item=>item.target_type === 'ItemText')
        .map(item => item.target_id)
      deleteItemTextIDs.length && sequelize.models.item_texts.destroy({
        where: {
          id: deleteItemTextIDs
        }
      }) 

      const deleteItemImageIDs = deleteItems
        .filter(item=>item.target_type === 'ItemImage')
        .map(item => item.target_id)
      deleteItemImageIDs.length && sequelize.models.item_images.destroy({
        where: {
          id: deleteItemImageIDs
        }
      })
      
      // also delete the whole image folder associated to this itemImage
      deleteItemImageIDs.forEach(id=>{
        const imagePath = path.join(filePath, 'item_image/image', id)
        // delete at background
        fse.remove(imagePath, err => 
          console.log(err || `Removed folder: ${imagePath}`)
        )
      })

      const deleteItemTwitterIDs = deleteItems
        .filter(item=>item.target_type === 'itemTwitter')
        .map(item => item.target_id)
      deleteItemTwitterIDs.length && sequelize.models.item_twitters.destroy({
        where: {
          id: deleteItemTwitterIDs
        }
      }) 

    }
  },
})

dataloaderSequelize(items)

export default items