import models  from 'models'
import express from 'express'

var router  = express.Router()

router.get('/', (req, res) => {

  models.authors.findAll().then(function(authors) {
    res.send(authors)
  })

})

module.exports = router