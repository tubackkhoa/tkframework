import models from 'models'
import {cryptPassword,comparePassword} from 'passport/password-crypto'

cryptPassword('123456').then(encrypted_password=>
  models.authors.create({
    email:'admin@example.com',
    name: 'Admin',
    encrypted_password, 
  })
)