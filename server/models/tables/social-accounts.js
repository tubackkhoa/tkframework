import dataloaderSequelize from 'data/loader/sequelize'
import { sequelize, DataTypes } from 'models/config'

const social_accounts = sequelize.define("social_accounts", {    
  type: {
    type: new DataTypes.VIRTUAL(DataTypes.STRING),
    get: () => 'SocialAccount',      
  },    
  id          : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
  author_id : DataTypes.INTEGER,
  account_type : DataTypes.INTEGER,
  url : DataTypes.STRING,
}, {
  timestamps: false,
  classMethods: {
    associate() {        
      // this.hasMany(sequelize.models.taggings, {foreignKey: 'subject_id'})
      this.belongsTo(sequelize.models.authors, {          
        foreignKey: 'author_id',
        as: 'author',
      })
    }
  },
})

dataloaderSequelize(social_accounts)

export default social_accounts