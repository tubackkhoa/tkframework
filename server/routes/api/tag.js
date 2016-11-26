import { Router } from 'express'
import models from 'models'

const router  = new Router()

router.get('/', (req, res) => {
  // tag is public
  models.tags.findAll({      
    attributes: ['name']
  }).then( tags => {
    // logout passport to end access token immediately
    res.send(tags.map(tag => tag.name))
  })   
})

export default router