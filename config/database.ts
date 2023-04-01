import * as config from 'config'
import {Sequelize} from 'sequelize'
const host = config.get<string>('DATABASE.HOST')
const user = config.get<string>('DATABASE.USER')
const pass = config.get<string>('DATABASE.PASS')
const database = config.get<string>('DATABASE.DB')
const port = config.get<string>('DATABASE.PORT')
export const sequelize = new Sequelize({
    dialect : 'mysql',
    host : host,
    username : user,
    password : pass,
    database : database,
    port : port
})