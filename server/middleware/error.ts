import ErrorHandler from "../utils/Errorhandler"
import { NextFunction, Request, Response } from "express"

export const ErrorMiddleware=(err:any,req:Request, res:Response)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message || "Internal server error"

    // wrong mondodb error
    if(err.name=="CastError"){
        const message=`Resource not found . Invalid : ${err.path}`
        err=new ErrorHandler(message,400)
    }

    //duplicate key error
    if(err.code==11000){
        const message=`Duplicate ${Object.keys(err.value)} entered`
        err=new ErrorHandler(message,400)
    }

    //jsonwebtoken error
    if(err.name=="JsonWebTokenError"){
        const message=`JsonWebToken is invalid. Please Try again`
        err=new ErrorHandler(message,400)
    }

    //jwt expired error
    if(err.name=="TokenExpiredError"){
        const message=`JsonWebToken is expired. Please Try again`
        err=new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}
