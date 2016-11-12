// we use single refreshtoken so other will be reject when we login again
import passport from 'passport'
// can be facebook, google...
import LocalStrategy from 'passport-local'
import models from 'models'
// extend strategy
passport.use(new LocalStrategy((email, encrypted_password, done) => {
    models.authors.findOne({
      where:{
        email,
        encrypted_password,
      },
      attributes: ['id', 'name', 'email', 'image']
    }).then(user=>{      
      done(null, user)
    })   
  }
))

export default passport