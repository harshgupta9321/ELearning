import express, { NextFunction, Request, Response } from "express"

export const catchAsyncError=(thefunc:any)=>(req:Request,res:Response,next:NextFunction)=>{
    Promise.resolve(thefunc(req,res,next)).catch(next)
}