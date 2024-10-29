require("dotenv").config();
import { Request,Response,NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import courseModel from "../models/coursemodel";
import ErrorHandler from "../utils/Errorhandler";
import cloudinary from "cloudinary"
import { createCourse, getAllCourseService } from "../services/course.service";
import { redis } from "../utils/redis";
import mongoose, { Mongoose } from "mongoose";
import ejs from "ejs"
import path from "path"
import sendMail from "../utils/sendMail";
import notificationModel from "../models/notificationModel";
import axios from 'axios'

//upload course
export const uploadCourse=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const data=req.body;
        const thumbnail=data.thumbnail       
        
        if(thumbnail){
       
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail,{folder:"courses"})
            

           data.thumbnail={
                public_id: myCloud.public_id,
                url:myCloud.secure_url
           }
        }
        createCourse(data,res,next)
 
    }catch(error:any){
        return next(new ErrorHandler(error.message,400))
    }
})

//edit course
export const editCourse=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const data=req.body;
        const thumbnail=data.thumbnail
        const courseId=req.params.id;
        const courseData=await courseModel.findById(courseId) as any   
        
        if(thumbnail && !thumbnail.startsWith("https")){
            await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id)
        
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail,{folder:"courses"})

            data.thumbnail={
                public_id: myCloud.public_id,
                url:myCloud.secure_url
            }
        }  
        
        if(thumbnail.startsWith("https")){
            data.thumbnail={
                public_id: courseData?.thumbnail.public_id,
                url:courseData?.thumbnail.url
            }
        }
        

        const course=await courseModel.findByIdAndUpdate(courseId,{$set:data},{new:true})
        res.status(200).json({
            success: true,
            course
        })


    }catch(error:any){
        return next(new ErrorHandler(error.message,500))
    }
})

//get single course --without purchasing
export const getSingleCourse=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {

        const courseId=req.params.id;
        const isCacheExist=await redis.get(courseId)
        if(isCacheExist){
            const course=JSON.parse(isCacheExist)
            res.status(200).json({
                success:true,
                course
            })
        }else{

            const course=await courseModel.findById(courseId).select("-courseData.links -courseData.videoUrl -courseData.suggestion -courseData.questions")

            await redis.set(courseId,JSON.stringify(course),"EX",604800)
            
            res.status(200).json({
                success:true,
                course
            })
        }


    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
})

//get all course without purchasing
export const getAllCourse=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {

        // const isCacheExist=await redis.get("allCourses")
        // if(isCacheExist){
        //     const course=JSON.parse(isCacheExist)
        //     res.status(200).json({
        //         success:true,
        //         course
        //     })
        // }else{

            const course=await courseModel.find().select("-courseData.links -courseData.videoUrl -courseData.suggestion -courseData.questions")

            await redis.set("allCourses",JSON.stringify(course))

            res.status(200).json({
                success:true,
                course
            })
            
        // }
        
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
})

//get  course content --only for valid users
export const getCourseByUser=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {

        const userCourseList=req.user?.courses;
        const courseId=req.params.id;
        const courseExists=userCourseList?.find((course:any)=> course._id.toString()=== courseId)
        if(!courseExists){
            return next(new ErrorHandler("You are not eligible to access this course",400))
        }

        const course= await courseModel.findById(courseId)
        const content=course?.courseData
        res.status(200).json({
            success:true,
            content
        })
        

    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
})

//add questions to course
interface IAddQuestions{
    question:string;
    courseId:string;
    contentId:string;
}

export const addQuestion = catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {question,courseId,contentId}:IAddQuestions=req.body;
        const course=await courseModel.findById(courseId)
        if(!mongoose.Types.ObjectId.isValid(contentId)){
            return next(new ErrorHandler("Invalid content id",400))
        }

        const courseContent= course?.courseData.find((item:any)=> item._id.equals(contentId))

        if(!courseContent){
            return next(new ErrorHandler("Invalid content id",400))

        }

        //create new question object
        const newQuestion:any={
            user:req.user,
            question,
            questionReplies:[]
        }
        courseContent.questions.push(newQuestion)

        await notificationModel.create({
            user:req.user?._id,
            title:"New Question Received",
            message:`You have a new question in ${courseContent.title}`
        })

        //save the updated course
        await course?.save()
        res.status(200).json({
            success:true,
            course
        })

    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
})



//add answer to the questions
interface IAddAnswerData{
    answer:string;
    courseId:string;
    contentId:string;
    questionId:string;

}

