import { sequelize } from './config'
import dataloaderSequelize from 'data/loader/sequelize'

import posts from './tables/posts'
import authors from './tables/authors'
import item_images from './tables/item_images'
import item_texts from './tables/item_texts'
import item_twitters from './tables/item_twitters'
import items from './tables/items'
import projects from './tables/projects'
import taggings from './tables/taggings'
import tags from './tables/tags'

const models = {}
// choose model to init
const tables = [
  posts, authors, item_images, item_texts, item_twitters, 
  items, projects, taggings, tags
]

tables.forEach(model => models[model.name] = model)

// back reference
sequelize.models = models
dataloaderSequelize(sequelize)

models.sequelize = sequelize

// mapping for associate, after all models have been attached to models
tables.forEach(model => model.associate && model.associate.call(model))

export default models