import express, { NextFunction, Request, Response } from "express";
export const app = express();
require("dotenv").config();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user-route";
import courseRouter from "./routes/course-routes";
import orderRouter from "./routes/order-routes";
import notificationRouter from "./routes/notification-routes";
import analyticsRouter from "./routes/analytics-routes";
import layoutRouter from "./routes/layout-routes";
import { rateLimit } from "express-rate-limit";

//body parser
app.use(express.json({ limit: "50mb" }));

//cookie parser
app.use(cookieParser());

//Cors- Cross origin resourse sharing
app.use(
  cors({
    origin: ["https://e-learning-self-two.vercel.app/"],
    credentials: true,
  })
);

// api request limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

//routes
app.use(
  "/api/v1",
  userRouter,
  courseRouter,
  orderRouter,
  notificationRouter,
  analyticsRouter,
  layoutRouter
);

//testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

//unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// middleware
app.use(limiter);
app.use(ErrorMiddleware);
