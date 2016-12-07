import {Router} from 'express'
import news_posts from 'models/tables/Alop/news-posts'
import { getPagingRouter, getDetailRouter, getDeleteRouter, uploadImage } from 'routes/shared/utils'
import authorize from 'passport/authorize'

const router  = new Router()

router.get('/index/:id', getDetailRouter(news_posts, ['id','title','description','content','image']))
router.get('/', getPagingRouter(news_posts, ['id','title','description','image','user_id','updated_at']))
router.delete('/delete/:id', getDetailRouter(news_posts))

// limit json post, update is hardest part to code
router.post('/update', async (req, res) => {
  // check authorize first, for update, also check author_id for post
  authorize(req)
  // currently we not process items, let it for edit phrase
  const {item:{image, ...data}, id} = req.body

  // when delete, should delete all images belong to this content
  data.content = data.content.replace(/<img(.*?)src="(.*?)"/g, (m, g1, g2)=>{
    // replace base 64 with src
    return `<img${g1}src="${uploadImage(g2, 'images', null, false)}"`
  })
  
  // update current user id
  data.user_id = req.user.id
  // update from post data
  const item = id 
    ? await news_posts.findById(id)
    : await news_posts.create(data)
  // do not update for new post
  if(!id)
    res.send({id:item.id})

  uploadImage(image, `news_post/image/${item.id}`, imagePath => data.image=imagePath)

  // do at background, because it will update only changes, so for a new item, nothing to update
  item.updateAttributes(data)    

  // send back inserted id as graphql id
  res.send(item)
})

export default router