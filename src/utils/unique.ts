import { StatusCodes } from 'http-status-codes';
import * as Db from '../model';
import { Model, FindOptions } from 'sequelize';

type Db = any

export const create = async<T extends Model>(payload: any, model: Db): Promise<T | null> => {
     let resource = await model.create({...payload})
     return resource
}

export const getAll =  async (model: Db, options : FindOptions) => {
      let {limit, order, attributes, offset} = options 
      order = [['id', 'DESC']]
      limit = 20
      attributes = []
      let resource = await model.findAll({limit, order, attributes,  offset})
      return resource
}

export const getByuserId = async<T extends Model>(
   userId: number,
   model:  Db,
   options?: FindOptions
  ): Promise<T | null> => {
   let where : any = {
     userId
   }

   let resource =  await model.findOne({where, ...options})
   if(!userId) {
     throw{
       ok: false,
       status: StatusCodes.BAD_REQUEST,
       message: `User with this id : ${userId} is not found`
     }
   }
   return resource
}

export const getById = async<T extends Model>(
   id: number,
   model:  Db,
   options?: FindOptions
  ): Promise<T | null> => {
   let where : any = {
     id
   }

   let resource =  await model.findOne({where, ...options})
   if(!id) {
     throw{
       ok: false,
       status: StatusCodes.BAD_REQUEST,
       message: `User with this id : ${id} is not found`
     }
   }
   return resource
}

export const updateOne = async<T extends Model>(payload: any, id: number,  model: Db): Promise<T | null> => {
  let where : any = {
    id
  }
  let resource = await model.updateOne({payload}, {where})
  if(!resource) {
    throw {
      ok : false, 
      status: StatusCodes.BAD_REQUEST,
      message : `unable to undate field with this id ${id}`
    }
  }
  return resource
}


export const DeleteById = async<T extends Model>(id: number,  model: Db): Promise<T | null> => {
  let where : any = {
    id
  }
  let delete_resource = await model.destroy({where})
  if(!id) {
    throw {
      ok : false, 
      status: StatusCodes.BAD_REQUEST,
      message : `unable to delete with this id ${id}`
    }
  }
  return delete_resource
}

export const DeleteByUserId = async<T extends Model>(userId: number,  model: Db): Promise<T | null> => {
  let where : any = {
    userId
  }
  let delete_resource = await model.destroy({where})
  if(!userId) {
    throw {
      ok : false, 
      status: StatusCodes.BAD_REQUEST,
      message : `unable to delete with this id ${userId}`
    }
  }
  return delete_resource
}