import { Router } from 'express'
import YouTube from 'youtube-node'

const router  = new Router()

const youTube = new YouTube()
youTube.setKey('AIzaSyAYMWfgMbdpwAzUPyxd7XhrgKCfmAq5IQY')


router.get('/search', async (req, res) => {
  const key = req.query.q
  youTube.search(key, 10, (error, result) => {    
    res.send(error || result)    
  })
})

export default router