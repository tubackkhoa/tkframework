import {Router} from 'express'

import {
  toGlobalId,
} from 'graphql-relay'

import authorize from 'data/graphql/authorize'
import models from 'models'

import servicePoint from './service-point'
import sellPost from './sellpost'

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

// service point
router.use('/service', servicePoint)

// tire post
router.use('/sellpost', sellPost)



export default router