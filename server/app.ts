import express, { NextFunction, Request, Response } from "express"
export const app=express();
require("dotenv").config();
import cors from "cors"
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user-route";
import courseRouter from "./routes/course-routes";
import orderRouter from "./routes/order-routes";
import notificationRouter from "./routes/notification-routes";
import analyticsRouter from "./routes/analytics-routes";
import layoutRouter from "./routes/layout-routes";

//body parser
app.use(express.json({limit:"50mb"}));

//cookie parser
app.use(cookieParser());

//Cors- Cross origin resourse sharing
app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true
}))

//routes
app.use("/api/v1",userRouter,courseRouter,orderRouter,notificationRouter,analyticsRouter,layoutRouter)



//testing api
app.get("/test",(req:Request ,res:Response,next:NextFunction)=>{
    res.status(200).json({
        success: true,
        message:"API is working"
    })
})

//unknown route
app.all("*",(req:Request , res:Response, next:NextFunction)=>{
    const err=new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode=404;
    next(err);
})

app.use(ErrorMiddleware)

