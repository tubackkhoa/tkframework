import { Router } from 'express'

const router  = new Router()

router.use('/tags', require('./tag').default)
router.use('/post', require('./post').default)
// service point, use require for adding route without naming, and faster to change
router.use('/servicepoint', require('./service-point').default)
router.use('/sellpost', require('./sellpost').default)
router.use('/user', require('./user').default)
router.use('/newspost', require('./news-post').default)

export default router