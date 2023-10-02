import * as Db from '../model/init.model';

type Db = any
export default {
     create : async (payload: any, model: Db) => {
          const resource = await model.create({...payload})
          return resource
          
     },
      
     getByUserId : async (userId : number, model: Db) => {
          const resources = await model.findOne({where: {userId}})
          return resources
     },
     deleteById : async (payload: number, model: Db) => {
          let where : any = {
             payload
          }
          const resource = await model.findOne(where)
     }
     
}