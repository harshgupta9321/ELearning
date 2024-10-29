import { Mode } from "fs";
import mongoose, { Document, Model, model, Schema } from "mongoose";
import { timestamp } from "rxjs";


export interface IOrder extends Document{
    courseId:string;
    userId:string;
    payment_info:Object;
}

const orderSchema=new Schema<IOrder>({
    courseId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    payment_info:{
        type:Object,

    }
},{timestamps:true});

const orderModel:Model<IOrder>=mongoose.model('Order',orderSchema)

export default orderModel