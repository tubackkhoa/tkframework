import {Router} from 'express'
import sellposts from 'models/tables/Alop/sellposts'

import authorize from 'data/graphql/authorize'
import models from 'models'

const router  = new Router()

router.get('/index/:id', (req, res) => {
  // tag is public
  const {id} = req.params
  sellposts.findById(id).then( item => {
    // logout passport to end access token immediately
    // convert back to base64 string
    res.send(item)
  })   
})

router.get('/', (req, res)=> {
  const {page=1, limit=10} = req.query  
  const maxLimit = Math.min(+limit, 10)
  const offset = (page-1) * limit
  sellposts.findAndCount({
    limit: maxLimit,
    offset,
  }).then(result => {
    res.send({...result, offset})
  })
})

// limit json post
router.post('/update', async (req, res) => {
  // check authorize first, for update, also check author_id for post
  authorize(req)
  // currently we not process items, let it for edit phrase
  const {sellpost:data, id} = req.body

  // update from post data
  const item = id 
    ? await sellposts.update(data, {where:{id}})
    : await sellposts.create(data)

  // send back inserted id as graphql id
  res.send({id:item.id})
})

export default router