import { Router } from 'express'
import YouTube from 'youtube-node'

const router  = new Router()

const youTube = new YouTube()
youTube.setKey('AIzaSyAYMWfgMbdpwAzUPyxd7XhrgKCfmAq5IQY')


router.get('/search', (req, res) => {
  const {q:key,type='video'} = req.query
  youTube.addParam('type', type)
  youTube.search(key, 10, (error, result) => res.send(error || result))    
})

router.get('/index/:id', (req, res)=>{
  const {id} = req.params
  youTube.getById(id, (error, result) => res.send(error || result))    
})

export default router