import { Router } from "express"
import { AnalyticsController } from "../controller/analytic"


export const analyticRoutes = Router()

analyticRoutes.get('/', AnalyticsController)