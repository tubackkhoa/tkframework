import models from 'models'

// Create the tables:
models.posts.sync()
models.projects.sync()
models.authors.sync()
models.item_texts.sync()
models.item_images.sync()
models.item_twitters.sync()
models.items.sync()
models.taggings.sync()
models.tags.sync()

// Force the creation!
// this will drop the table first and re-create it afterwards
// models.projects.sync({force: true}) 