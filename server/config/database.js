export const connection = {
  dev: {
    username: "root",
    password: process.env.DB_PASS || "123456",
    database: "tkframework",
    host: process.env.DB_SERVER || "127.0.0.1",
    dialect: "mysql",
    pool: {
      max: 50,
      min: 0      
    }
  },
  prod: {
    username: "root",
    password: process.env.DB_PASS,
    database: "tkframework",
    logging: false,
    host: process.env.DB_SERVER || "127.0.0.1",
    dialect: "mysql",
    pool: {
      max: 50,
      min: 0      
    }
  }
}

// mongodb
// export const connection = {
//   dev: {
//     username: "root",
//     password: process.env.DB_PASS || "123456",
//     database: "rudicaf",
//     host: process.env.DB_SERVER || "127.0.0.1",
//     autoIndex: false,
//   },
//   prod: {
//     username: "root",
//     password: process.env.DB_PASS,
//     database: "rudicaf",    
//     host: process.env.DB_SERVER || "127.0.0.1",
//     autoIndex: false,
//   }
// }

