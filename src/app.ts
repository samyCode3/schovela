import * as express from 'express'
// import * as config from 'config'
import config from './config/default';
import * as cors from 'cors'
import {sequelize}  from './config/database'
import { seedData } from './model/admin.seed';
import {
    StatusCodes
   } from 'http-status-codes'
import './model/index'
import { IndexRoutes } from './routes'; 
const port = config.PORT;  
const app = express()
const connections = async() =>{ 
    try{
        app.use(express.json())
        app.use(cors())
        app.get('/', (req, res) => {
            return res.send("Hello Schovela")
        })
        app.use('/api', IndexRoutes)  
        app.all("*", (req, res, next) => {
            return res.status(StatusCodes.NOT_FOUND).json({ ok: false, message: 'Route not found', body : `${req.method} - ${req.ip} - ${req.url}`})
        })
       sequelize.sync({ alter : true }).then(async ()=>{
            console.log('Database connected successfully.');
            await seedData()
        app.listen(port, () => console.log(`App running on port http://localhost:${port}`))
        }).catch((err)=>{
            throw err;
        });
    } catch(err) { 
        console.error(`Error : ${err}, Can't connect to database...`);
    }
}
connections()


