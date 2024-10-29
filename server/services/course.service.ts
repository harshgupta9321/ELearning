import courseModel from "../models/coursemodel"
import { NextFunction, Response } from "express"
import { catchAsyncError } from "../middleware/catchAsyncError"
import ErrorHandler from "../utils/Errorhandler"

// get course by id
export const createCourse=catchAsyncError(async (data:any,res:Response,next:NextFunction)=>{
        try{
            const course=await courseModel.create(data)
        res.status(201).json({
            success:true,
            course
        })   
        }catch(error:any){
            return next(new ErrorHandler(error.message,400))
        }
    
})

// get all course 
export const getAllCourseService=async (res:Response)=>{
    const courses =await courseModel.find().sort({createdAt:-1})
   
        res.status(201).json({
            success:true,
            courses
        })  
}