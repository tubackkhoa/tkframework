import models  from 'models'
import {Router} from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import constants   from 'config/constants.json'
import passport from 'passport/local'

const router  = new Router()

const serialize = (req, res, next) => {  
  if(!req.user) {
    return next(new Error('Username or password is not correct!!!'))
  }
  // just return it without modify to req.user
  next()  
}

const generateAccessToken = (req, res, next) => {  
  // we just get back user with id and email is good enough
  jwt.sign({
    id: req.user.id,
    email: req.user.email
  }, constants.jwtSecret, {
    expiresIn: 60   // just 1 minute, user can refresh token automatically at client
  },(err, accessToken) => {    
    req.token = {
      accessToken,
    }
    next()
  })  
}

const generateRefreshToken = (req, res, next) => {  
  if (req.query.permanent === 'true') {
    req.token.refreshToken = req.user.id.toString() + '.' + crypto.randomBytes(40).toString('hex')
    models.authors.update({      
      refresh_token: req.token.refreshToken,
    },{
      where:{
        id: req.user.id,
      }
    })    
  }
  // just update refresh_token at background for faster return
  next()  
}

const validateRefreshToken = (req, res, next) => {  
  const refresh_token = req.body.refreshToken
  if(refresh_token){
    models.authors.findOne({
      where:{
        refresh_token,        
      },
      attributes: ['id', 'name', 'email', 'image']
    }).then(user=>{
      if (!user) {
        return next(new Error('Refresh token is not correct!!!'))
      }
      // assign again
      req.user = user
      next()
    })       
  } else {
    next(new Error('Empty refreshToken sent!!!'))
  }  
}


// now we route it, from the root
router.post('/', passport.authenticate('local', {
  session: false
}), serialize, generateAccessToken, generateRefreshToken, ({user, token}, res) => {  
  res.send({
    user,
    token,
  })
})

// we get token again via refresh token
router.post('/token', validateRefreshToken, generateAccessToken, ({token}, res) => {
  res.send({
    token,
  })
})

// we just end this session, no way to refresh, for logout, we end this and logout
// assume we not use authenticate to get back user information, no id, just session key
// as refresh_token, unique value
router.post('/reject', ({body:{refreshToken:refresh_token}}, res) => {  
  models.authors.update({      
    refresh_token: '',
  },{
    where:{
      refresh_token
    }
  }).then(()=>{
    // mark no content
    res.status(204).end()
  }) 
})

// we just logout the passport, then redirect to home page or login page
// we do not use session, if you use it you have to redirect in req.session.destroy(function (err) {})
router.post('/logout', (req, res) => {
  // logout passport to end access token immediately
  req.logout()
  // delete refresh_token as session
  models.authors.update({      
    refresh_token: '',
  },{
    where:{
      refresh_token
    }
  }).then(()=>{
    // just redirect to home page
    res.redirect('/')
  })   
})

export default router

