import models from 'models'

// Create the tables:
models.test.sync()

// insert data
for (var i=1;i<=20;i++) {
  models.test.create({  
    name: `Test ${i}`,  
  })
}
