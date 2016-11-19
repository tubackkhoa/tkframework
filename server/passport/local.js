// we use single refreshtoken so other will be reject when we login again
import passport from 'passport'
// can be facebook, google...
import LocalStrategy from 'passport-local'
import models from 'models'
import {comparePassword} from 'passport/password-crypto'
// extend strategy
passport.use(new LocalStrategy(async (email, password, done) => {

    const row = await models.authors.findOne({
      where:{
        email,        
      },
      attributes: ['id', 'name', 'email', 'image', 'introduction', 'description', 'encrypted_password']
    })

    if(row){
      // row is just instance, because we await for it, but dataValues are ready as pure json
      const {encrypted_password, image, ...user} = row.dataValues
      const checkPassword = await comparePassword(password, encrypted_password)
      if(checkPassword) {
        // update full image for user
        user.avatar = `/uploads/author/image/${user.id}/${image}`
        user.social_accounts = await row.getSocialAccounts(['author_id', 'id', 'account_type', 'url'])
        return done(null, user)        
      }
    }  

    done(new Error('Email or password is not correct!!!'), null)        
  
}))

export default passport