export const addAnswer=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {answer,courseId,contentId,questionId}:IAddAnswerData=req.body;
        const course=await courseModel.findById(courseId)

        if(!mongoose.Types.ObjectId.isValid(contentId)){
            return next(new ErrorHandler("Invalid content id",400))
        }

        const courseContent= course?.courseData.find((item:any)=> item._id.equals(contentId))

        if(!courseContent){
            return next(new ErrorHandler("Invalid content id",400))

        }

        const question=courseContent?.questions?.find((item:any)=>item._id.equals(questionId))

        if(!question){
            return next(new ErrorHandler("Invalid question id",400))
        }

        //create new answer
        const newAnswer:any={
            user:req.user,
            answer,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()

        }

        question.questionReplies?.push(newAnswer)

        await course?.save()

        if(req.user?._id===question.user._id){
            //create notification
            await notificationModel.create({
                user:req.user?._id,
                title:"New Question Reply Received",
                message:`You have a new question reply in ${courseContent.title}`
            })
        }else{
            const data={
                name:question.user.name,
                title:courseContent.title
            }

            const html=await ejs.renderFile(path.join(__dirname,"../mails/question-reply.ejs"),data)

            try {
                
                await sendMail({
                    email:question.user.email,
                    subject:"Question Reply",
                    template:"question-reply.ejs",
                    data
                })

            } catch (error:any) {
                return next(new ErrorHandler(error.message,500))
            }
        }

        res.status(200).json({
            success:true,
            course
        })

    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
})

//add review to the questions
interface IAddReviewData{
    review:string;
    userId:string;
    courseId:string;
    rating:number;

}

export const addReview=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const userCourseList=req.user?.courses
        const courseId=req.params.id
        const courseExist=userCourseList?.some((course:any)=> course._id.toString()===courseId.toString())
        if(!courseExist){
            return next(new ErrorHandler("You are not eligible to access this course",400))
        }

        const course=await courseModel.findById(courseId)
        const {review,rating}:IAddReviewData=req.body;
        const reviewData:any={
            user:req.user,
            comment:review,
            rating
        }

        course?.reviews.push(reviewData)

        let avg=0;
        course?.reviews.forEach((rev:any)=> {
            avg+=rev.rating
        })
        
        if(course){
            course.ratings= avg / course.reviews.length
        }

        await course?.save()

        await redis.set(courseId,JSON.stringify(course),"EX",604800)


        // create notification
        await notificationModel.create({
            user:req.user?._id,
            title:"New Review Received",
            message:`${req.user?.name} has given a review in ${course?.name}.`
        })

        res.status(200).json({
            success:true,
            course
        })

    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
})

//add reply in review
interface IAddReplyToReview{
    comment:string;
    courseId:string;
    reviewId:string;
}
export const addReplyToReview=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {comment,courseId,reviewId}:IAddReplyToReview=req.body

        const course=await courseModel.findById(courseId)
        if(!course){
            return next(new ErrorHandler("Course not found",400))     
        }

        const review=course.reviews.find((rev:any)=> rev._id.toString()===reviewId)
        if(!review){
            return next(new ErrorHandler("Review not found",400))     
        }

        const replyData:any={
            user:req.user,
            comment,
            createdAt:new Date().toISOString(),
            updatedAt:new Date().toISOString()
        }

        if(!review.commentReplies){
            review.commentReplies=[]
        }
        review.commentReplies?.push(replyData)

        await course?.save()
        await redis.set(courseId,JSON.stringify(course),"EX",604800)

        
        
        res.status(200).json({
            success:true,
            course
        })
    }catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
})

//get all courses --only for admin
export const getAllCourses = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        getAllCourseService(res)

    }catch(error:any){
        return next(new ErrorHandler(error.message, 400))
    }
})


//delete course --only for admin
export const deleteCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id}=req.params
        const course=await courseModel.findById(id)
        if(!course){
            return next(new ErrorHandler("course not found", 400))
        }
        
        await course.deleteOne({id})
        await redis.del(id)

        res.status(200).json({
            success: true,
            message:"course deleted successfully"
        })

    }catch(error:any){
        return next(new ErrorHandler(error.message, 500))
    }
})

//generate video url
export const generateVideoUrl = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {videoId}=req.body
        const response=await axios.post(`https://dev.vdocipher.com/api/videos/${videoId}/otp`,{ttl:300},{
            headers:{
                Accept:'application/json',
                "Content-Type":"application/json",
                Authorization:`Apisecret T4mnIZe6mqotoTw98F8Xhs9o8ihTSNsPl1emX8jf2ZAyHBtYxLY4qTf560qtV2K4`
            }
        })

        res.status(200).json(response.data)

    }catch(error:any){
        return next(new ErrorHandler(error.message, 500))
    }
})