import {Router} from 'express'
import sellposts from 'models/tables/Alop/sellposts'

import authorize from 'passport/authorize'
import models from 'models'

import { v4 } from 'uuid'
import fse from 'fs-extra'
import path from 'path'
import { filePath } from 'config/constants'
import { decodeBase64Image } from 'data/decoder/image'
import { cryptPassword, comparePassword } from 'passport/password-crypto'
import jwt from 'jsonwebtoken'
import { jwtSecret }   from 'config/constants'

import users from 'models/tables/Alop/users'

import 'isomorphic-fetch'

const router  = new Router()

const doLoginSocial = async (login_type, login_token, req, next) => {

  let user = await users.findOne({
    where:{login_token},
    attributes: ['id', 'email', 'phone', 'username', 'avatar', 'name'],
  })

  if(!user) {
    const userInfo = {
      username: login_token,
      login_type,
      login_token,
    }    
    if(login_type === 'facebook') {
      Object.assign(userInfo, 
        await fetch(`https://graph.facebook.com/me?fields=email,name,id&access_token=${login_token}`)
        // assume this service is always working
        .then(res => res.json())  
        .then(json => ({          
          name: json.name,
          avatar: `http://graph.facebook.com/${json.id}/picture?type=large`,  
          email: json.email, 
        }))
      )
    } else {
      Object.assign(userInfo,
        await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${login_token}`)
        // assume this service is always working
        .then(res => res.json())  
        .then(json => ({          
          name: json.name,
          avatar: json.picture,  
          email: json.email, 
        }))
      )      
    }

    // insert new user
    user = await users.create(userInfo)
  }

  req.user = user

  // next have to wait for this async
  next()
}

const doLoginLocal = async (username, password, req, next) => {
  const row = await users.findOne({
    where:{
      username,        
    },
    attributes: ['id', 'email', 'phone', 'avatar', 'name', 'encrypted_password'],
  })

  if(row){
    // row is just instance, because we await for it, but dataValues are ready as pure json
    const {encrypted_password, ...user} = row.dataValues
    const checkPassword = await comparePassword(password, encrypted_password)
    if(checkPassword) {
      // filter result before returning to client
      req.user = user
    }
  } 

  // next middle 
  next()
}

const generateAccessToken = (req, res, next) => {  
  // we just get back user with id and email is good enough  
  // we use role to differentiate with other users
  jwt.sign({
    id: req.user.id,
    // use login_token or username as identify detail
    username: req.user.username,
    email: req.user.email,
    name: req.user.name,
    avatar: req.user.avatar,
  }, jwtSecret, {
    expiresIn: 60*60*24*7,   // just 1 week, user can not refresh token
  },(err, accessToken) => {    
    req.token = {
      accessToken,
    }
    next()
  })  
}

const respondLogin = ({user, token}, res) => {  
  if(!user){
    res.send(401, 'Unauthorized!')
  } else {
    res.send({
      user,
      token,
    })
  }  
}

const updateUser = (req, user) => {
  const {password, email, avatar, phone, name} = req.body
  const imageDecode = decodeBase64Image(avatar)
  const info = {password, email, avatar, phone, name}
  if(imageDecode.buffer) {
    const imagePath = path.join(filePath, `user/image${user.id}`)
    // clear old image first
    fse.removeSync(imagePath)   
    // update new image
    const filename = v4() + '.png'  
    // must save done then return   
    fse.outputFileSync(path.join(imagePath, filename), imageDecode.buffer)        
    info.avatar = `/uploads/user/image/${user.id}/${filename}`
  } 
  
  user.updateAttributes(info)
  return info
}

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

router.get('/me', (req, res) => {
  res.send(req.user)
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

router.put('/block/:id', (req, res) => {
  authorize(req)
  // only admin user can block
  const {id} = req.params
  sellposts.destroy({
    where:{id}
  })
  .then(deletedNumber => res.send({deletedNumber}))
})

// limit json post
router.post('/update', async (req, res) => {
  if(!req.user)
    throw new Error('Unauthorized')
  // check authorize first, for update, also check author_id for post
  // check req.user.id to update
  // currently we not process items, let it for edit phrase
  const user = await users.findById(req.user.id, {
    attributes: ['id'],
  })
  // wait for avatar to return, update attribute at background
  res.send(updateUser(req, user))
})

router.post('/login', async (req, res, next) => {
  const {login_token, login_type, username, password} = req.body
  // check if not found then insert
  // otherwise just return accessToken

  if(login_type === 'local'){
    doLoginLocal(username, password, req, next)
  } else {
    doLoginSocial(login_type, login_token, req, next)
  }  
  
}, generateAccessToken, respondLogin)

router.post('/register', async (req, res, next) => {
  const {username} = req.body
  const encrypted_password = await cryptPassword(password)   
  // need some validation here
  const user = await users.create({
    username,
    encrypted_password,
  })
  // wait for avatar to return, update attribute at background
  req.user = {...updateUser(req, user), username}
}, generateAccessToken, respondLogin)

export default router