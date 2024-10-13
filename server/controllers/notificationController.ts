import notificationModel from "../models/notificationModel";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/Errorhandler";
import { NextFunction, Request, Response } from "express";
import cron from "node-cron"

//get all notifications --only for admin
export const getNotification = catchAsyncError(async (req: Request, res: Response, next: NextFunction)=>{
    try {

        const notifications=await notificationModel.find().sort({createdAt:-1})
        res.status(201).json({
            success:true,
            notifications
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
  
});

//get update notifications --only for admin
export const updateNotification = catchAsyncError(async (req: Request, res: Response, next: NextFunction)=>{
    try {

        const notification=await notificationModel.findById(req.params.id)
        
        if(notification){
            notification.status? notification.status='read':notification.status;
        }else{
            return next(new ErrorHandler("Notification not found",400))
        }

        await notification.save()

        const notifications=await notificationModel.find().sort({createdAt:-1})
        
        res.status(201).json({
            success:true,
            notifications
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    } 
});

//delete notification --only admin
cron.schedule("0 0 0 * * *",async ()=> {
    const thirtyDaysAgo=new Date(Date.now() - 30*24*60*60*1000)
    await notificationModel.deleteMany({status:"read",createdAt:{$lt: thirtyDaysAgo}})
    console.log("Delete read notifications.")
})


