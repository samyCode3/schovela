import * as express from 'express'
// import * as config from 'config'
import config from './config/default';
import * as cors from 'cors'
import {sequelize}  from './config/database'
import {router} from './routes/auth.routes'
import {UserRouter} from './routes/user.routes'
import { AdminRoute } from './routes/admin.routes';
import {
    StatusCodes
   } from 'http-status-codes'
import './model/index'
const port = config.PORT;
const app = express()
const connections = async() =>{
    try{
        app.use(express.json())
        app.use(cors())
        AdminRoute(app)
        router(app)
        UserRouter(app)
        app.all("*", (req, res, next) => {
            return res.status(StatusCodes.NOT_FOUND).json({ ok: false, message: 'Route not found', body : `${req.method} - ${req.ip} - ${req.url}`})
        })
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


