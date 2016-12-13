import { Router } from 'express'
import users from 'models/tables/Alop/users'
import {sequelize, DataTypes} from 'models/config'
import authorize from 'passport/authorize'
import { getPagingRouter, getDetailRouter, getDeleteRouter, uploadImage } from 'routes/shared/utils'

import { cryptPassword, comparePassword } from 'passport/password-crypto'
import jwt from 'jsonwebtoken'
import { jwtSecret }   from 'config/constants'

// share code with client
import 'isomorphic-fetch'

const router  = new Router()

const doLoginSocial = async (login_type, login_token, req, next) => {
  
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

  // if use does not allow access email, then use login_token as unique username
  userInfo.email = userInfo.email || login_token

  let user = await users.findOne({
    where:{email:userInfo.email},
    attributes: ['id', 'email', 'phone', 'username', 'avatar', 'name', 'user_type'],
  })

  if(!user) {
    // insert new user
    user = await users.create(userInfo)
  } else {
    // update at background
    user.updateAttributes(userInfo)
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
    attributes: ['id', 'email', 'phone', 'avatar', 'name', 'encrypted_password', 'user_type'],
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
  const {email:username, avatar, phone, name, user_type} = req.body
  const info = {username, phone, name, user_type}
  uploadImage(avatar, `user/image/${user.id}`, imagePath => info.avatar=imagePath)  
  user.updateAttributes(info)
  return info
}

router.get('/index/:id', getDetailRouter(users, ['id','name', 'username', 'phone','avatar','email','registered_at']))
router.get('/', getPagingRouter(users, ['id','name','registered_at','username','phone','email','avatar','block','updated_at']))

router.get('/me', (req, res) => {
  res.send(req.user)
})

router.put('/block/:id', (req, res) => {
  authorize(req)
  // only admin user can block
  const {id} = req.params
  users.update({
    block: sequelize.literal('NOT `block`'),
  }, {
    where: {id},
  })
  res.send({id})
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
  const {email, password} = req.body
  const encrypted_password = await cryptPassword(password)   
  // need some validation here
  try{
    const user = await users.create({
      email,
      encrypted_password,
    })
    // wait for avatar to return, update attribute at background
    req.user = {...updateUser(req, user), email}
    // call next action
    next()
  } catch(ex) {
    res.send({
      message: ex.message,
      success: false,
    })
  }  
}, generateAccessToken, respondLogin)

// we just logout the passport, then redirect to home page or login page
// we do not use session, if you use it you have to redirect in req.session.destroy(function (err) {})
router.post('/logout', (req, res) => {

  if(!req.user){
    return res.status(204).end()
  }
  
  // logout passport to end access token immediately
  req.logout()
})

export default router