// import * as config from 'config';
import config from './default';
import * as pg from 'pg'
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
    dialect : 'postgres',
    dialectModule: pg,
    host : config.DATABASE.HOST,
    username : config.DATABASE.USER,
    password : config.DATABASE.PASS,
    database : config.DATABASE.DB,
    port : Number(config.DATABASE.PORT)
})