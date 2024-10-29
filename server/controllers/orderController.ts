import { Request,Response,NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/Errorhandler";
import orderModel,{IOrder} from "../models/orderModel";
import notificationModel from "../models/notificationModel";
import userModel from "../models/usermodel";
import courseModel from "../models/coursemodel";
import path from "path";
import ejs from "ejs"
import sendMail from "../utils/sendMail";
import { getAllOrderService, newOrder } from "../services/order.service";
import { redis } from "../utils/redis";
require("dotenv").config()
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY)

//create order
export const createOrder=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=> {
    try {
        const {courseId,payment_info}=req.body 

        if(payment_info){
            if("id" in payment_info){
                const paymentIntentId=payment_info.id;
                const paymentIntent=await stripe.paymentIntents.retrieve(
                    paymentIntentId
                )

                if(paymentIntent.status !=="succeeded"){
                    return next(new ErrorHandler("Payment not authorized",400))
                }
            }
        }


        const user=await userModel.findById(req.user?._id)
        const courseExistInUser=user?.courses.some((course:any)=> course._id.toString()===courseId)
        if(courseExistInUser){
            return next(new ErrorHandler("You have already purchased this course",400))
        }

        const course:any=await courseModel.findById(courseId)
        if(!course){
            return next(new ErrorHandler("Course not found.",400))
        }

        const data:any={
            courseId:course._id,
            userId:user?._id

        }


        const mailData={
            order:{
                _id: course?._id.toString().slice(0,6),
                name:course.name,
                price:course.price,
                date:new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})
            }
        }

        const html=await ejs.renderFile(path.join(__dirname,'../mails/order-confirmation.ejs'),{order:mailData})

        try {
            if(user){
                await sendMail({
                    email:user.email,
                    subject:"Order Confirmation",
                    template:"order-confirmation.ejs",
                    data:mailData
                    
                })
            }
        } catch (error:any) {
            return next(new ErrorHandler(error.message,500))
            
        }
        
        const userId:any=user?._id
     

        user?.courses.push(course._id);

        await redis.set(userId,JSON.stringify(user))
        
        await user?.save()
        
        await notificationModel.create({
            user:user?._id,
            title:"New Order",
            message:`You have a new order from ${course.name}`
        })

        course.purchased = (course.purchased || 0) + 1;
        
        await course?.save()


        newOrder(data,res,next)
        

    
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
        
    }
})

//get all orders --only for admin
export const getAllOrders = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        getAllOrderService(res)

    }catch(error:any){
        return next(new ErrorHandler(error.message, 400))
    }
})

//send stripe publishable key
export const sendStripePublishableKey = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            publishableKey:process.env.STRIPE_PUBLISHABLE_KEY
        })
    }catch(error:any){
        return next(new ErrorHandler(error.message, 400))
    }
})

// for new Payment
export const newPayment = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const myPayment=await stripe.paymentIntents.create({
            amount:req.body.amount,
            currency:"USD",
            metadata:{
                company:"ELearning"
            },
            automatic_payment_methods:{
                enabled:true
            }
        })

        res.status(201).json({
            success:true,
            client_secret:myPayment.client_secret
        })
    }catch(error:any){
        return next(new ErrorHandler(error.message, 400))
    }
})