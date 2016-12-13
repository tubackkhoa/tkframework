import dataloaderSequelize from 'data/loader/sequelize'
import { sequelize, DataTypes } from 'models/config'

const authors = sequelize.define('authors', {        
  type: {
    type: new DataTypes.VIRTUAL(DataTypes.STRING),
    get: () => 'Author',      
  },
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
  // email             : DataTypes.STRING,
  email : { type: DataTypes.STRING, validate: {isEmail: true} },
  encrypted_password: DataTypes.STRING,
  introduction      : DataTypes.STRING,
  description       : DataTypes.STRING,
  name              : DataTypes.STRING,
  image             : DataTypes.STRING, 
  refresh_token     : DataTypes.STRING,
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',

  classMethods: {
    associate() {              

      this.hasMany(sequelize.models.social_accounts, {
        foreignKey: 'author_id',        
      })
    }
  },

  instanceMethods: {
    // arrow function can mislead this
    getSocialAccounts(attributes) {    

      // sample of fallback, when you not pass author_id to map ?
      // models.social_accounts.findAll ()
      // but you should pass author_id by default to author.id

      // with where and attributes
      return this.getSocial_accounts({          
        attributes,
        order: [['account_type', 'ASC']],
      })
    },

  }
})

dataloaderSequelize(authors)

export default authors
