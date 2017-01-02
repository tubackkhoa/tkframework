import {Router} from 'express'
import models from 'models'
import { getPagingRouter, getDetailRouter, getDeleteRouter, uploadImage } from 'routes/shared/utils'
import authorize from 'passport/authorize'

const router  = new Router()

const test_fields = ['id','name']

router.get('/index/:id', getDetailRouter(models.test, test_fields))
router.get('/', getPagingRouter(models.test, test_fields))
router.delete('/delete/:id', getDeleteRouter(models.test))

// limit json post, update is hardest part to code
router.post('/update', async (req, res) => {
  // check authorize first, for update, also check author_id for post
  authorize(req)
  // currently we not process items, let it for edit phrase
  const {item:data, id} = req.body

  // update from post data
  const item = id 
    ? await models.test.findById(id)
    : await models.test.create(data)
  // do not update for new post
  if(!id)
    res.send({id:item.id})

  
  // do at background, because it will update only changes, so for a new item, nothing to update
  item.updateAttributes(data)    

  // send back inserted id as graphql id
  res.send(item)
})

export default router