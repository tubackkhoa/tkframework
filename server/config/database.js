module.exports =  {  
  connection: {
    dev: {
      username: "root",
      password: "123456",
      database: "tkframework",
      host: "127.0.0.1",
      dialect: "mysql",
      pool: {
        max: 50,
        min: 0      
      }
    },
    prod: {
      username: "root",
      password: "abc123ABC",
      database: "tkframework",
      logging: false,
      host: "localhost",
      dialect: "mysql",
      pool: {
        max: 50,
        min: 0      
      }
    }
  }
}