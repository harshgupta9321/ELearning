import { Request } from "express";
import { IUser } from "../models/usermodel";

declare global{
    namespace Express{
        interface Request{
            user?:IUser
        }
    }
}