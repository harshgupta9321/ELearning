import express from "express";
import { isAuthenticated,authorizeRole } from "../middleware/auth";
import { getNotification, updateNotification } from "../controllers/notificationController";
import { updateAccessToken } from "../controllers/userController";
const notificationRouter=express.Router()

notificationRouter.get("/get-all-notification",updateAccessToken,isAuthenticated,authorizeRole("admin"),getNotification)
notificationRouter.put("/update-notification/:id",updateAccessToken,isAuthenticated,authorizeRole("admin"),updateNotification)

export default notificationRouter