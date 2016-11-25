import {Router} from 'express'
import service_points from 'models/tables/Alop/service-points'

import authorize from 'passport/authorize'
import {sequelize, DataTypes} from 'models/config'

import { v4 } from 'uuid'
import fse from 'fs-extra'
import path from 'path'
import { filePath } from 'config/constants'
import { decodeBase64Image } from 'data/decoder/image'

const router  = new Router()

const RAD = Math.PI / 180
const DEGREE = 180 / Math.PI
const distance_unit = 111.045

router.get('/getNearByService', async (req, res) => {
  // tag is public
  const {lat, lng, distance:distance_in_kilometers = 0.1} = req.query

  if (lat && lng) {
    // calculate      
    const rad_lat = lat * RAD
    const rad_lng = lng * RAD
    const lat_cos = Math.cos(rad_lat)
    const lng_cos = Math.cos(rad_lng)
    const lat_sin = Math.sin(rad_lat)
    const lng_sin = Math.sin(rad_lng)

    const sql = `SELECT name, password, address,
acos(${lat_sin} * lat_sin + ${lat_cos} * lat_cos * cos((${lng} - lng) * ${RAD})) * ${DEGREE} * ${distance_unit} AS distance       
FROM wifi_chua
WHERE lat BETWEEN 
  ${lat} - (${distance_in_kilometers} / ${distance_unit}) 
  AND 
  ${lat} + (${distance_in_kilometers} / ${distance_unit})
  AND 
  lng BETWEEN ${lng} - (${distance_in_kilometers} / (${distance_unit} * ${lat_cos})) 
  AND 
  ${lng} + (${distance_in_kilometers} / (${distance_unit} * ${lat_cos}))  
HAVING distance <= ${distance_in_kilometers}  ORDER BY distance LIMIT 10`
     
     
  sequelize.query(sql,{ type: DataTypes.SELECT})
   .then(items => res.send(items))
   .catch(e =>res.status(400).write('Error'))      
      
 } else {
  res.status(204).end() 
 }   

})

// detail item
router.get('/index/:id', (req, res) => {
  // tag is public
  const {id} = req.params
  service_points.findById(id, {
    attributes: ['id','name','address','phone','lat','lng','description','owner_id','image'],
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
  service_points.findAndCount({
    limit: maxLimit,
    offset,
    attributes: ['id','name','address','phone','lat','lng','description','owner_id','image'],
  }).then(result => {
    res.send({...result, offset})
  })
})

router.delete('/delete/:id', (req, res) => {
  authorize(req)
  const {id} = req.params
  service_points.destroy({
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
  data.user_id = req.user.id
  const rad_lat = data.lat * RAD
  const rad_lng = data.lng * RAD
  data.lat_cos = Math.cos(rad_lat)
  data.lng_cos = Math.cos(rad_lng)
  data.lat_sin = Math.sin(rad_lat)
  data.lng_sin = Math.sin(rad_lng)

  // update from post data
  const item = id 
    ? await service_points.findById(id)
    : await service_points.create(data)

  // return client so they will not wait and ready to update without create new
  if(!id)
    res.send({id:item.id})

  // otherwise update
  item.updateAttributes(data)    

  // delete old one
  if(imageDecode.buffer) {
    const imagePath = path.join(filePath, `service_point/image/${item.id}`)
    if(id)      
      fse.removeSync(imagePath)   
    // update new image
    const filename = v4() + '.png'  
    // must save done then return   
    fse.outputFileSync(path.join(imagePath, filename), imageDecode.buffer)    
    item.updateAttributes({
      image:`/uploads/service_point/image/${item.id}/${filename}`
    })
  }  
  // send back inserted id as graphql id
  res.send(item)
})


export default router