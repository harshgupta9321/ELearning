import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import { getCourseAnalytics, getOrderAnalytics, getUserAnalytics } from "../controllers/analyticsController";
import { updateAccessToken } from "../controllers/userController";
const analyticsRouter=express.Router()

analyticsRouter.get('/get-users-analytics',updateAccessToken,isAuthenticated,authorizeRole("admin"),getUserAnalytics)
analyticsRouter.get('/get-courses-analytics',updateAccessToken,isAuthenticated,authorizeRole("admin"),getCourseAnalytics)
analyticsRouter.get('/get-orders-analytics',updateAccessToken,isAuthenticated,authorizeRole("admin"),getOrderAnalytics)

export default analyticsRouter