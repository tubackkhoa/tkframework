import dataloaderSequelize from 'data/loader/sequelize'
import { sequelize, DataTypes } from 'models/config'

const item_images = sequelize.define("item_images", {    
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
  getterMethods: {
    full_src: function() {
      return `/uploads/item_image/image/${this.id}/${this.src}`
    }
  }
})

dataloaderSequelize(item_images)

export default item_images