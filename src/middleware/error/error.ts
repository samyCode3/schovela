import { StatusCodes } from "http-status-codes"

export const ErrorMiddleware = (err, req, res, next) => {
    
    if(err.status) {
        return res.status(err.status).json({ok : err.ok, status : err.status, message: err.message})
    }

    if(err.status || 500) {
<<<<<<< HEAD
        return res.status(500).json({ok : false, status : StatusCodes.INTERNAL_SERVER_ERROR, message: `INTERNAL SERVER ERROR ${err.message}`})
=======
        return res.status(500).json({ok : false, status : StatusCodes.INTERNAL_SERVER_ERROR, message: err.message})
>>>>>>> parent of 2d4dedb (update on the middleware)
    }
}