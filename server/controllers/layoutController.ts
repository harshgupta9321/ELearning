import { Request,Response,NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/Errorhandler";
import layoutModel from "../models/layoutmodel";
import cloudinary from "cloudinary"


//create layout
export const createLayout = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
       const {type}=req.body;
       const isTypeExist=await layoutModel.findOne({type})
       if(isTypeExist){
            return next(new ErrorHandler(`${type} already exist`,400))
       }
       if(type==="Banner"){
            const {image,title,subTitle}=req.body;
            const myCloud=await cloudinary.v2.uploader.upload(image,{folder:'layout'})
            const banner={
                type:"Banner",
                banner:{
                    image:{
                        public_id:myCloud.public_id,
                        url:myCloud.secure_url
                    },
                    title,
                    subTitle
                }
                
            }
            await layoutModel.create(banner)
       }

       if(type==="FAQ"){
            const {faq}=req.body;     
            const faqItems=await Promise.all(
                faq.map(async(item:any)=>{
                    return {
                        question:item.question,
                        answer:item.answer
                    }
                })
            )   
            await layoutModel.create({type:"FAQ",faq:faqItems})
       }
       if(type==="Categories"){
            const {categories}=req.body;
            const categoriesItems=await Promise.all(
                categories.map(async(item:any)=>{
                    return {
                        title:item.title
                    }
                })
            )   
            await layoutModel.create({type:"Categories",categories:categoriesItems})
       }

       res.status(200).json({
        success:true,
        message:"Layout created successfully"
       })

    }catch(error:any){
        return next(new ErrorHandler(error.message, 400))
    }
})


//edit layout
export const editLayout = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
       const {type}=req.body;
       
       if(type==="Banner"){
            const bannerData:any=await layoutModel.findOne({type:"Banner"})
            const {image,title,subTitle}=req.body;

            const data=image.startsWith("https")?bannerData:await cloudinary.v2.uploader.upload(image,{folder:'layout'})

            // This code is changed with above code
            // if(bannerData){

            //     await cloudinary.v2.uploader.destroy(bannerData.image.public_id)
            // }

            // const myCloud=await cloudinary.v2.uploader.upload(image,{folder:'layout'})1


            const banner={
                type:"Banner",
                image:{
                    public_id:image.startsWith("https")?bannerData.banner.image.public_id : data.public_id,
                    url:image.startsWith("https")?bannerData.banner.image.url : data.secure_url,
                },
                title,
                subTitle
            }
            await layoutModel.findByIdAndUpdate(bannerData._id,{banner})
       }

       if(type==="FAQ"){
            const {faq}=req.body;     
            const faqItem=await layoutModel.findOne({type:"FAQ"})
            const faqItems=await Promise.all(
                faq.map(async(item:any)=>{
                    return {
                        question:item.question,
                        answer:item.answer
                    }
                })
            )   
            await layoutModel.findByIdAndUpdate(faqItem?._id,{type:"FAQ",faq:faqItems})
       }
       if(type==="Categories"){
            const {categories}=req.body;
            const categoriesData=await layoutModel.findOne({type:"Categories"})

            const categoriesItems=await Promise.all(
                categories.map(async(item:any)=>{
                    return {
                        title:item.title
                    }
                })
            )   
            await layoutModel.findByIdAndUpdate(categoriesData?._id,{type:"Categories",categories:categoriesItems})
       }
       if(type==="Categories" ||type==="FAQ"||type==="Banner"){

           res.status(200).json({
            success:true,
            message:"Layout updated successfully"
           })
       }else{
        res.status(200).json({
            success:false,
            message:"Type does not exists"
           })
       }

    }catch(error:any){
        return next(new ErrorHandler(error.message, 400))
    }
})

//get layout by type
export const getLayoutByType = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
       const {type}=req.params
       const layout=await layoutModel.findOne({type})
       console.log(`${type} type is here`)
       
       if(layout){
           res.status(201).json({
            success:true,
            layout
           })
       }else{
        res.status(200).json({
            success:false,
            message:"Type does not exists"
           })
       }
    }catch(error:any){
        return next(new ErrorHandler(error.message, 400))
    }
})
