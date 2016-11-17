import  { connection }  from 'config/database'
import Sequelize from 'sequelize'

const {database, username, password, ...config} = connection[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']

export const sequelize = new Sequelize(database, username, password, config)
export const DataTypes = Sequelize


