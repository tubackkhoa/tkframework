import {Router} from 'express'

import {
  toGlobalId,
} from 'graphql-relay'

import authorize from 'passport/authorize'
import models from 'models'

const router  = new Router()

router.get('/tags', (req, res) => {
  // tag is public
  models.tags.findAll({      
    attributes: ['name']
  }).then( tags => {
    // logout passport to end access token immediately
    res.send(tags.map(tag => tag.name))
  })   
})



router.post('/post/create', async (req, res) => {
  // check authorize first, for update, also check author_id for post
  authorize(req)
  // currently we not process items, let it for edit phrase
  const {tags, ...data} = req.body.post

  if(!data.title || !data.lead_sentence){
    throw new Error('Title and lead sentence must not be empty!!!')
  }

  // default is published at today :v
  if(!data.published_at)
    data.published_at = new Date()

  // update from post data
  const post = await models.posts.create(data)

  // update tags, wait for tags to redirect to edit page
  post.tags = await post.updateTags(tags)
  // send back inserted id as graphql id
  res.send({id:toGlobalId(post.type, post.id)})
})

// service point, use require for adding route without naming, and faster to change
router.use('/servicepoint', require('./service-point').default)

// tire post
router.use('/sellpost', require('./sellpost').default)

// user
router.use('/user', require('./user').default)

export default router