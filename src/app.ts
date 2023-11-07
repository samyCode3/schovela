import * as express from 'express'
import * as fs from 'fs';
// import * as config from 'config'
import config from './config/default';
import * as cors from 'cors'
import {sequelize}  from './config/database'
import { seedData } from './model/admin.seed';
import {
    StatusCodes
   } from 'http-status-codes'
import './model/init.models'
import { IndexRoutes } from './routes'; 
const port = config.PORT;  
const app = express()

const connections = async() =>{ 
    try{
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(cors());
        app.use(express.static('uploads'));
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
            if(!fs.existsSync('uploads')){
                fs.mkdirSync('uploads');
                console.log('Created new uploads directory');
            }
        app.listen(port, () => console.log(`App running on port http://localhost:${port}`))
        }).catch((err)=>{
            throw err;
        });
    } catch(err) { 
        console.error(`Error : ${err}, Can't connect to database...`);
    }
}
connections()


