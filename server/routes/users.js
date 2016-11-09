import models  from 'models'
import express from 'express'

var router  = express.Router()

router.get('/', (req, res) => {

  models.User.findAll().then(function(users) {
    res.send(users)
  })

})

module.exports = router