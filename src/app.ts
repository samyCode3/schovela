import * as express from 'express'
import * as config from 'config'
import * as cors from 'cors'
import {sequelize}  from './../config/database'
import {router} from './routes/user.routes'
import './model/index'
const port = config.get<number>('PORT')
const app = express()
const connections = async() =>{
    try{
        app.use(express.json())
        app.use(cors())
        router(app)
       await sequelize.sync({ alter : true }).then(()=>{
            console.log('Database connected successfully.');
        app.listen(port, () => console.log(`App running on port http://localhost:${port}`))
        }).catch((err)=>{
            throw err;
        });
    } catch(err) {
        console.error(`Error : ${err}, Trying again in 5 seconds...`);
        setTimeout(()=>{
            connections();
        }, 5000);
    }
}
connections()


