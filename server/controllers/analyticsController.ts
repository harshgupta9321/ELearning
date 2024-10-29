import { Request,Response,NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/Errorhandler";
import { generateLast12MonthData } from "../utils/analytics.generator";
import userModel from "../models/usermodel";
import courseModel from "../models/coursemodel";
import orderModel from "../models/orderModel";

//get user analytics --only for admin
export const getUserAnalytics = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const users=await generateLast12MonthData(userModel)
        
        res.status(200).json({
            success: true,
            users
        })

    }catch(error:any){
        return next(new ErrorHandler(error.message, 400))
    }
})

//get course analytics --only for admin
export const getCourseAnalytics = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const courses=await generateLast12MonthData(courseModel)
        
        res.status(200).json({
            success: true,
            courses
        })

    }catch(error:any){
        return next(new ErrorHandler(error.message, 400))
    }
})

//get order analytics --only for admin
export const getOrderAnalytics = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const orders=await generateLast12MonthData(orderModel)
        
        res.status(200).json({
            success: true,
            orders
        })

    }catch(error:any){
        return next(new ErrorHandler(error.message, 400))
    }
})
