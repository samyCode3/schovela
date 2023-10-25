import { FindOptions, Op } from 'sequelize';
import * as Db from '../model/init.model';

type Db = any
export default {
     create : async (payload: any, model: Db) => {
          const resource = await model.create({...payload})
          return resource
          
     },
      get : async ( model: Db, options?: any) => {
          const resources = await model.findAll(options)
          return resources
      },
      getAllByIds : async (payload : any,  model: Db, options?: any) => {
          const resources = await model.findAll({where: payload}, options)
          return resources
      },
     getByIds : async (payload : any, model: Db, options?:any) => {
          const resources = await model.findOne({where: payload}, options)
          return resources
     },  
     deleteById : async (payload: any, model: Db) => {
          const resource = await model.findOne({where: payload})
           return resource
     },
     updateById : async (data: any, payload : any, model: Db) => {
            const resource = await model.updateOne({data}, {where : payload})
            return resource
     }
     
}