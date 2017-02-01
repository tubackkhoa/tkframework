import models from 'models'
import {encryptPassword,comparePassword} from 'passport/password-crypto'

encryptPassword('123456').then(encrypted_password=>
  models.authors.create({
    email:'admin@example.com',
    name: 'Admin',
    encrypted_password, 
  })
)