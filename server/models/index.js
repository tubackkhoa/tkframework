import { sequelize, DataTypes } from './config'
import dataloaderSequelize from 'data/loader/sequelize'

import posts from './tables/posts'
import authors from './tables/authors'
import item_images from './tables/item-images'
import item_texts from './tables/item-texts'
import item_twitters from './tables/item-twitters'
import items from './tables/items'
import projects from './tables/projects'
import taggings from './tables/taggings'
import tags from './tables/tags'
import social_accounts from './tables/social-accounts'

const models = { sequelize, DataTypes }
// choose model to init
const tables = [
  posts, authors, item_images, item_texts, item_twitters, 
  items, projects, taggings, tags, social_accounts
]

tables.forEach(model => models[model.name] = model)

// back reference
sequelize.models = models
dataloaderSequelize(sequelize)

// mapping for associate, after all models have been attached to models
tables.forEach(model => model.associate && model.associate.call(model))

export default models