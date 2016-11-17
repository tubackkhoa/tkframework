import bcrypt from 'bcryptjs'

export const cryptPassword = password => new Promise ((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) 
      return reject(err)

    bcrypt.hash(password, salt, (err, hash) => {
      if (err)
        return reject(err)
      return resolve(hash)
    })
  })
})

export const comparePassword = (password, userPassword) => new Promise((resolve, reject) => {
   bcrypt.compare(password, userPassword, (err, isPasswordMatch) => {
      if (err) 
        return reject(err)
      return resolve(isPasswordMatch)
   })
})