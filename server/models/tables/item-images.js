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
  timestamps: false,
  getterMethods: {
    full_src() {
      return this.src ? `/uploads/item_image/image/${this.id}/${this.src}` : null
    }
  }
})

dataloaderSequelize(item_images)

export default item_images