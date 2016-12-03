import {Router} from 'express'
import sellposts from 'models/tables/Alop/sellposts'
import { getPagingRouter, getDetailRouter, getDeleteRouter, uploadImage } from 'routes/shared/utils'
import authorize from 'passport/authorize'

const router  = new Router()

router.get('/index/:id', getDetailRouter(sellposts, ['id','title','description','phone','image','user_id']))
router.get('/', getPagingRouter(sellposts, ['id','title','description','phone','user_id','image']))
router.delete('/delete/:id', getDetailRouter(sellposts))

// limit json post
router.post('/update', async (req, res) => {
  // check authorize first, for update, also check author_id for post
  authorize(req)
  // currently we not process items, let it for edit phrase
  const {item:{image, ...data}, id} = req.body  

  // update current user id
  data.user_id = req.user.id
  // update from post data
  const item = id 
    ? await sellposts.findById(id)
    : await sellposts.create(data)

  if(!id)
    res.send({id:item.id})

  uploadImage(image, `sellpost/image${item.id}`, imagePath => data.image=imagePath)

  // do at background
  item.updateAttributes(data)    

  // send back inserted id as graphql id
  res.send(item)
})

export default router