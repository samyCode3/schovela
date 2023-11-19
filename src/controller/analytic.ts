import { NextFunction } from "express"
import { Analytics } from "../services/analytic.service"

export const AnalyticsController = async (req: Request | any, res : Response | any, next : NextFunction) => {
    let {user} = req
    try {
       let Analytic = await Analytics()
       return res.status(Analytic.status).json({...Analytic}) 
    } catch (error) {
        let err = new Error(error)   
        console.log(`${err}`)
        next(error)
     
    }
 }