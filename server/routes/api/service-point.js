import {Router} from 'express'

const router  = new Router()


router.get('/getNearByService', (req, res) => {
  // tag is public
  res.send({
    data: 'value',
    // spId,
    // name,
    // address,
    // phone,
    // lat,
    // lon,
    // description,
    // createdDate,
  })  
})


export default router