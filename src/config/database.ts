// import * as config from 'config';
import config from './default';
import {Sequelize} from 'sequelize' 
// console.log(config);
// const host = config.get<string>('DATABASE.HOST')
// const user = config.get<string>('DATABASE.USER')
// const pass = config.get<string>('DATABASE.PASS')
// const database = config.get<string>('DATABASE.DB')
// const port = config.get<string>('DATABASE.PORT')

// export const sequelize = new Sequelize({
//     dialect : 'postgres',
//     host : host,
//     username : user,
//     password : pass,
//     database : database,
//     port : port
// })


export const sequelize = new Sequelize({
    dialect : 'mysql',
    host : process.env.DB_HOST,
    username : process.env.DB_USER,
    password : process.env.PASS,
    database : process.env.DATABASE,
    port : Number(process.env.MYSQL_PORT)
})