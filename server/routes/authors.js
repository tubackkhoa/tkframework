import models  from 'models'
import express from 'express'

var router  = express.Router()

router.get('/', (req, res) => {

  models.posts.findById(1).then(function(post){
    res.send((post instanceof models.posts) ? 'true' : 'false')
  })

})

module.exports = router