import {Router} from 'express'
import sellposts from 'models/tables/Alop/sellposts'

import authorize from 'passport/authorize'

import { v4 } from 'uuid'
import fse from 'fs-extra'
import path from 'path'
import { filePath } from 'config/constants'
import { decodeBase64Image } from 'data/decoder/image'

const router  = new Router()

router.get('/index/:id', (req, res) => {
  // tag is public
  const {id} = req.params
  sellposts.findById(id,{
    attributes:['id','title','description','phone','image','user_id']
  }).then( item => {
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
    attributes:['id','title','description','phone','image','user_id'],
  }).then(result => {
    res.send({...result, offset})
  })
})

router.delete('/delete/:id', (req, res) => {
  authorize(req)
  const {id} = req.params
  sellposts.destroy({
    where:{id}
  })
  .then(deletedNumber => res.send({deletedNumber}))
})

// limit json post
router.post('/update', async (req, res) => {
  // check authorize first, for update, also check author_id for post
  authorize(req)
  // currently we not process items, let it for edit phrase
  const {item:{image, ...data}, id} = req.body
  const imageDecode = decodeBase64Image(image)

  // update current user id
  data.user_id = req.user.id
  // update from post data
  const item = id 
    ? await sellposts.findById(id)
    : await sellposts.create(data)

  if(!id)
    res.send({id:item.id})

  // do at background
  item.updateAttributes(data)    

  // delete old one
  if(imageDecode.buffer) {
    const imagePath = path.join(filePath, `sellpost/image${item.id}`)
    if(id)    
      fse.removeSync(imagePath)   
    // update new image
    const filename = v4() + '.png'  
    // must save done then return   
    fse.outputFileSync(path.join(imagePath, filename), imageDecode.buffer)    
    item.updateAttributes({
      image:`/uploads/sellpost/image/${item.id}/${filename}`
    })
  }  
  // send back inserted id as graphql id
  res.send(item)
})

export default router